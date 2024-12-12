<?php

namespace App\Controller\API;

use App\Manager\SerializeManager;
use App\Repository\FuelRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api', name: 'api_')]
class FuelController extends AbstractController
{
    private SerializeManager $serializeManager;
    private FuelRepository $fuelRepository;

    function __construct(SerializeManager $serializeManager, FuelRepository $fuelRepository) {
        $this->serializeManager = $serializeManager;
        $this->fuelRepository = $fuelRepository;
    }

    #[Route('/fuels', name: 'get_fuels', methods: ["GET"])]
    public function get_fuels(): JsonResponse {
        $fuels = $this->fuelRepository->findAll();

        return $this->json([
            "results" => !empty($fuels) ? $this->serializeManager->serializeContent($fuels) : $fuels
        ], Response::HTTP_OK);
    }
}
