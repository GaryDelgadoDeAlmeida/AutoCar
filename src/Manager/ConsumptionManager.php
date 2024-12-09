<?php

namespace App\Manager;

use App\Entity\Consumption;
use App\Enum\ConsumptionEnum;

class ConsumptionManager {

    /**
     * @param array json content
     * @return array fields
     */
    public function checkFields(array $jsonContent) : array {
        $fields = [];
        $allowedFields = ConsumptionEnum::getAvalaibleChoices();

        foreach($jsonContent as $fieldName => $fieldValue) {
            if(!in_array($fieldName, $allowedFields)) {
                continue;
            }

            if($fieldName == ConsumptionEnum::CONSUMPTION_TITLE) {
                // 
            } elseif($fieldName == ConsumptionEnum::CONSUMPTION_DESCRIPTION) {
                // 
            } elseif($fieldName == ConsumptionEnum::CONSUMPTION_CATEGORY) {
                // 
            }

            $fields[$fieldName] = $fieldValue;
        }

        return $fields;
    }

    /**
     * @param array fields
     * @param ?Consumption
     * @return Consumption|string
     */
    public function fillConsumption(array $fields, Consumption $consumption = new Consumption()) : Consumption|string {
        try {
            $currentTime = new \DateTimeImmutable();
            if($consumption->getId()) {
                $consumption->setUpdatedAt($currentTime);
            } else {
                $consumption->setCreatedAt($currentTime);
            }

            foreach($fields as $fieldName => $fieldValue) {
                if($fieldName == ConsumptionEnum::CONSUMPTION_TITLE) $consumption->setTitle($fieldValue);
                elseif($fieldName == ConsumptionEnum::CONSUMPTION_DESCRIPTION) $consumption->setDescription($fieldValue);
                elseif($fieldName == ConsumptionEnum::CONSUMPTION_CATEGORY) $consumption->setCategory($fieldValue);
            }
        } catch(\Exception $e) {
            return $e->getMessage();
        }

        return $consumption;
    }
}