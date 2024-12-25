<?php

namespace App\Controller\API;

use App\Manager\SerializeManager;
use App\Repository\FuelRepository;
use App\Repository\VehicleRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api', name: 'api_')]
class VehicleController extends AbstractController
{
    private SerializeManager $serializeManager;
    private FuelRepository $fuelRepository;
    private VehicleRepository $vehicleRepository;

    function __construct(
        SerializeManager $serializeManager, 
        FuelRepository $fuelRepository,
        VehicleRepository $vehicleRepository
    ) {
        $this->serializeManager = $serializeManager;
        $this->fuelRepository = $fuelRepository;
        $this->vehicleRepository = $vehicleRepository;
    }

    #[Route('/vehicles', name: 'get_vehicles', methods: ["GET"])]
    public function get_vehicles(Request $request): JsonResponse {
        $limit = 12;
        $offset = is_numeric($request->get("offset")) && intval($request->get("offset")) == $request->get("offset") && $request->get("offset") > 1 ? intval($request->get("offset")) : 1;
        $vehicles = $this->vehicleRepository->getVehicles($offset, $limit);
        foreach($vehicles as $index => $vehicle) {
            $vehicles[$index]["fuels"] = $this->fuelRepository->getVehicleFuels($vehicle["id"]);
        }
        
        return $this->json([
            "offset" => $offset,
            "maxOffset" => ceil($this->vehicleRepository->countVehicles() / $limit),
            "results" => $vehicles
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
