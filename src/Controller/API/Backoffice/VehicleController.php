<?php

namespace App\Controller\API\Backoffice;

use App\Manager\SerializeManager;
use App\Repository\VehicleRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/backoffice', name: 'api_backoffice_')]
class VehicleController extends AbstractController
{
    private SerializeManager $serializeManager;
    private VehicleRepository $vehicleRepository;

    function __construct(
        SerializeManager $serializeManager,
        VehicleRepository $vehicleRepository
    ) {
        $this->serializeManager = $serializeManager;
        $this->vehicleRepository = $vehicleRepository;
    }

    #[Route('/vehicle', name: 'post_vehicle', methods: ["POST"])]
    public function post_vehicle(Request $request): JsonResponse {
        return $this->json(["Route under construction"], Response::HTTP_OK);
    }
}
