<?php

namespace App\Manager;

use App\Entity\Vehicle;

class VehicleManager {

    /**
     * 
     */
    public function checkFields(array $jsonContent) {
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

    /**
     * 
     */
    public function fillVehicle(array $fields, ?Vehicle $vehicle = new Vehicle()) : Vehicle {
        try {
            // 
        } catch(\Exception $e) {
            return $e->getMessage();
        }
        return $vehicle;
    }
}