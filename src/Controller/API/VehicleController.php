<?php

namespace App\Controller\API;

use App\Repository\FuelRepository;
use App\Repository\MakerRepository;
use App\Repository\VehicleCharacteristicRepository;
use App\Repository\VehicleConsumptionRepository;
use App\Repository\VehicleRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

#[Route('/api', name: 'api_')]
class VehicleController extends AbstractController
{
    private FuelRepository $fuelRepository;
    private MakerRepository $makerRepository;
    private VehicleRepository $vehicleRepository;
    private VehicleConsumptionRepository $vehicleConsumptionRepository;
    private VehicleCharacteristicRepository $vehicleCharacteristicRepository;

    function __construct(
        FuelRepository $fuelRepository,
        MakerRepository $makerRepository,
        VehicleRepository $vehicleRepository,
        VehicleConsumptionRepository $vehicleConsumptionRepository,
        VehicleCharacteristicRepository $vehicleCharacteristicRepository
    ) {
        $this->fuelRepository = $fuelRepository;
        $this->makerRepository = $makerRepository;
        $this->vehicleRepository = $vehicleRepository;
        $this->vehicleConsumptionRepository = $vehicleConsumptionRepository;
        $this->vehicleCharacteristicRepository = $vehicleCharacteristicRepository;
    }

    #[Route('/vehicles', name: 'get_vehicles', methods: ["GET"])]
    public function get_vehicles(Request $request): JsonResponse {
        $results = [];

        if($request->get("request", "") === "all") {
            $results = [
                "results" => $this->vehicleRepository->getVehiclesForForm()
            ];
        } else {
            $limit = 12;
            $offset = is_numeric($request->get("offset")) && intval($request->get("offset")) == $request->get("offset") && $request->get("offset") > 1 ? intval($request->get("offset")) : 1;
            $vehicles = $this->vehicleRepository->getVehicles($offset, $limit);
            foreach($vehicles as $index => $vehicle) {
                $vehicles[$index]["fuels"] = $this->fuelRepository->getVehicleFuels($vehicle["id"]);
            }

            $results = [
                "offset" => $offset,
                "maxOffset" => ceil($this->vehicleRepository->countVehicles() / $limit),
                "results" => $vehicles
            ];
        }
        
        return $this->json($results);
    }

    #[Route('/vehicle/{vehicleID}', name: 'get_vehicle', methods: ["GET"])]
    public function get_vehicle(int $vehicleID): JsonResponse {
        $vehicle = $this->vehicleRepository->getVehicle($vehicleID);
        if(empty($vehicle)) {
            return $this->json([
                "message" => "Vehicle not found"
            ], Response::HTTP_NOT_FOUND);
        }

        $vehicle["maker"] = $this->makerRepository->getVehicleMaker($vehicleID);
        $vehicle["fuels"] = $this->fuelRepository->getVehicleFuels($vehicleID);
        $vehicle["characteristics"] = $this->vehicleCharacteristicRepository->getVehicleCharacteristics($vehicleID);
        $vehicle["consumptions"] = $this->vehicleConsumptionRepository->getVehicleConsumptions($vehicleID);

        return $this->json(
            $vehicle,
            Response::HTTP_OK,
            []
        );
    }
}
