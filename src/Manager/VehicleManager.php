<?php

namespace App\Manager;

use App\Entity\Vehicle;
use App\Enum\VehicleEnum;

class VehicleManager {

    /**
     * 
     */
    public function checkFields(array $jsonContent) {
        $fields = [];
        $allowedFields = VehicleEnum::getAvalaibleChoices();
        $requiredFields = VehicleEnum::getRequiredFields();

        foreach($jsonContent as $fieldName => $fieldValue) {
            if(!in_array($fieldName, $allowedFields)) {
                continue;
            }

            if(in_array($fieldName, $allowedFields) && empty($fieldValue)) {
                throw new \Exception(sprintf("The field '%s' must be filled with some value", $fieldName));
            }
 
            if($fieldName == VehicleEnum::VEHICLE_MAKER) {
                // 
            } elseif($fieldName == VehicleEnum::VEHICLE_PHOTO) {
                // 
            } elseif($fieldName == VehicleEnum::VEHICLE_BASEMODEL) {
                // 
            } elseif($fieldName == VehicleEnum::VEHICLE_NAME) {
                // 
            } elseif($fieldName == VehicleEnum::VEHICLE_FUEL) {
                // 
            } elseif($fieldName == VehicleEnum::VEHICLE_FUEL_TANK) {
                // 
            } elseif($fieldName == VehicleEnum::VEHICLE_WEIGHT) {
                // 
            } elseif($fieldName == VehicleEnum::VEHICLE_MAX_SPEED) {
                // 
            } elseif($fieldName == VehicleEnum::VEHICLE_AVERAGE_FUELD_CONSUMPTION) {
                // 
            } elseif($fieldName == VehicleEnum::VEHICLE_PRICE) {
                // 
            } elseif($fieldName == VehicleEnum::VEHICLE_BUILD_AT) {
                // 
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
    public function fillVehicle(array $fields, ?Vehicle $vehicle = new Vehicle()) : Vehicle {
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
                elseif($fieldName == VehicleEnum::VEHICLE_FUEL) $vehicle->setFuel($fieldValue);
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