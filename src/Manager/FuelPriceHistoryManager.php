<?php

namespace App\Manager;

use App\Entity\FuelPriceHistory;

class FuelPriceHistoryManager {

    /**
     * @param array json content
     * @return array
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
     * @param array fields
     * @param ?FuelPriceHistory
     * @return FuelPriceHistory
     */
    public function fillFuelPriceHistory(array $fields, ?FuelPriceHistory $fuelPriceHistory = new FuelPriceHistory()) {
        return $fuelPriceHistory;
    }
}