<?php

namespace App\Manager;

use App\Entity\VehiculeCategory;

class VehicleCategoyManager {

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

    public function fillVehicleCategory(array $fields, ?VehiculeCategory $vehiculeCategory = new VehiculeCategory()) : VehiculeCategory {
        try {
            $currentTime = new \DateTimeImmutable();
            if($vehiculeCategory->getId()) {
                $vehiculeCategory->setUpdatedAt($currentTime);
            } else {
                $vehiculeCategory->setCreatedAt($currentTime);
            }

            foreach($fields as $fieldName => $fieldValue) {
                if($fieldName == "") $vehiculeCategory->setType($fieldValue);
            }
        } catch(\Exception $e) {
            return $e->getMessage();
        }

        return $vehiculeCategory;
    }
}