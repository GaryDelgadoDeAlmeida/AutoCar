<?php

namespace App\Controller\API;

use App\Manager\SerializeManager;
use App\Repository\FuelRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api', name: 'api_')]
class FuelController extends AbstractController
{
    private SerializeManager $serializeManager;
    private FuelRepository $fuelRepository;

    function __construct(SerializeManager $serializeManager, FuelRepository $fuelRepository) {
        $this->serializeManager = $serializeManager;
        $this->fuelRepository = $fuelRepository;
    }

    #[Route('/fuels', name: 'get_fuels', methods: ["GET"])]
    public function get_fuels(): JsonResponse {
        return $this->json([
            "results" => $this->fuelRepository->getFuels()
        ], Response::HTTP_OK);
    }

    #[Route('/fuel/{fuelID}', name: 'get_fuel', methods: ["GET"])]
    public function get_fuel(int $fuelID): JsonResponse {
        return $this->json(
            $this->fuelRepository->getFuel($fuelID), 
            Response::HTTP_OK
        );
    }
}
