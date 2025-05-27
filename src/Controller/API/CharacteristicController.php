<?php

namespace App\Controller\API;

use App\Manager\SerializeManager;
use App\Repository\CharacteristicRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

#[Route('/api', name: 'api_')]
class CharacteristicController extends AbstractController
{
    private CharacteristicRepository $characteristicRepository;

    function __construct(CharacteristicRepository $characteristicRepository) {
        $this->characteristicRepository = $characteristicRepository;
    }

    #[Route('/characteristics', name: 'get_characteristics', methods: ["GET"])]
    public function get_characteristics(Request $request): JsonResponse {
        $response = $context = [];
        $resultsRequest = $request->get("request", null);
        if($resultsRequest == "all") {
            $response = [
                "results" => $this->characteristicRepository->findAll()
            ];
            $context = [
                ObjectNormalizer::IGNORED_ATTRIBUTES => ["vehicleCharacteristics"]
            ];
        } else {
            $limit = 20;
            $offset = is_numeric($request->get("offset")) && intval($request->get("offset")) == $request->get("offset") && $request->get("offset") > 1 ? intval($request->get("offset")) : 1;

            $response = [
                "offset" => $offset,
                "maxOffset" => ceil($this->characteristicRepository->countCharacteristics() / $limit),
                "results" => $this->characteristicRepository->getCharacteristics($offset, $limit)
            ];
        }

        return $this->json($response, Response::HTTP_OK, [], $context);
    }
}
