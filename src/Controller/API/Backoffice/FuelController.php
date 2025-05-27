<?php

namespace App\Controller\API\Backoffice;

use App\Entity\FuelPriceHistory;
use App\Enum\FuelEnum;
use App\Manager\FuelManager;
use App\Manager\SerializeManager;
use App\Repository\FuelPriceHistoryRepository;
use App\Repository\FuelRepository;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

#[Route('/api/backoffice', name: 'api_backoffice_')]
class FuelController extends AbstractController
{
    private Security $security;
    private FuelManager $fuelManager;
    private SerializeManager $serializeManager;
    private FuelRepository $fuelRepository;
    private FuelPriceHistoryRepository $fuelPriceHistoryRepository;

    function __construct(
        Security $security, 
        FuelManager $fuelManager,
        SerializeManager $serializeManager,
        FuelRepository $fuelRepository,
        FuelPriceHistoryRepository $fuelPriceHistoryRepository
    ) {
        $this->security = $security;
        $this->fuelManager = $fuelManager;
        $this->serializeManager = $serializeManager;
        $this->fuelRepository = $fuelRepository;
        $this->fuelPriceHistoryRepository = $fuelPriceHistoryRepository;
    }

    #[Route('/fuel', name: 'post_fuel', methods: ["POST"])]
    public function post_fuel(Request $request): JsonResponse {
        $jsonContent = json_decode($request->getContent(), true);
        if(empty($jsonContent)) {
            return $this->json([
                "message" => "An error has been encountered with the sended body"
            ], Response::HTTP_PRECONDITION_FAILED);
        }

        try {
            $fields = $this->fuelManager->checkFields($jsonContent);
            if(empty($fields)) {
                throw new \Exception("An error has been encountered with the sended body", Response::HTTP_PRECONDITION_FAILED);
            }

            $fuel = $this->fuelManager->fillFuel($fields);
            if(is_string($fuel)) {
                throw new \Exception($fuel);
            }

            $this->fuelRepository->save($fuel, true);

            // Save an history of the price
            $priceHistory = (new FuelPriceHistory())
                ->setFuel($fuel)
                ->setPrice($fuel->getPrice())
                ->setCreatedAt(new \DateTimeImmutable())
            ;

            $this->fuelPriceHistoryRepository->save($priceHistory, true);
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], isset(Response::$statusTexts[$code]) && $code !== Response::HTTP_OK ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(
            $fuel, 
            Response::HTTP_CREATED,
            [],
            [ObjectNormalizer::IGNORED_ATTRIBUTES => ["vehicles", "fuelPriceHistories", "lastFuelPriceHistories"]]
        );
    }

    #[Route('/fuel/{fuelID}/update', name: 'udpate_fuel', methods: ["UPDATE", "PUT"])]
    public function udpate_fuel(int $fuelID, Request $request) : JsonResponse {
        $jsonContent = json_decode($request->getContent(), true);
        if(empty($jsonContent)) {
            return $this->json([
                "message" => "An error has been encountered with the sended body"
            ], Response::HTTP_PRECONDITION_FAILED);
        }

        $fuel = $this->fuelRepository->find($fuelID);
        if(empty($fuel)) {
            return $this->json([
                "message" => "Fuel not found"
            ], Response::HTTP_NOT_FOUND);
        }

        try {
            $fields = $this->fuelManager->checkFields($jsonContent);
            if(empty($fields)) {
                throw new \Exception("An error has been encountered with the sended body", Response::HTTP_PRECONDITION_FAILED);
            }

            // Check if we have to archive the previous price
            if($fuel->getPrice() != $fields[FuelEnum::FUEL_PRICE]) {
                // Save an history of the old price
                $priceHistory = (new FuelPriceHistory())
                    ->setFuel($fuel)
                    ->setPrice($fuel->getPrice())
                    ->setCreatedAt(new \DateTimeImmutable())
                ;

                $this->fuelPriceHistoryRepository->save($priceHistory, true);
            }

            $response = $this->fuelManager->fillFuel($fields, $fuel);
            if(is_string($response)) {
                throw new \Exception($response);
            }

            $this->fuelRepository->save($response, true);
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], isset(Response::$statusTexts[$code]) && $code !== Response::HTTP_OK ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(null, Response::HTTP_ACCEPTED);
    }

    #[Route('/fuel/{fuelID}/remove', name: 'remove_fuel', methods: ["DELETE"])]
    public function remove_fuel(int $fuelID) : JsonResponse {
        $fuel = $this->fuelRepository->find($fuelID);
        if(empty($fuel)) {
            return $this->json([
                "message" => "Fuel couldn't be found"
            ], Response::HTTP_NOT_FOUND);
        }

        try {
            // Remove fuel history
            foreach($fuel->getFuelPriceHistories() as $history) {
                $this->fuelPriceHistoryRepository->remvoe($history, true);
            }

            // Remove fuel
            $this->fuelRepository->remove($fuel, true);
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], isset(Response::$statusTexts[$code]) && $code !== Response::HTTP_OK ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(null, Response::HTTP_NO_CONTENT);
    }
}
