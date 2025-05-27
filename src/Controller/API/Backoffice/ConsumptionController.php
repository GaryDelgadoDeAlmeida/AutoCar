<?php

namespace App\Controller\API\Backoffice;

use App\Manager\ConsumptionManager;
use App\Repository\ConsumptionRepository;
use App\Repository\VehicleConsumptionRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

#[Route('/api/backoffice', name: 'api_backoffice_')]
class ConsumptionController extends AbstractController
{
    private ConsumptionManager $consumptionManager;
    private ConsumptionRepository $consumptionRepository;
    private VehicleConsumptionRepository $vehicleConsumptionRepository;
    
    function __construct(
        ConsumptionManager $consumptionManager, 
        ConsumptionRepository $consumptionRepository,
        VehicleConsumptionRepository $vehicleConsumptionRepository
    ) {
        $this->consumptionManager = $consumptionManager;
        $this->consumptionRepository = $consumptionRepository;
        $this->vehicleConsumptionRepository = $vehicleConsumptionRepository;
    }

    #[Route('/consumptions', name: 'get_consumptions', methods: ["GET"])]
    public function get_consumptions(Request $request): JsonResponse {
        $response = $context = [];
        $resultsRequest = $request->get("request", null);
        if($resultsRequest == "all") {
            $response = [
                "results" => $this->consumptionRepository->findAll()
            ];
            $context = [
                ObjectNormalizer::IGNORED_ATTRIBUTES => ["vehicleConsumptions"]
            ];
        } else {
            $limit = 20;
            $offset = is_numeric($request->get("offset")) && intval($request->get("offset")) == $request->get("offset") && $request->get("offset") > 1 ? intval($request->get("offset")) : 1;

            $response = [
                "offset" => $offset,
                "maxOffset" => ceil($this->consumptionRepository->countConsumptions() / $limit),
                "results" => $this->consumptionRepository->getConsumptions($offset, $limit)
            ];
        }

        return $this->json($response, Response::HTTP_OK, [], $context);
    }

    #[Route('/consumption', name: 'post_consumption', methods: ["POST"])]
    public function post_consumption(Request $request): JsonResponse {
        $jsonContent = json_decode($request->getContent(), true);
        if(empty($jsonContent)) {
            return $this->json([
                "message" => "An error has been encountered with the sended body"
            ], Response::HTTP_PRECONDITION_FAILED);
        }

        try {
            $fields = $this->consumptionManager->checkFields($jsonContent);
            if(empty($fields)) {
                throw new \Exception("An error has been encountered with the sended body", Response::HTTP_PRECONDITION_FAILED);
            }

            $consumption = $this->consumptionRepository->fillConsumption($fields);
            if(is_string($consumption)) {
                throw new \Exception($consumption);
            }

            $this->consumptionRepository->save($consumption, true);
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], isset(Response::$statusTexts[$code]) && $code !== Response::HTTP_OK ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json($consumption, Response::HTTP_CREATED);
    }

    #[Route('/consumption/{consumptionID}', requirements: ["consumptionID" => "\d+"], name: 'get_consumption', methods: ["GET"])]
    public function get_consumption(int $consumptionID): JsonResponse {
        $consumption = $this->consumptionRepository->find($consumptionID);
        if(empty($consumption)) {
            return $this->json([
                "message" => "Consumption coudln't be found"
            ], Response::HTTP_NOT_FOUND);
        }

        return $this->json(
            $consumption,
            Response::HTTP_OK,
            [],
            [ObjectNormalizer::IGNORED_ATTRIBUTES => ["vehicleConsumptions"]]
        );
    }

    #[Route('/consumption/{consumptionID}/update', requirements: ["consumptionID" => "\d+"], name: 'update_consumption', methods: ["UPDATE", "PUT"])]
    public function update_consumption(int $consumptionID, Request $request): JsonResponse {
        $consumption = $this->consumptionRepository->find($consumptionID);
        if(empty($consumption)) {
            return $this->json([
                "message" => "Consumption coudln't be found"
            ], Response::HTTP_NOT_FOUND);
        }

        $jsonContent = json_decode($request->getContent(), true);
        if(empty($jsonContent)) {
            return $this->json([
                "message" => "An error has been encountered with the sended body"
            ], Response::HTTP_PRECONDITION_FAILED);
        }

        try {
            $fields = $this->consumptionManager->checkFields($jsonContent);
            if(empty($fields)) {
                throw new \Exception("An error has been encountered with the sended body", Response::HTTP_PRECONDITION_FAILED);
            }

            $consumption = $this->consumptionRepository->fillConsumption($fields, $consumption);
            if(is_string($consumption)) {
                throw new \Exception($consumption);
            }

            $this->consumptionRepository->save($consumption, true);
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], isset(Response::$statusTexts[$code]) && $code !== Response::HTTP_OK ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(null, Response::HTTP_ACCEPTED);
    }

    #[Route('/consumption/{consumptionID}/remove', requirements: ["consumptionID" => "\d+"], name: 'remove_consumption', methods: ["DELETE"])]
    public function remove_consumption(int $consumptionID): JsonResponse {
        $consumption = $this->consumptionRepository->find($consumptionID);
        if(empty($consumption)) {
            return $this->json([
                "message" => "Consumption coudln't be found"
            ], Response::HTTP_NOT_FOUND);
        }

        try {
            // Remove all association with the object to remove
            foreach($consumption->getVehicleConsumptions() as $vehicleConsumption) {
                $vehicleConsumption->setVehicle(null);
                $this->vehicleConsumptionRepository->remove($vehicleConsumption, true);
            }

            // Remove object from database
            $this->consumptionRepository->remove($consumption, true);
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], isset(Response::$statusTexts[$code]) && $code !== Response::HTTP_OK ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(null, Response::HTTP_NO_CONTENT);
    }
}
