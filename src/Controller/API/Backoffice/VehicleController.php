<?php

namespace App\Controller\API\Backoffice;

use App\Enum\VehicleEnum;
use App\Manager\FileManager;
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
    private FileManager $fileManager;
    private VehicleManager $vehicleManager;
    private SerializeManager $serializeManager;
    private VehicleRepository $vehicleRepository;

    function __construct(
        FileManager $fileManager,
        VehicleManager $vehicleManager,
        SerializeManager $serializeManager,
        VehicleRepository $vehicleRepository
    ) {
        $this->fileManager = $fileManager;
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
            ], isset(Response::$statusCode[$code]) && $code !== 200 ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
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
        $vehicle = $this->vehicleRepository->find($vehicleID);
        if(empty($vehicle)) {
            return $this->json([
                "message" => "Vehicle not found"
            ], Response::HTTP_NOT_FOUND);
        }

        try {
            $fields = $this->vehicleManager->checkFields([
                VehicleEnum::VEHICLE_PHOTO => $request->file->get("photo"),
                "previews" => $request->file->get("previews")
            ]);
            if(empty($fields)) {
                throw new \Exception("An error has been encountered with the sended body", Response::HTTP_PRECONDITION_FAILED);
            }

            // Save files in vehicle repository
            $fields[VehicleEnum::VEHICLE_PHOTO] = "/content/img/vehicles/" . $this->fileManager->uploadFile($fields[VehicleEnum::VEHICLE_PHOTO], $this->getParameter("vehicles_img_directory"), "{$vehicle->getId()} - {$vehicle->getName()}");

            // Update vehicle object
            $vehicle = $this->vehicleManager->fillVehicle($fields);
            if(is_string($vehicle)) {
                throw new \Exception($vehicle, Response::HTTP_INTERNAL_SERVER_ERROR);
            }

            // Save changes into database
            $this->vehicleRepository->save($vehicle, true);
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], isset(Response::$statusCode[$code]) && $code !== 200 ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(
            $vehicle, 
            Response::HTTP_ACCEPTED
        );
    }

    #[Route('/vehicle/{vehicleID}/remove', name: 'remove_vehicle_photo', methods: ["DELETE"])]
    public function remove_vehicle(int $vehicleID) : JsonResponse {
        $vehicle = $this->vehicleRepository->find($vehicleID);
        if(empty($vehicle)) {
            return $this->json([
                "message" => "Vehicle not found"
            ], Response::HTTP_NOT_FOUND);
        }

        try {
            // Remove all consumptions datas

            // Remove all characteristics datas

            // Remove association with the maker

            // Remove photos & previews
            // $this->fileManager->removeFile($vehicle->getPhoto());

            // At the end, remove the object and apply all changes into database
            // $this->vehicleRepository->remove($vehicle, true);
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], isset(Response::$statusCode[$code]) && $code !== 200 ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(null, Response::HTTP_NO_CONTENT);
    }
}
