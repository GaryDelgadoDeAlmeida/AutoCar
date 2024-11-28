<?php

namespace App\Manager;

use App\Entity\Characteristic;
use App\Enum\CharacteristicEnum;

class CharacteristicManager {

    /**
     * @param array json content
     * @return array fields
     */
    public function checkFields(array $jsonContent) : array {
        $fields = [];
        $allowedFields = CharacteristicEnum::getAvailableChoices();

        foreach($jsonContent as $fieldName => $fieldValue) {
            if(!in_array($fieldName, $allowedFields)) {
                continue;
            }

            if($fieldName == CharacteristicEnum::CHARACTERISTIC_TITLE) {
                // 
            } elseif($fieldName == CharacteristicEnum::CHARACTERISTIC_DESCRIPTION) {
                // 
            }

            $fields[$fieldName] = $fieldValue;
        }

        return $fields;
    }

    /**
     * @param array fields
     * @param ?Characteristic characteristic
     * @return Characteristic|string Return characteristic object of a string if an error has been encountered
     */
    public function fillCharacteristic(array $fields, ?Characteristic $characteristic = new Characteristic()) : Characteristic|string {
        try {
            if(!$characteristic->getId()) {
                $characteristic->setCreatedAt(new \DateTimeImmutable());
            }

            foreach($fields as $fieldName => $fieldValue) {
                if($fieldName == CharacteristicEnum::CHARACTERISTIC_TITLE) $characteristic->setTitle($fieldValue);
                elseif($fieldName == CharacteristicEnum::CHARACTERISTIC_DESCRIPTION) $characteristic->setDescription($fieldValue);
            }
        } catch(\Exception $e) {
            return $e->getMessage();
        }

        return $characteristic;
    }
}