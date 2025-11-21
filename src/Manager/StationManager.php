<?php

namespace App\Manager;

use App\Entity\Station;
use App\Enum\StationEnum;

class StationManager {

    /**
     * Check & prepare the sended fields for an insert/update process
     * 
     * @param array $jsonContent
     * @return array
     */
    public function checkFields(array $jsonContent) : array {
        $fields = [];
        $allowedFields = StationEnum::getAvailableChoices();

        foreach($jsonContent as $fieldName => $fieldValue) {
            if(!in_array($fieldName, $allowedFields)) {
                continue;
            }

            if($fieldName == StationEnum::STATION_ADDRESS) {
                // 
            } elseif($fieldName == StationEnum::STATION_CITY) {
                // 
            } elseif($fieldName == StationEnum::STATION_ZIPCODE) {
                // 
            } elseif($fieldName == StationEnum::STATION_COUNTRY) {
                // 
            } elseif($fieldName == StationEnum::STATION_LATITUDE) {
                // 
            } elseif($fieldName == StationEnum::STATION_LONGITUDE) {
                // 
            }

            $fields[$fieldName] = $fieldValue;
        }

        return $fields;
    }

    /**
     * Fill/Update a station object with the sended data
     * 
     * @param array $fields
     * @param Station $station
     * @return Station|string
     */
    public function fillStation(array $fields, Station $station = new Station()) : Station|string {
        try {
            $currentTime = new \DateTimeImmutable();
            if($station->getId()) {
                $station->setUpdatedAt($currentTime);
            } else {
                $station->setCreatedAt($currentTime);
            }

            foreach($fields as $fieldName => $fieldValue) {
                if($fieldName == StationEnum::STATION_ADDRESS) $station->setAddress($fieldValue);
                elseif($fieldName == StationEnum::STATION_CITY) $station->setCity($fieldValue);
                elseif($fieldName == StationEnum::STATION_ZIPCODE) $station->setZipCode($fieldValue);
                elseif($fieldName == StationEnum::STATION_COUNTRY) $station->setCountry($fieldValue);
                elseif($fieldName == StationEnum::STATION_LATITUDE) $station->setLatitude($fieldValue);
                elseif($fieldName == StationEnum::STATION_LONGITUDE) $station->setLongitude($fieldValue);
            }
        } catch(\Exception $e) {
            return $e->getMessage();
        }

        return $station;
    }
}