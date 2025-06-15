<?php

namespace App\Controller\API;

use App\Manager\SerializeManager;
use App\Repository\FuelPriceHistoryRepository;
use App\Repository\FuelRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api', name: 'api_')]
class FuelPriceHistoryController extends AbstractController
{
    private SerializeManager $serializeManager;
    private FuelRepository $fuelRepository;
    private FuelPriceHistoryRepository $fuelPriceHistoryRepository;
    
    function __construct(
        SerializeManager $serializeManager, 
        FuelRepository $fuelRepository,
        FuelPriceHistoryRepository $fuelPriceHistoryRepository
    ) {
        $this->serializeManager = $serializeManager;
        $this->fuelRepository = $fuelRepository;
        $this->fuelPriceHistoryRepository = $fuelPriceHistoryRepository;
    }

    #[Route('/fuels/price-histories', name: 'get_fuels_price_histories', methods: ["GET"])]
    public function get_fuels_price_histories(): JsonResponse {
        return $this->json([
            "results" => array_map(function($fuel) {
                $history = $fuel->getLastFuelPriceHistories();
    
                return [
                    "id" => $fuel->getId(),
                    "title" => $fuel->getTitle(),
                    "currentPrice" => floatval($fuel->getPrice()),
                    "lastPrice" => !empty($history) ? floatval($history->getPrice()) : 0
                ];
            }, $this->fuelRepository->findAll())
        ], Response::HTTP_OK);
    }

    #[Route('/fuel/{fuelID}/price-histories', name: 'get_fuel_price_histories', methods: ["GET"])]
    public function get_fuel_price_histories(int $fuelID): JsonResponse {
        $histories = $this->fuelPriceHistoryRepository->findBy(["fuel" => $fuelID], ["created_at" => "DESC"]);
        if(empty($histories)) {
            return $this->json([
                "message" => "The fuel coudln't be found"
            ], Response::HTTP_NOT_FOUND);
        }

        return $this->json([
            "results" => $this->serializeManager->serializeContent($histories)
        ], Response::HTTP_OK);
    }
}
