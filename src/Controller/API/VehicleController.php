<?php

namespace App\Controller\API;

use App\Manager\SerializeManager;
use App\Repository\VehiculeRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api', name: 'api_')]
class VehicleController extends AbstractController
{
    private SerializeManager $serializeManager;
    private VehiculeRepository $vehiculeRepository;

    function __construct(SerializeManager $serializeManager, VehiculeRepository $vehiculeRepository) {
        $this->serializeManager = $serializeManager;
        $this->vehiculeRepository = $vehiculeRepository;
    }

    #[Route('/vehicles', name: 'get_vehicles', methods: ["GET"])]
    public function get_vehicles(Request $request): JsonResponse {
        $limit = 12;
        $offset = is_numeric($request->get("offset")) && intval($request->get("offset")) == $request->get("offset") && $request->get("offset") > 1 ? intval($request->get("offset")) : 1;
        $vehicles = $this->vehiculeRepository->findBy([], ["createdAt" => "DESC"], $limit, ($offset - 1) * $limit);
        
        return $this->json([
            "offset" => $offset,
            "maxOffet" => 1,
            "results" => $vehicles ?? $this->serializeManager->serializeContent($vehicles)
        ]);
    }

    #[Route('/vehicle/{vehicleID}', name: 'get_vehicle', methods: ["GET"])]
    public function get_vehicle(int $vehicleID): JsonResponse {
        $vehicle = $this->vehiculeRepository->find($vehicleID);
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
