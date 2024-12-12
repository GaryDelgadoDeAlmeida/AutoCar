<?php

namespace App\Controller\API\Backoffice;

use App\Manager\SerializeManager;
use App\Manager\ConsumptionManager;
use App\Repository\ConsumptionRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api/backoffice', name: 'api_backoffice_')]
class ConsumptionController extends AbstractController
{
    private SerializeManager $serializeManager;
    private ConsumptionManager $consumptionManager;
    private ConsumptionRepository $consumptionRepository;
    
    function __construct(
        SerializeManager $serializeManager,
        ConsumptionManager $consumptionManager, 
        ConsumptionRepository $consumptionRepository
    ) {
        $this->serializeManager = $serializeManager;
        $this->consumptionManager = $consumptionManager;
        $this->consumptionRepository = $consumptionRepository;
    }

    #[Route('/consumptions', name: 'get_consumptions', methods: ["GET"])]
    public function get_consumptions(Request $request): JsonResponse {
        $limit = 20;
        $offset = is_numeric($request->get("offset")) && intval($request->get("offset")) == $request->get("offset") && $request->get("offset") > 1 ? intval($request->get("offset")) : 1;

        $consumptions = $this->consumptionRepository->findBy([], ["createdAt" => "DESC"], $limit, ($offset - 1) * $limit);

        return $this->json([
            "offset" => $offset,
            "maxOffset" => ceil($this->consumptionRepository->countConsumptions() / $limit),
            "results" => !empty($consumptions) ? $this->serializeManager->serializeContent($consumptions) : $consumptions,
        ]);
    }

    #[Route('/consumption', name: 'post_consumption', methods: ["POST"])]
    public function post_consumption(Request $request): JsonResponse {
        return $this->json([]);
    }
}
