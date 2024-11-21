<?php

namespace App\Controller\API;

use App\Manager\SerializeManager;
use App\Repository\VehiculeCategoryRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api', name: 'api_')]
class VehicleTypeController extends AbstractController
{
    private SerializeManager $serializeManager;
    private VehiculeCategoryRepository $vehiculeCategoryRepository;

    function __construct(SerializeManager $serializeManager, VehiculeCategoryRepository $vehiculeCategoryRepository) {
        $this->serializeManager = $serializeManager;
        $this->vehiculeCategoryRepository = $vehiculeCategoryRepository;
    }

    #[Route('/vehicle-types', name: 'get_vehicle_types', methods: ["GET"])]
    public function get_vehicle_types(): JsonResponse {
        return $this->json([
            "results" => $this->serializeManager->serializeContent(
                $this->vehiculeCategoryRepository->findAll()
            )
        ]);
    }

    #[Route('/vehicle-type/{vehicleTypeID}', name: 'get_vehicle_type', methods: ["GET"])]
    public function get_vehicle_type(int $vehicleTypeID) : JsonResponse {
        $vehicle_type = $this->vehiculeCategoryRepository->find($vehicleTypeID);
        if(empty($vehicle_type)) {
            return $this->json([
                "message" => "The vehicle type couldn't be found"
            ], Response::HTTP_NOT_FOUND);
        }

        return $this->json($this->serializeManager->serializeContent($vehicle_type));
    }
}
