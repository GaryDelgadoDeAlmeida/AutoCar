<?php

namespace App\Controller\API;

use App\Manager\SerializeManager;
use App\Repository\VehicleTypeRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api', name: 'api_')]
class VehicleTypeController extends AbstractController
{
    private SerializeManager $serializeManager;
    private VehicleTypeRepository $vehicleTypeRepository;

    function __construct(SerializeManager $serializeManager, VehicleTypeRepository $vehicleTypeRepository) {
        $this->serializeManager = $serializeManager;
        $this->vehicleTypeRepository = $vehicleTypeRepository;
    }

    #[Route('/vehicle-types', name: 'get_vehicle_types', methods: ["GET"])]
    public function get_vehicle_types(): JsonResponse {
        return $this->json([
            "results" => $this->serializeManager->serializeContent(
                $this->vehicleTypeRepository->findAll()
            )
        ]);
    }

    #[Route('/vehicle-type/{vehicleTypeID}', name: 'get_vehicle_type', methods: ["GET"])]
    public function get_vehicle_type(int $vehicleTypeID) : JsonResponse {
        $vehicle_type = $this->vehicleTypeRepository->find($vehicleTypeID);
        if(empty($vehicle_type)) {
            return $this->json([
                "message" => "The vehicle type couldn't be found"
            ], Response::HTTP_NOT_FOUND);
        }

        return $this->json(
            $this->serializeManager->serializeContent($vehicle_type),
            Response::HTTP_OK
        );
    }
}
