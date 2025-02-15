<?php

namespace App\Manager;

use App\Entity\Vehicle;
use App\Entity\VehicleConsumption;
use App\Enum\VehicleConsumptionsEnum;
use App\Repository\ConsumptionRepository;
use App\Repository\VehicleRepository;

class VehicleConsumptionManager {

    private VehicleRepository $vehicleRepository;
    private ConsumptionRepository $consumptionRepository;

    function __construct(
        VehicleRepository $vehicleRepository,
        ConsumptionRepository $consumptionRepository
    ) {
        $this->vehicleRepository = $vehicleRepository;
        $this->consumptionRepository = $consumptionRepository;
    }

    /**
     * Check all fields integrity sended datas
     * 
     * @param array $jsonContent
     * @return array
     */
    public function checkFields(array $jsonContent) : array {
        $fields = [];
        $allowedFields = VehicleConsumptionsEnum::getAvailableChoices();

        foreach($jsonContent as $index => $row) {
            
            // If the row is empty, skip it
            if(empty($row)) {
                continue;
            }

            foreach($row as $fieldName => $fieldValue) {
                $fieldValue = is_string($fieldValue) ? trim($fieldValue) : $fieldValue;

                if(!in_array($fieldName, $allowedFields)) {
                    continue;
                }

                // if(empty($fieldValue)) {
                //     throw new \Exception("The field '{$fieldName}' must be filled with some value");
                // }

                if($fieldName == VehicleConsumptionsEnum::VEHICLE_CONSUMPTIONS_VEHICLE) {
                    $vehicle = $this->vehicleRepository->find($fieldValue);
                    if(empty($vehicle)) {
                        throw new \Exception("The vehicle couldn't be found.");
                    }

                    $fieldValue = $vehicle;
                } elseif($fieldName == VehicleConsumptionsEnum::VEHICLE_CONSUMPTIONS_CONSUMPTION) {
                    $consumption = $this->consumptionRepository->find($fieldValue);
                    if(empty($consumption)) {
                        throw new \Exception("The consumption couldn't be found.");
                    }

                    $fieldValue = $consumption;
                } elseif($fieldName == VehicleConsumptionsEnum::VEHICLE_CONSUMPTIONS_VALUE) {
                    if(strlen($fieldValue) > 255) {
                        throw new \Exception("The field '{$fieldName}' can't exceed 255 characters length.");
                    }
                }

                $fields[$index][$fieldName] = $fieldValue;
            }
        }

        return $fields;
    }

    /**
     * Fill a VehicleConsumption object with the sended datas
     * 
     * @param array $fields
     * @param VehicleConsumption $vehicleConsumption
     * @return string|VehicleConsumption
     */
    public function fillVehicleConsumption(array $fields, ?VehicleConsumption $vehicleConsumption = new VehicleConsumption()) : VehicleConsumption|string {
        try {
            $currentTime = new \DateTimeImmutable();
            if($vehicleConsumption->getId()) {
                $vehicleConsumption->setUpdatedAt($currentTime);
            } else {
                $vehicleConsumption->setCreatedAt($currentTime);
            }

            foreach($fields as $fieldName => $fieldValue) {
                if($fieldName == VehicleConsumptionsEnum::VEHICLE_CONSUMPTIONS_VEHICLE) $vehicleConsumption->setVehicle($fieldValue);
                elseif($fieldName == VehicleConsumptionsEnum::VEHICLE_CONSUMPTIONS_CONSUMPTION) $vehicleConsumption->setConsumption($fieldValue);
                elseif($fieldName == VehicleConsumptionsEnum::VEHICLE_CONSUMPTIONS_VALUE) $vehicleConsumption->setValue($fieldValue);
            }
        } catch(\Exception $e) {
            return $e->getMessage();
        }

        return $vehicleConsumption;
    }
}