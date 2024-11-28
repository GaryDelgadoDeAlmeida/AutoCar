<?php

namespace App\Controller\API\Backoffice;

use App\Manager\SerializeManager;
use App\Manager\VehicleCategoyManager;
use App\Repository\VehiculeCategoryRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/backoffice', name: 'api_backoffice_')]
class VehicleTypeController extends AbstractController
{
    private SerializeManager $serializeManager;
    private VehicleCategoyManager $vehicleCategoyManager;
    private VehiculeCategoryRepository $vehiculeCategoryRepository;

    function __construct(
        SerializeManager $serializeManager,
        VehicleCategoyManager $vehicleCategoyManager,
        VehiculeCategoryRepository $vehiculeCategoryRepository
    ) {
        $this->serializeManager = $serializeManager;
        $this->vehicleCategoyManager = $vehicleCategoyManager;
        $this->vehiculeCategoryRepository = $vehiculeCategoryRepository;
    }

    #[Route('/vehicle-type', name: 'post_vehicle_type', methods: ["POST"])]
    public function post_vehicle_type(Request $request): JsonResponse {
        $jsonContent = json_decode($request->getContent(), true);
        if(empty($jsonContent)) {
            return $this->json([
                "message" => "An error has been encountered with the sended body"
            ], Response::HTTP_PRECONDITION_FAILED);
        }

        try {
            $fields = $this->vehicleCategoyManager->checkFields($jsonContent);
            if(empty($fields)) {
                throw new \Exception("An error has been encountered with the sended body", Response::HTTP_PRECONDITION_FAILED);
            }

            $vehicleType = $this->vehicleCategoyManager->fillVehicleCategory($fields);
            if(is_string($vehicleType)) {
                throw new \Exception($vehicleType, Response::HTTP_INTERNAL_SERVER_ERROR);
            }

            $this->vehiculeCategoryRepository->save($vehicleType, true);
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], isset(Response::$statusTexts[$code]) && $code !== Response::HTTP_OK ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        
        return $this->json(null, Response::HTTP_CREATED);
    }
}
