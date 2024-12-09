<?php

namespace App\Manager;

use App\Entity\VehicleType;

class VehicleTypeManager {

    public function checkFields(array $jsonContent) : array {
        $fields = [];
        $allowedFields = [];

        foreach($jsonContent as $fieldName => $fieldValue) {
            if(!in_array($fieldName, $allowedFields)) {
                continue;
            }

            $fields[$fieldName] = $fieldValue;
        }

        return $fields;
    }

    public function fillVehicleCategory(array $fields, ?VehicleType $vehicleType = new VehicleType()) : VehicleType {
        try {
            $currentTime = new \DateTimeImmutable();
            if($vehicleType->getId()) {
                $vehicleType->setUpdatedAt($currentTime);
            } else {
                $vehicleType->setCreatedAt($currentTime);
            }

            foreach($fields as $fieldName => $fieldValue) {
                if($fieldName == "") $vehicleType->setType($fieldValue);
            }
        } catch(\Exception $e) {
            return $e->getMessage();
        }

        return $vehicleType;
    }
}