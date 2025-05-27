<?php

namespace App\Controller\API;

use App\Repository\VehicleTypeRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

#[Route('/api', name: 'api_')]
class VehicleTypeController extends AbstractController
{
    private VehicleTypeRepository $vehicleTypeRepository;

    function __construct(VehicleTypeRepository $vehicleTypeRepository) {
        $this->vehicleTypeRepository = $vehicleTypeRepository;
    }

    #[Route('/vehicle-types', name: 'get_vehicle_types', methods: ["GET"])]
    public function get_vehicle_types(): JsonResponse {
        return $this->json([
            "results" => $this->vehicleTypeRepository->findAll()
        ], Response::HTTP_OK, [], [
            ObjectNormalizer::IGNORED_ATTRIBUTES => ["vehicles"]
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
            $vehicle_type,
            Response::HTTP_OK,
            [],
            [ObjectNormalizer::IGNORED_ATTRIBUTES => ["vehicles"]]
        );
    }
}
