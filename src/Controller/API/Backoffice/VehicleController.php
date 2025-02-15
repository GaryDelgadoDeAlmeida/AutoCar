<?php

namespace App\Controller\API\Backoffice;

use App\Enum\VehicleCharacteristicsEnum;
use App\Enum\VehicleConsumptionsEnum;
use App\Enum\VehicleEnum;
use App\Manager\FileManager;
use App\Manager\VehicleCharacteristicManager;
use App\Manager\VehicleConsumptionManager;
use App\Manager\VehicleManager;
use App\Repository\FuelRepository;
use App\Repository\MakerRepository;
use App\Repository\VehicleCharacteristicRepository;
use App\Repository\VehicleConsumptionRepository;
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
    private VehicleConsumptionManager $vehicleConsumptionManager;
    private VehicleCharacteristicManager $vehicleCharacteristicManager;

    private FuelRepository $fuelRepository;
    private MakerRepository $makerRepository;
    private VehicleRepository $vehicleRepository;
    private VehicleConsumptionRepository $vehicleConsumptionRepository;
    private VehicleCharacteristicRepository $vehicleCharacteristicRepository;

    function __construct(
        FileManager $fileManager,
        VehicleManager $vehicleManager,
        VehicleConsumptionManager $vehicleConsumptionManager,
        VehicleCharacteristicManager $vehicleCharacteristicManager,
        FuelRepository $fuelRepository,
        MakerRepository $makerRepository,
        VehicleRepository $vehicleRepository,
        VehicleConsumptionRepository $vehicleConsumptionRepository,
        VehicleCharacteristicRepository $vehicleCharacteristicRepository
    ) {
        $this->fileManager = $fileManager;
        $this->vehicleManager = $vehicleManager;
        $this->vehicleConsumptionManager = $vehicleConsumptionManager;
        $this->vehicleCharacteristicManager = $vehicleCharacteristicManager;

        $this->fuelRepository = $fuelRepository;
        $this->makerRepository = $makerRepository;
        $this->vehicleRepository = $vehicleRepository;
        $this->vehicleConsumptionRepository = $vehicleConsumptionRepository;
        $this->vehicleCharacteristicRepository = $vehicleCharacteristicRepository;
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

            // Update/Insert all characteristics in the given characteristics datas
            foreach($fields[VehicleEnum::VEHICLE_CHARACTERISTICS] as $characteristic) {
                $vehicleCharacteristic = $this->vehicleCharacteristicManager->fillVehicleCharacteristic($characteristic);
                if(is_string($vehicleCharacteristic)) {
                    throw new \Exception($vehicleCharacteristic);
                }

                $this->vehicleCharacteristicRepository->save($vehicleCharacteristic, true);
            }

            // Update/Insert all consumptions in the given consumptions datas
            foreach($fields[VehicleEnum::VEHICLE_CONSUMPTIONS] as $consumption) {
                $vehicleConsumption = $this->vehicleConsumptionManager->fillVehicleConsumption($consumption);
                if(is_string($vehicleConsumption)) {
                    throw new \Exception($vehicleConsumption);
                }

                $this->vehicleConsumptionRepository->save($vehicleConsumption, true);
            }
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], isset(Response::$statusTexts[$code]) && $code !== 200 ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        $vehicleID = $vehicle->getId();
        $vehicle = $this->vehicleRepository->getVehicle($vehicleID);
        $vehicle["maker"] = $this->makerRepository->getVehicleMaker($vehicleID);
        $vehicle["fuels"] = $this->fuelRepository->getVehicleFuels($vehicleID);
        $vehicle["characteristics"] = $this->vehicleCharacteristicRepository->getVehicleCharacteristics($vehicleID);
        $vehicle["consumptions"] = $this->vehicleConsumptionRepository->getVehicleConsumptions($vehicleID);

        return $this->json(
            $vehicle, 
            Response::HTTP_CREATED
        );
    }

    #[Route('/vehicle/{vehicleID}', name: 'update_vehicle', methods: ["UPDATE", "PUT"])]
    public function update_vehicle(int $vehicleID, Request $request) : JsonResponse {
        $vehicle = $this->vehicleRepository->find($vehicleID);
        if(empty($vehicle)) {
            return $this->json([
                "message" => "The vehicle couldn't be found"
            ], Response::HTTP_NOT_FOUND);
        }

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

            // Update all vehicle datas
            $vehicle = $this->vehicleManager->fillVehicle($fields, $vehicle);
            if(is_string($vehicle)) {
                throw new \Exception($vehicle);
            }

            // Update vehicle characteristics objects
            $vehicleCharacteristics = $vehicle->getVehicleCharacteristics();

            // Remove all characteristics that don't exist in given/sended characteristics datas
            foreach($vehicleCharacteristics as $vehicleCharacteristic) {
                $exist = false;
                foreach($fields[VehicleEnum::VEHICLE_CHARACTERISTICS] as $sendedVehicleCharacteristic) {
                    if($vehicleCharacteristic->getCharacteristic()->getId() == $sendedVehicleCharacteristic[VehicleCharacteristicsEnum::VEHICLE_CHARACTERISTICS_CHARACTERISTIC]->getId()) {
                        $exist = true;
                        break;
                    }
                }

                // If vehicle characteristic has confirmed to exist then skip the row
                if($exist) {
                    continue;
                }

                // Remove vehicle characteristic object
                $this->vehicleCharacteristicRepository->remove($vehicleCharacteristic, true);
            }

            // Update/Insert all characteristics in the given characteristics datas
            foreach($fields[VehicleEnum::VEHICLE_CHARACTERISTICS] as $characteristic) {
                $vehicleCharacteristic = null;
                foreach($vehicleCharacteristics as $vehicleC) {
                    if($vehicleC->getCharacteristic()->getId() == $characteristic[VehicleCharacteristicsEnum::VEHICLE_CHARACTERISTICS_CHARACTERISTIC]->getId()) {
                        $vehicleCharacteristic = $vehicleC;
                        break;
                    }
                }

                $vehicleCharacteristic = $this->vehicleCharacteristicManager->fillVehicleCharacteristic($characteristic, $vehicleCharacteristic);
                if(is_string($vehicleCharacteristic)) {
                    throw new \Exception($vehicleCharacteristic);
                }

                $this->vehicleCharacteristicRepository->save($vehicleCharacteristic, true);
            }

            // Remove all consumptions that don't exist in given/sended consumptions datas
            $vehicleConsumptions = $vehicle->getVehicleConsumptions();
            foreach($vehicleConsumptions as $vehicleConsumption) {
                $exist = false;
                foreach($fields[VehicleEnum::VEHICLE_CONSUMPTIONS] as $sendedVehicleConsumption) {
                    if($vehicleConsumption->getConsumption()->getId() == $sendedVehicleConsumption[VehicleConsumptionsEnum::VEHICLE_CONSUMPTIONS_CONSUMPTION]->getId()) {
                        $exist = true;
                        break;
                    }
                }

                // If vehicle consumption has confirmed to exist then skip the row
                if($exist) {
                    continue;
                }

                // Remove vehicle consumption object
                $this->vehicleConsumptionRepository->remove($vehicleConsumption, true);
            }

            // Update/Insert all consumptions in the given consumptions datas
            foreach($fields[VehicleEnum::VEHICLE_CONSUMPTIONS] as $consumption) {
                $vehicleConsumption = null;
                foreach($vehicleConsumptions as $vehicleC) {
                    if($vehicleC->getConsumption()->getId() == $consumption[VehicleConsumptionsEnum::VEHICLE_CONSUMPTIONS_CONSUMPTION]->getId()) {
                        $vehicleConsumption = $vehicleC;
                        break;
                    }
                }

                $vehicleConsumption = $this->vehicleConsumptionManager->fillVehicleConsumption($consumption, $vehicleConsumption);
                if(is_string($vehicleConsumption)) {
                    throw new \Exception($vehicleConsumption);
                }

                $this->vehicleConsumptionRepository->save($vehicleConsumption, true);
            }

            // Save changes into database
            $this->vehicleRepository->save($vehicle, true);
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], isset(Response::$statusTexts[$code]) && $code !== 200 ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        $vehicle = $this->vehicleRepository->getVehicle($vehicleID);
        $vehicle["maker"] = $this->makerRepository->getVehicleMaker($vehicleID);
        $vehicle["fuels"] = $this->fuelRepository->getVehicleFuels($vehicleID);
        $vehicle["characteristics"] = $this->vehicleCharacteristicRepository->getVehicleCharacteristics($vehicleID);
        $vehicle["consumptions"] = $this->vehicleConsumptionRepository->getVehicleConsumptions($vehicleID);

        return $this->json(
            $vehicle, 
            Response::HTTP_ACCEPTED
        );
    }

    #[Route('/vehicle/{vehicleID}/photo', name: 'update_vehicle_photo', methods: ["POST"])]
    public function update_vehicle_photo(int $vehicleID, Request $request) : JsonResponse {
        $vehicle = $this->vehicleRepository->find($vehicleID);
        if(empty($vehicle)) {
            return $this->json([
                "message" => "Vehicle not found"
            ], Response::HTTP_NOT_FOUND);
        }

        try {
            $fields = $this->vehicleManager->checkFields([
                VehicleEnum::VEHICLE_PHOTO => $request->files->get("photo"),
                "previews" => $request->files->get("previews")
            ]);
            if(empty($fields)) {
                throw new \Exception("An error has been encountered with the sended body", Response::HTTP_PRECONDITION_FAILED);
            }

            // Save files in vehicle repository
            $fields[VehicleEnum::VEHICLE_PHOTO] = "/content/img/vehicles/" . $this->fileManager->uploadFile($fields[VehicleEnum::VEHICLE_PHOTO], $this->getParameter("vehicles_img_directory"), "{$vehicle->getId()} - {$vehicle->getName()}");

            // Update vehicle object
            $vehicle = $this->vehicleManager->fillVehicle($fields, $vehicle);
            if(is_string($vehicle)) {
                throw new \Exception($vehicle, Response::HTTP_INTERNAL_SERVER_ERROR);
            }

            // Save changes into database
            $this->vehicleRepository->save($vehicle, true);
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], isset(Response::$statusTexts[$code]) && $code !== 200 ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        $vehicle = $this->vehicleRepository->getVehicle($vehicleID);
        $vehicle["maker"] = $this->makerRepository->getVehicleMaker($vehicleID);
        $vehicle["fuels"] = $this->fuelRepository->getVehicleFuels($vehicleID);
        $vehicle["characteristics"] = $this->vehicleCharacteristicRepository->getVehicleCharacteristics($vehicleID);
        $vehicle["consumptions"] = $this->vehicleConsumptionRepository->getVehicleConsumptions($vehicleID);

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

            // Remove association with the fuels

            // Remove photos & previews
            // $this->fileManager->removeFile($vehicle->getPhoto());

            // At the end, remove the object and apply all changes into database
            // $this->vehicleRepository->remove($vehicle, true);
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], isset(Response::$statusTexts[$code]) && $code !== 200 ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(null, Response::HTTP_NO_CONTENT);
    }
}