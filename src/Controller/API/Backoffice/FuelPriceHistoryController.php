<?php

namespace App\Controller\API\Backoffice;

use App\Manager\FuelPriceHistoryManager;
use App\Repository\FuelPriceHistoryRepository;
use App\Repository\FuelRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class FuelPriceHistoryController extends AbstractController
{
    private FuelPriceHistoryManager $fuelPriceHistoryManager;
    private FuelRepository $fuelRepository;
    private FuelPriceHistoryRepository $fuelPriceHistoryRepository;

    function __construct(
        FuelPriceHistoryManager $fuelPriceHistoryManager,
        FuelRepository $fuelRepository, 
        FuelPriceHistoryRepository $fuelPriceHistoryRepository
    ) {
        $this->fuelPriceHistoryManager = $fuelPriceHistoryManager;
        $this->fuelRepository = $fuelRepository;
        $this->fuelPriceHistoryRepository = $fuelPriceHistoryRepository;
    }

    #[Route('/fuel/{fuelID}/price-history', name: 'post_fuel_price_history', methods: ["POST"])]
    public function post_fuel_price_history(Request $request): JsonResponse {
        $jsonContent = json_decode($request->getContent(), true);
        if(empty($jsonContent)) {
            return $this->json([
                "message" => "An error has been encountered with the sended body"
            ], Response::HTTP_PRECONDITION_FAILED);
        }

        try {
            $fields = $this->fuelPriceHistoryManager->checkFields($jsonContent);
            if(empty($fields)) {
                throw new \Exception("An error has been encountered with the sended body", Response::HTTP_PRECONDITION_FAILED);
            }

            $response = $this->fuelPriceHistoryManager->fillFuelPriceHistory($fields);
            if(is_string($response)) {
                throw new \Exception($response);
            }

            $this->fuelPriceHistoryRepository->save($response, true);
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage(),
            ], isset(Response::$statusTexts[$code]) && $code !== Response::HTTP_OK ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json($response, Response::HTTP_CREATED);
    }

    #[Route('/fuel/{fuelID}/price-history/{historyID}', name: 'update_fuel_price_history', methods: ["UPDATE", "PUT"])]
    public function update_fuel_price_history(Request $request, int $fuelID, int $historyID) : JsonResponse {
        $history = $this->fuelPriceHistoryRepository->findOneBy(["id" => $historyID, "fuel" => $fuelID]);
        if(empty($history)) {
            return $this->json([
                "message" => ""
            ], Response::HTTP_NOT_FOUND);
        }

        return $this->json([], Response::HTTP_ACCEPTED);
    }

    #[Route('/fuel/{fuelID}/price-history/{historyID}', name: 'remove_fuel_price_history', methods: ["DELETE"])]
    public function remove_fuel_price_history(int $fuelID, int $historyID) {
        return $this->json([], Response::HTTP_NO_CONTENT);
    }
}
