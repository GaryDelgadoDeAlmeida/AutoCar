<?php

namespace App\Controller\API;

use App\Repository\StationRepository;
use App\Repository\StationFuelRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api', name: 'api_')]
final class StationController extends AbstractController
{
    private int $limit = 20;
    private StationRepository $stationRepository;
    private StationFuelRepository $stationFuelRepository;

    function __construct(
        StationRepository $stationRepository,
        StationFuelRepository $stationFuelRepository
    ) {
        $this->stationRepository = $stationRepository;
        $this->stationFuelRepository = $stationFuelRepository;
    }
    
    #[Route('/stations', name: 'get_stations', methods: ["GET"])]
    public function get_stations(Request $request): JsonResponse {
        $offset = $request->get("offset", 1);

        return $this->json([
            "results" => $this->stationRepository->findBy([], ["createdAt" => "DESC"], $this->limit, ($offset - 1) * $this->limit),
            "offset" => $offset,
            "limit" => $this->limit,
            "maxOffset" => ceil($this->stationRepository->countStations() / $this->limit),
        ], Response::HTTP_OK, [], [ObjectNormalizer::IGNORED_ATTRIBUTES => ["stationFuels"]]);
    }
    
    #[Route('/station/{stationID}', name: 'get_station', methods: ["GET"])]
    public function get_station(int $stationID): JsonResponse {
        $station = $this->stationRepository->find($stationID);
        if(empty($station)) {
            return $this->json([
                "message" => "Station not found"
            ], Response::HTTP_NOT_FOUND);
        }
        return $this->json([
            "station" => $station,
            "fuels" => $station->getStationFuels(),
        ], Response::HTTP_OK, [], [ObjectNormalizer::IGNORED_ATTRIBUTES => ["stationFuels"]]);
    }

    #[Route('/station/{stationID}/fuels', name: 'get_station_fuels', methods: ["GET"])]
    public function get_station_fuels(int $stationID) : JsonResponse {
        return $this->json([
            "results" => $this->stationFuelRepository->findBy(["station" => $stationID])
        ], Response::HTTP_OK, [], [ObjectNormalizer::IGNORED_ATTRIBUTES => ["station"]]);
    }
}
