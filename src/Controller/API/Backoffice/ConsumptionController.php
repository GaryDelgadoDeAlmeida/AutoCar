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
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

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
        $response = $context = [];
        $resultsRequest = $request->get("request", null);
        if($resultsRequest == "all") {
            $response = [
                "results" => $this->consumptionRepository->findAll()
            ];
            $context = [
                ObjectNormalizer::IGNORED_ATTRIBUTES => ["vehicleConsumptions"]
            ];
        } else {
            $limit = 20;
            $offset = is_numeric($request->get("offset")) && intval($request->get("offset")) == $request->get("offset") && $request->get("offset") > 1 ? intval($request->get("offset")) : 1;

            $response = [
                "offset" => $offset,
                "maxOffset" => ceil($this->consumptionRepository->countConsumptions() / $limit),
                "results" => $this->consumptionRepository->getConsumptions($offset, $limit)
            ];
        }

        return $this->json($response, Response::HTTP_OK, [], $context);
    }

    #[Route('/consumption', name: 'post_consumption', methods: ["POST"])]
    public function post_consumption(Request $request): JsonResponse {
        $jsonContent = json_decode($request->getContent(), true);
        if(empty($jsonContent)) {
            return $this->json([
                "message" => "An error has been encountered with the sended body"
            ], Response::HTTP_PRECONDITION_FAILED);
        }

        try {
            $fields = $this->consumptionManager->checkFields($jsonContent);
            if(empty($fields)) {
                throw new \Exception("An error has been encountered with the sended body", Response::HTTP_PRECONDITION_FAILED);
            }

            $consumption = $this->consumptionRepository->fillConsumption($fields);
            if(is_string($consumption)) {
                throw new \Exception($consumption);
            }

            $this->consumptionRepository->save($consumption, true);
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], isset(Response::$statusTexts[$code]) && $code !== Response::HTTP_OK ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json([]);
    }
}
