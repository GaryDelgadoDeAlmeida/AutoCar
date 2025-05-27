<?php

namespace App\Controller\API\Backoffice;

use App\Manager\CharacteristicManager;
use App\Repository\CharacteristicRepository;
use App\Repository\VehicleCharacteristicRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

#[Route('/api/backoffice', name: 'api_backoffice_')]
class CharacteristicController extends AbstractController
{
    private CharacteristicManager $characteristicManager;
    private CharacteristicRepository $characteristicRepository;
    private VehicleCharacteristicRepository $vehicleCharacteristicRepository;
    
    function __construct(
        CharacteristicManager $characteristicManager,
        CharacteristicRepository $characteristicRepository,
        VehicleCharacteristicRepository $vehicleCharacteristicRepository
    ) {
        $this->characteristicManager = $characteristicManager;
        $this->characteristicRepository = $characteristicRepository;
        $this->vehicleCharacteristicRepository = $vehicleCharacteristicRepository;
    }

    #[Route('/characteristic', name: 'post_characteristic', methods: ["POST"])]
    public function post_characteristic(Request $request): JsonResponse {
        $jsonContent = json_decode($request->getContent(), true);
        if(empty($jsonContent)) {
            return $this->json([
                "message" => "An error has been encountered with the sended body",
            ], Response::HTTP_PRECONDITION_FAILED);
        }

        try {
            $fields = $this->characteristicManager->checkFields($jsonContent);
            if(empty($fields)) {
                throw new \Exception("An error has been encountered with the sended body", Response::HTTP_PRECONDITION_FAILED);
            }

            $characteristic = $this->characteristicManager->fillCharacteristic($fields);
            if(is_string($characteristic)) {
                throw new \Exception($characteristic, Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        
            $this->characteristicRepository->save($characteristic, true);
        } catch(\Exception $e) {
            return $this->json([
                "message" => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(null, Response::HTTP_CREATED);
    }

    #[Route('/characteristic/{characteristicID}', requirements: ["characteristicID" => "\d+"], name: 'get_characteristic', methods: ["GET"])]
    public function get_characteristic(int $characteristicID) : JsonResponse {
        $characteristic = $this->characteristicRepository->find($characteristicID);
        if(empty($characteristic)) {
            return $this->json([
                "message" => "Characteristic couldn't be found"
            ], Response::HTTP_NOT_FOUND);
        }

        return $this->json(
            $characteristic,
            Response::HTTP_OK,
            [],
            [ObjectNormalizer::IGNORED_ATTRIBUTES => ["vehicleCharacteristics"]]
        );
    }

    #[Route('/characteristic/{characteristicID}/update', requirements: ["characteristicID" => "\d+"], name: 'update_characteristic', methods: ["UPDATE", "PUT"])]
    public function update_characteristic(int $characteristicID, Request $request) : JsonResponse {
        $jsonContent = json_decode($request->getContent(), true);
        if(empty($jsonContent)) {
            return $this->json([
                "message" => "An error has been encountered with the sended body",
            ], Response::HTTP_PRECONDITION_FAILED);
        }

        $characteristic = $this->characteristicRepository->find($characteristicID);
        if(empty($characteristic)) {
            return $this->json([
                "message" => "Characteristic couldn't be found"
            ], Response::HTTP_NOT_FOUND);
        }

        try {
            $fields = $this->characteristicManager->checkFields($jsonContent);
            if(empty($fields)) {
                throw new \Exception("An error has been encountered with the sended body", Response::HTTP_PRECONDITION_FAILED);
            }

            $characteristic = $this->characteristicManager->fillCharacteristic($fields, $characteristic);
            if(is_string($characteristic)) {
                throw new \Exception($characteristic);
            }

            $this->characteristicRepository->save($characteristic, true);
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], isset(Response::$statusTexts[$code]) && $code!= Response::HTTP_OK ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json([], Response::HTTP_ACCEPTED);
    }

    #[Route('/characteristic/{characteristicID}/remove', requirements: ["characteristicID" => "\d+"], name: 'remove_characteristic', methods: ["DELETE"])]
    public function remove_characteristic(int $characteristicID) : JsonResponse {
        $characteristic = $this->characteristicRepository->find($characteristicID);
        if(empty($characteristic)) {
            return $this->json([
                "message" => "Characteristic couldn't be found"
            ], Response::HTTP_NOT_FOUND);
        }

        try {
            // Remove all vehicle characteristic associated to characteristic to remove
            foreach($characteristic->getVehicleCharacteristics() as $vehicleCharacteristic) {
                $vehicleCharacteristic->setVehicle(null);
                $this->vehicleCharacteristicRepository->remove($vehicleCharacteristic, true);
            }

            // Remove characteristic of the database
            $this->characteristicRepository->remove($characteristic, true);
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], isset(Response::$statusTexts[$code]) && $code!= Response::HTTP_OK ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(null, Response::HTTP_NO_CONTENT);
    }
}
