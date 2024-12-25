<?php

namespace App\Controller\API;

use App\Manager\SerializeManager;
use App\Repository\CharacteristicRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api', name: 'api_')]
class CharacteristicController extends AbstractController
{
    private SerializeManager $serializeManager;
    private CharacteristicRepository $characteristicRepository;

    function __construct(
        SerializeManager $serializeManager, 
        CharacteristicRepository $characteristicRepository
    ) {
        $this->serializeManager = $serializeManager;
        $this->characteristicRepository = $characteristicRepository;
    }

    #[Route('/characteristics', name: 'get_characteristics', methods: ["GET"])]
    public function get_characteristics(Request $request): JsonResponse {
        $limit = 20;
        $offset = !empty($request->get("offset")) && is_numeric($request->get("offset")) && $request->get("offset") > 1 ? intval($request->get("offset")) : 1;

        return $this->json([
            "offset" => $offset,
            "maxOffset" => ceil($this->characteristicRepository->countCharacteristics() / $limit),
            "results" => $this->characteristicRepository->getCharacteristics($offset, $limit)
        ], Response::HTTP_OK);
    }

    #[Route('/characteristic/{characteristicID}', name: 'get_characteristic', methods: ["GET"])]
    public function get_characteristic(int $characteristicID) : JsonResponse {
        $characteristic = $this->characteristicRepository->getCharacteristic($characteristicID);
        if(empty($characteristic)) {
            return $this->json([
                "message" => "Characteristic couldn't be found"
            ], Response::HTTP_NOT_FOUND);
        }

        return $this->json(
            $characteristic,
            Response::HTTP_OK
        );
    }
}
