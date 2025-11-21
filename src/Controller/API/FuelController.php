<?php

namespace App\Controller\API;

use App\Repository\FuelRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

#[Route('/api', name: 'api_')]
class FuelController extends AbstractController
{
    private FuelRepository $fuelRepository;

    function __construct(FuelRepository $fuelRepository) {
        $this->fuelRepository = $fuelRepository;
    }

    #[Route('/fuels', name: 'get_fuels', methods: ["GET"])]
    public function get_fuels(): JsonResponse {
        return $this->json([
            "results" => $this->fuelRepository->getFuels()
        ], Response::HTTP_OK);
    }

    #[Route('/fuel/{fuelID}', name: 'get_fuel', methods: ["GET"])]
    public function get_fuel(int $fuelID) : JsonResponse {
        $fuel = $this->fuelRepository->find($fuelID);
        if(empty($fuel)) {
            return $this->json([
                "message" => "The fuel couldn't be found"
            ], Response::HTTP_NOT_FOUND);
        }

        return $this->json(
            $fuel, 
            Response::HTTP_OK,
            [],
            [ObjectNormalizer::IGNORED_ATTRIBUTES => ["vehicles", "fuelPriceHistories", "lastFuelPriceHistories"]]
        );
    }
}
