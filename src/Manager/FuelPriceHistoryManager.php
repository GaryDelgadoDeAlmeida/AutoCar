<?php

namespace App\Manager;

use App\Entity\FuelPriceHistory;
use App\Enum\FuelPriceHistoryEnum;

class FuelPriceHistoryManager {

    /**
     * @param array json content
     * @return array
     */
    public function checkFields(array $jsonContent) : array {
        $fields = [];
        $allowedFields = [];

        foreach($jsonContent as $fieldName => $fieldValue) {
            if(!in_array($fieldName, $allowedFields)) {
                continue;
            }

            if($fieldName == FuelPriceHistoryEnum::HISTORY_FUEL) {
                // 
            } elseif($fieldName == FuelPriceHistoryEnum::HISTORY_PRICE) {
                // 
            }

            $fields[$fieldName] = $fieldValue;
        }

        return $fields;
    }

    /**
     * @param array fields
     * @param ?FuelPriceHistory
     * @return FuelPriceHistory
     */
    public function fillFuelPriceHistory(array $fields, ?FuelPriceHistory $fuelPriceHistory = new FuelPriceHistory()) : FuelPriceHistory {
        if(!$fuelPriceHistory->getId()) {
            $fuelPriceHistory->setCreatedAt(new \DateTimeImmutable());
        }
        
        foreach($fields as $fieldName => $fieldValue) {
            if($fieldName == FuelPriceHistoryEnum::HISTORY_FUEL) $fuelPriceHistory->setFuel($fieldValue);
            elseif($fieldName == FuelPriceHistoryEnum::HISTORY_PRICE) $fuelPriceHistory->setPrice($fieldValue);
        }

        return $fuelPriceHistory;
    }
}