<?php

namespace App\Manager;

use App\Entity\StationFuel;
use App\Enum\StationFuelEnum;

use function PHPSTORM_META\elementType;

class StationFuelManager {

    /**
     * Check sended fields data & format
     * 
     * @param array $jsonContent
     * @return array
     */
    public function checkFields(array $jsonContent) : array {
        $fields = [];
        $allowedFields = StationFuelEnum::getAvailableChoices();

        foreach($jsonContent as $fieldName => $fieldValue) {
            if(!in_array($fieldName, $allowedFields)) {
                continue;
            }

            if($fieldName == StationFuelEnum::STATIONFUEL_STATION) {
                // 
            } elseif($fieldName == StationFuelEnum::STATIONFUEL_FUEL) {
                // 
            } elseif($fieldName == StationFuelEnum::STATIONFUEL_FUELKEY) {
                // 
            } elseif($fieldName == StationFuelEnum::STATIONFUEL_PRICE) {
                // 
            }

            $fields[$fieldName] = $fieldValue;
        }

        return $fields;
    }

    /**
     * Fill an object StationFuel or update an existing one
     * 
     * @param array $fields
     * @param StationFuel $stationFuel
     * @return StationFuel|string
     */
    public function fillStationFuel(array $fields, StationFuel $stationFuel = new StationFuel()) : StationFuel|string {
        try {
            $currentTime = new \DateTimeImmutable();
            if($stationFuel->getId()) {
                $stationFuel->setUpdatedAt($currentTime);
            } else {
                $stationFuel->setCreatedAt($currentTime);
            }

            foreach($fields as $fieldName => $fieldValue) {
                if($fieldName == StationFuelEnum::STATIONFUEL_STATION) $stationFuel->setStation($fieldValue);
                elseif($fieldName == StationFuelEnum::STATIONFUEL_FUEL) $stationFuel->setFuel($fieldValue);
                elseif($fieldName == StationFuelEnum::STATIONFUEL_FUELKEY) $stationFuel->setFuelKey($fieldValue);
                elseif($fieldName == StationFuelEnum::STATIONFUEL_PRICE) $stationFuel->setPrice(floatval($fieldValue));
            }
        } catch(\Exception $e) {
            return $e->getMessage();
        }

        return $stationFuel;
    }
}