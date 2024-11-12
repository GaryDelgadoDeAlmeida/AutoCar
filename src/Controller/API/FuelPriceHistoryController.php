<?php

namespace App\Controller\API;

use App\Manager\SerializeManager;
use App\Repository\FuelPriceHistoryRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api', name: 'api_')]
class FuelPriceHistoryController extends AbstractController
{
    private SerializeManager $serializeManager;
    private FuelPriceHistoryRepository $fuelPriceHistoryRepository;
    
    function __construct(
        SerializeManager $serializeManager, 
        FuelPriceHistoryRepository $fuelPriceHistoryRepository
    ) {
        $this->serializeManager = $serializeManager;
        $this->fuelPriceHistoryRepository = $fuelPriceHistoryRepository;
    }

    #[Route('/fuels/price-histories', name: 'get_fuels_price_histories', methods: ["GET"])]
    public function get_fuels_price_histories(Request $request): JsonResponse {
        $limit = 20;
        $offset = !empty($request->get("offset")) && is_numeric($request->get("offset")) && $request->get("offset") > 1 ? intval($request->get("offset")) : 1;

        return $this->json([
            "offset" => $offset,
            "maxOffset" => ceil($this->fuelPriceHistoryRepository->countHistories() / $limit),
            "results" => $this->serializeManager->serializeContent(
                $this->fuelPriceHistoryRepository->findBy([], ["created_at" => "DESC"], $limit, ($offset - 1) * $limit)
            )
        ], Response::HTTP_OK);
    }

    #[Route('/fuel/{fuelID}/price-histories', name: 'get_fuel_price_histories', methods: ["GET"])]
    public function get_fuel_price_histories(Request $request, int $fuelID): JsonResponse {
        $limit = 20;
        $offset = !empty($request->get("offset")) && is_numeric($request->get("offset")) && $request->get("offset") > 1 ? intval($request->get("offset")) : 1;

        $histories = $this->fuelPriceHistoryRepository->findBy(["fuel" => $fuelID], ["created_at" => "DESC"], $limit, ($offset - 1) * $limit);
        if(empty($histories)) {
            return $this->json([], Response::HTTP_NOT_FOUND);
        }

        return $this->json([
            "offset" => $offset,
            "maxOffset" => ceil($this->fuelPriceHistoryRepository->countFuelHistories($fuelID) / $limit),
            "results" => $this->serializeManager->serializeContent($histories)
        ], Response::HTTP_OK);
    }
}
