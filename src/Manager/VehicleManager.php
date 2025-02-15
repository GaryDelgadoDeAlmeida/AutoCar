<?php

namespace App\Manager;

use App\Entity\Vehicle;
use App\Enum\VehicleEnum;
use App\Repository\FuelRepository;
use App\Repository\MakerRepository;

class VehicleManager {

    private FuelRepository $fuelRepository;
    private MakerRepository $makerRepository;
    private VehicleConsumptionManager $vehicleConsumptionManager;
    private VehicleCharacteristicManager $vehicleCharacteristicManager;

    function __construct(
        FuelRepository $fuelRepository,
        MakerRepository $makerRepository,
        VehicleConsumptionManager $vehicleConsumptionManager,
        VehicleCharacteristicManager $vehicleCharacteristicManager
    ) {
        $this->fuelRepository = $fuelRepository;
        $this->makerRepository = $makerRepository;
        $this->vehicleConsumptionManager = $vehicleConsumptionManager;
        $this->vehicleCharacteristicManager = $vehicleCharacteristicManager;
    }

    /**
     * @param array jsonContent
     * @return array fields
     */
    public function checkFields(array $jsonContent) {
        $fields = [];
        $allowedFields = VehicleEnum::getAvailableChoices();
        $requiredFields = VehicleEnum::getRequiredFields();

        foreach($jsonContent as $fieldName => $fieldValue) {
            if(!in_array($fieldName, $allowedFields)) {
                continue;
            }

            if(in_array($fieldName, $requiredFields) && empty($fieldValue)) {
                throw new \Exception(sprintf("The field '%s' must be filled with some value", $fieldName));
            }
 
            if($fieldName == VehicleEnum::VEHICLE_MAKER) {
                $maker = $this->makerRepository->find($fieldValue);
                if(empty($maker)) {
                    throw new \Exception("An error has been found. The car manufacturer couldn't be found in our database");
                }

                $fieldValue = $maker;
            } elseif($fieldName == VehicleEnum::VEHICLE_PHOTO) {
                // 
            } elseif($fieldName == VehicleEnum::VEHICLE_BASEMODEL) {
                if(strlen($fieldValue) > 255) {
                    throw new \Exception("The field '{$fieldName}' value can't exceed 255 characters length.");
                }
            } elseif($fieldName == VehicleEnum::VEHICLE_NAME) {
                if(strlen($fieldValue) > 255) {
                    throw new \Exception("The field '{$fieldName}' value can't exceed 255 characters length.");
                }
            } elseif($fieldName == VehicleEnum::VEHICLE_FUEL) {
                $fuel = $this->fuelRepository->find($fieldValue);
                if(empty($fuel)) {
                    throw new \Exception("An error has been found. The fuel couldn't be found in our database");
                }

                $fieldValue = $fuel;
            } elseif($fieldName == VehicleEnum::VEHICLE_FUEL_TANK) {
                if(!empty($fieldValue) && !is_numeric($fieldValue)) {
                    throw new \Exception("The vehicle fuel tank must be a numeric value");
                }
            } elseif($fieldName == VehicleEnum::VEHICLE_WEIGHT) {
                if(!empty($fieldValue) && !is_numeric($fieldValue)) {
                    throw new \Exception("The vehicle weight must be a numeric value");
                }

                $fieldValue = floatval($fieldValue);
            } elseif($fieldName == VehicleEnum::VEHICLE_MAX_SPEED) {
                if(!empty($fieldValue)) {
                    if(!is_numeric($fieldValue)) {
                        throw new \Exception("The vehicle max speed must be a numeric value");
                    }
    
                    $fieldValue = floatval($fieldValue);
                } else {
                    $fieldValue = null;
                }
            } elseif($fieldName == VehicleEnum::VEHICLE_AVERAGE_FUELD_CONSUMPTION) {
                if(!empty($fieldValue) && !is_numeric($fieldValue)) {
                    throw new \Exception("The vehicle average fuel consumption must be a numeric value");
                }

                $fieldValue = floatval($fieldValue);
            } elseif($fieldName == VehicleEnum::VEHICLE_PRICE) {
                if(!empty($fieldValue) && !is_numeric($fieldValue)) {
                    throw new \Exception("The price of the vehicle must be a numeric value");
                }

                $fieldValue = floatval($fieldValue);
            } elseif($fieldName == VehicleEnum::VEHICLE_BUILD_AT) {
                $buildedAt = new \DateTimeImmutable($fieldValue);
                if($buildedAt->format(\DateTime::ATOM) != $fieldValue) {
                    throw new \Exception("The builded date of the vehicle don't match required format. The format but be 'Y-m-d'");
                }

                $fieldValue = $buildedAt;
            } elseif($fieldName == VehicleEnum::VEHICLE_CONSUMPTIONS) {
                if(!is_array($fieldValue)) {
                    throw new \Exception("The field '{$fieldName}' format don't match the expected one.");
                }

                if(count($fieldValue) == count($fieldValue, COUNT_RECURSIVE)) {
                    throw new \Exception("The field '{$fieldName}' expect a multidimensional array");
                }

                $fieldValue = $this->vehicleConsumptionManager->checkFields($fieldValue);
                if(empty($fieldValue)) {
                    throw new \Exception("An error has been encountered with the field '{$fieldName}'. Update process has been cancelled");
                }
            } elseif($fieldName == VehicleEnum::VEHICLE_CHARACTERISTICS) {
                if(!is_array($fieldValue)) {
                    throw new \Exception("The field '{$fieldName}' format don't match the expected one.");
                }

                if(count($fieldValue) == count($fieldValue, COUNT_RECURSIVE)) {
                    throw new \Exception("The field '{$fieldName}' expect a multidimensional array");
                }

                $fieldValue = $this->vehicleCharacteristicManager->checkFields($fieldValue);
                if(empty($fieldValue)) {
                    throw new \Exception("An error has been encountered with the field '{$fieldName}'. Update process has been cancelled");
                }
            }

            $fields[$fieldName] = $fieldValue;
        }

        return $fields;
    }

    /**
     * @param array fields
     * @param ?Vehicle
     * @return Vehicle|string
     */
    public function fillVehicle(array $fields, ?Vehicle $vehicle = new Vehicle()) : Vehicle|string {
        try {
            $currentTime = new \DateTimeImmutable();
            if($vehicle->getId()) {
                $vehicle->setUpdatedAt($currentTime);
            } else {
                $vehicle->setCreatedAt($currentTime);
            }

            foreach($fields as $fieldName => $fieldValue) {
                if($fieldName == VehicleEnum::VEHICLE_MAKER) $vehicle->setMaker($fieldValue);
                elseif($fieldName == VehicleEnum::VEHICLE_PHOTO) $vehicle->setPhoto($fieldValue);
                elseif($fieldName == VehicleEnum::VEHICLE_BASEMODEL) $vehicle->setBasemodel($fieldValue);
                elseif($fieldName == VehicleEnum::VEHICLE_NAME) $vehicle->setName($fieldValue);
                elseif($fieldName == VehicleEnum::VEHICLE_FUEL) $vehicle->addFuel($fieldValue);
                elseif($fieldName == VehicleEnum::VEHICLE_FUEL_TANK) $vehicle->setFuelTank($fieldValue);
                elseif($fieldName == VehicleEnum::VEHICLE_WEIGHT) $vehicle->setVehiculeWeight($fieldValue);
                elseif($fieldName == VehicleEnum::VEHICLE_MAX_SPEED) $vehicle->setMaxSpeed($fieldValue);
                elseif($fieldName == VehicleEnum::VEHICLE_AVERAGE_FUELD_CONSUMPTION) $vehicle->setAverageFuelConsumption($fieldValue);
                elseif($fieldName == VehicleEnum::VEHICLE_PRICE) $vehicle->setPrice(floatval($fieldValue));
                elseif($fieldName == VehicleEnum::VEHICLE_BUILD_AT) $vehicle->setBuildAt($fieldValue);
            }
        } catch(\Exception $e) {
            return $e->getMessage();
        }
        return $vehicle;
    }
}