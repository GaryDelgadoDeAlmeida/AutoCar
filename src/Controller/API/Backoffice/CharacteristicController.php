<?php

namespace App\Controller\API\Backoffice;

use App\Manager\CharacteristicManager;
use App\Repository\CharacteristicRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/backoffice', name: 'api_backoffice_')]
class CharacteristicController extends AbstractController
{
    private CharacteristicManager $characteristicManager;
    private CharacteristicRepository $characteristicRepository;
    
    function __construct(
        CharacteristicManager $characteristicManager,
        CharacteristicRepository $characteristicRepository
    ) {
        $this->characteristicManager = $characteristicManager;
        $this->characteristicRepository = $characteristicRepository;
    }

    #[Route('/characteristic', name: 'post_characteristic', methods: ["POST"])]
    public function post_characteristic(Request $request): JsonResponse {
        $jsonContent = json_decode($request->getContent(), true);
        if(empty($jsonContent)) {
            return $this->json([
                "message" => "",
            ], Response::HTTP_PRECONDITION_FAILED);
        }

        try {
            $fields = $this->characteristicManager->checkFields($jsonContent);
            if(empty($fields)) {
                throw new \Exception("", Response::HTTP_PRECONDITION_FAILED);
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

    #[Route('/characteristic/{characteristicID}/update', name: 'update_characteristic', methods: ["UPDATE", "PUT"])]
    public function update_characteristic(int $characteristicID, Request $request) : JsonResponse {
        return $this->json([], Response::HTTP_OK);
    }

    #[Route('/characteristic/{characteristicID}/remove', name: 'remove_characteristic', methods: ["DELETE"])]
    public function remove_characteristic(int $characteristicID) : JsonResponse {
        return $this->json([], Response::HTTP_OK);
    }
}
