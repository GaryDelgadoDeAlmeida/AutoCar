<?php

namespace App\Controller\API;

use App\Manager\SerializeManager;
use App\Repository\VehicleRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api', name: 'api_')]
class VehicleController extends AbstractController
{
    private SerializeManager $serializeManager;
    private VehicleRepository $vehicleRepository;

    function __construct(SerializeManager $serializeManager, VehicleRepository $vehicleRepository) {
        $this->serializeManager = $serializeManager;
        $this->vehicleRepository = $vehicleRepository;
    }

    #[Route('/vehicles', name: 'get_vehicles', methods: ["GET"])]
    public function get_vehicles(Request $request): JsonResponse {
        $limit = 12;
        $offset = is_numeric($request->get("offset")) && intval($request->get("offset")) == $request->get("offset") && $request->get("offset") > 1 ? intval($request->get("offset")) : 1;
        $vehicles = $this->vehicleRepository->findBy([], ["createdAt" => "DESC"], $limit, ($offset - 1) * $limit);
        
        return $this->json([
            "offset" => $offset,
            "maxOffet" => ceil($this->vehicleRepository->countVehicles() / $limit),
            "results" => $vehicles ?? $this->serializeManager->serializeContent($vehicles)
        ]);
    }

    #[Route('/vehicle/{vehicleID}', name: 'get_vehicle', methods: ["GET"])]
    public function get_vehicle(int $vehicleID): JsonResponse {
        $vehicle = $this->vehicleRepository->find($vehicleID);
        if(empty($vehicle)) {
            return $this->json([
                "message" => "Vehicle not found"
            ], Response::HTTP_NOT_FOUND);
        }

        return $this->json(
            $this->serializeManager->serializeContent($vehicle),
            Response::HTTP_OK
        );
    }
}
