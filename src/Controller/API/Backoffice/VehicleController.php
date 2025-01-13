<?php

namespace App\Controller\API\Backoffice;

use App\Manager\VehicleManager;
use App\Manager\SerializeManager;
use App\Repository\VehicleRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api/backoffice', name: 'api_backoffice_')]
class VehicleController extends AbstractController
{
    private VehicleManager $vehicleManager;
    private SerializeManager $serializeManager;
    private VehicleRepository $vehicleRepository;

    function __construct(
        VehicleManager $vehicleManager,
        SerializeManager $serializeManager,
        VehicleRepository $vehicleRepository
    ) {
        $this->vehicleManager = $vehicleManager;
        $this->serializeManager = $serializeManager;
        $this->vehicleRepository = $vehicleRepository;
    }

    #[Route('/vehicle', name: 'post_vehicle', methods: ["POST"])]
    public function post_vehicle(Request $request): JsonResponse {
        $jsonContent = json_decode($request->getContent(), true);
        if(empty($jsonContent)) {
            return $this->json([
                "message" => "An error has been encountered with the sended body"
            ], Response::HTTP_PRECONDITION_FAILED);
        }

        try {
            $fields = $this->vehicleManager->checkFields($jsonContent);
            if(empty($fields)) {
                throw new \Exception("An error has been encountered with the sended body", Response::HTTP_PRECONDITION_FAILED);
            }

            $vehicle = $this->vehicleManager->fillVehicle($fields);
            if(is_string($vehicle)) {
                throw new \Exception($vehicle, Response::HTTP_INTERNAL_SERVER_ERROR);
            }

            $this->vehicleRepository->save($vehicle, true);
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], isset(Response::$statusCode[$code]) && $code !== 200 ? $code : Response::HTTP_OK);
        }

        return $this->json(["Route under construction"], Response::HTTP_OK);
    }

    #[Route('/vehicle/{vehicleID}', name: 'update_vehicle', methods: ["UPDATE", "PUT"])]
    public function update_vehicle(int $vehicleID, Request $request) : JsonResponse {
        return $this->json([
            "message" => ""
        ], Response::HTTP_OK);
    }

    #[Route('/vehicle/{vehicleID}/photo', name: 'update_vehicle_photo', methods: ["UPDATE", "PUT"])]
    public function update_vehicle_photo(int $vehicleID, Request $request) : JsonResponse {
        $vehicle_photo = $request->files->get("logo");
        $vehicle_photos_previews = $request->files->get("photos");

        try {
            // 
        } catch(\Exception $e) {
            // 
        }

        return $this->json([
            "message" => ""
        ], Response::HTTP_OK);
    }
}
