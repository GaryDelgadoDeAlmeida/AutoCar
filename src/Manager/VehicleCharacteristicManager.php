<?php

namespace App\Manager;

use App\Entity\VehicleCharacteristic;
use App\Enum\VehicleCharacteristicsEnum;
use App\Repository\CharacteristicRepository;
use App\Repository\VehicleRepository;

class VehicleCharacteristicManager {

    private VehicleRepository $vehicleRepository;
    private CharacteristicRepository $characteristicRepository;

    function __construct(
        VehicleRepository $vehicleRepository, 
        CharacteristicRepository $characteristicRepository
    ) {
        $this->vehicleRepository = $vehicleRepository;
        $this->characteristicRepository = $characteristicRepository;
    }

    /**
     * Check all sended data integrity and validity
     * 
     * @param array $jsonContent
     * @return array
     */
    public function checkFields(array $jsonContent) : array {
        $fields = [];
        $allowedFields = VehicleCharacteristicsEnum::getAvailableChoices();

        foreach($jsonContent as $index => $row) {
            if(empty($row)) {
                continue;
            }
            
            foreach($row as $fieldName => $fieldValue) {
                if(!in_array($fieldName, $allowedFields)) {
                    continue;
                }
    
                if($fieldName == VehicleCharacteristicsEnum::VEHICLE_CHARACTERISTICS_VEHICLE) {
                    $vehicle = $this->vehicleRepository->find($fieldValue);
                    if(empty($vehicle)) {
                        throw new \Exception("The vehicle couldn't be found.");
                    }
    
                    $fieldValue = $vehicle;
                } elseif($fieldName == VehicleCharacteristicsEnum::VEHICLE_CHARACTERISTICS_CHARACTERISTIC) {
                    $characteristic = $this->characteristicRepository->find($fieldValue);
                    if(empty($characteristic)) {
                        throw new \Exception("The charactereristic couldn't be found");
                    }
    
                    $fieldValue = $characteristic;
                } elseif($fieldName == VehicleCharacteristicsEnum::VEHICLE_CHARACTERISTICS_VALUE) {
                    if(strlen($fieldValue) > 255) {
                        throw new \Exception("The field '{$fieldName}' can't exceed 255 characters length");
                    }
                }
    
                $fields[$index][$fieldName] = $fieldValue;
            }
        }

        return $fields;
    }

    /**
     * Summary of fillVehicleCharacteristic
     * 
     * @param array $fields
     * @param mixed $vehicleCharacteristic
     * @return string|VehicleCharacteristic
     */
    public function fillVehicleCharacteristic(array $fields, ?VehicleCharacteristic $vehicleCharacteristic = new VehicleCharacteristic()) : VehicleCharacteristic|string {
        try {
            $currentTime = new \DateTimeImmutable();
            if($vehicleCharacteristic->getId()) {
                $vehicleCharacteristic->setUpdatedAt($currentTime);
            } else {
                $vehicleCharacteristic->setCreatedAt($currentTime);
            }

            foreach($fields as $fieldName => $fieldValue) {
                if($fieldName == VehicleCharacteristicsEnum::VEHICLE_CHARACTERISTICS_VEHICLE)  $vehicleCharacteristic->setVehicle($fieldValue);
                elseif($fieldName == VehicleCharacteristicsEnum::VEHICLE_CHARACTERISTICS_CHARACTERISTIC) $vehicleCharacteristic->setCharacteristic($fieldValue);
                elseif($fieldName == VehicleCharacteristicsEnum::VEHICLE_CHARACTERISTICS_VALUE) $vehicleCharacteristic->setValue($fieldValue);
            }
        } catch(\Exception $e) {
            return $e->getMessage();
        }

        return $vehicleCharacteristic;
    }
}