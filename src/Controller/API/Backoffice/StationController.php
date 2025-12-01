<?php

namespace App\Controller\API\Backoffice;

use App\Manager\StationManager;
use App\Repository\StationRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api/backoffice', name: 'api_backoffice_')]
final class StationController extends AbstractController
{
    private StationManager $stationManager;
    private StationRepository $stationRepository;

    function __construct(StationManager $stationManager, StationRepository $stationRepository) {
        $this->stationManager = $stationManager;
        $this->stationRepository = $stationRepository;
    }

    #[Route('/station', name: 'post_station', methods: ["POST"])]
    public function post_station(Request $request): JsonResponse {
        return $this->json(null);
    }
    
    #[Route('/station/{stationID}/update', name: 'update_station', methods: ["UPDATE", "PUT"])]
    public function update_station(int $stationID, Request $request): JsonResponse {
        return $this->json(null);
    }
    
    #[Route('/station/{stationID}/remove', name: 'remove_station', methods: ["DELETE"])]
    public function remove_station(int $stationID): JsonResponse {
        return $this->json(null);
    }
}
