<?php

namespace App\Manager;

use App\Entity\Fuel;
use App\Enum\FuelEnum;

class FuelManager {

    /**
     * @param array json content
     */
    public function checkFields(array $jsonContent) {
        $fields = [];
        $allowedFields = FuelEnum::getAvalaibleChoices();

        foreach($jsonContent as $fieldName => $fieldValue) {
            if(!in_array($fieldName, $allowedFields)) {
                continue;
            }

            if($fieldName == FuelEnum::FUEL_TITLE) {
                // 
            } elseif($fieldName == FuelEnum::FUEL_PRICE) {
                // 
            } elseif($fieldName == FuelEnum::FUEL_KEY) {
                // 
            }

            $fields[$fieldName] = $fieldValue;
        }

        return $fields;
    }

    /**
     * @param array $fields
     * @param Fuel fuel
     * @return Fuel|string
     */
    public function fillFuel(array $fields, ?Fuel $fuel = new Fuel()) {
        try {
            $currentTime = new \DateTimeImmutable();
            if($fuel->getId()) {
                $fuel->setUpdatedAt($currentTime);
            } else {
                $fuel->setCreatedAt($currentTime);
            }
            
            foreach($fields as $fieldName => $fieldValue) {
                if($fieldName == FuelEnum::FUEL_TITLE) $fuel->setTitle($fieldValue);
                elseif($fieldName == FuelEnum::FUEL_PRICE) $fuel->setPrice(floatval($fieldValue));
                elseif($fieldName == FuelEnum::FUEL_KEY) $fuel->setFuelKey($fieldValue);
            }
        } catch(\Exception $e) {
            return $e->getMessage();
        }

        return $fuel;
    }
}