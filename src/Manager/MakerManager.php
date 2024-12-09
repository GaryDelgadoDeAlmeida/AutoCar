<?php

namespace App\Manager;

use App\Entity\Maker;
use App\Enum\MakerEnum;

class MakerManager {

    /**
     * @param array json content
     * @return array
     */
    public function checkFields(array $jsonContent) : array {
        $fields = [];
        $allowedFields = MakerEnum::getAvailableChoices();

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
     * @param ?Maker
     * @return Maker|string
     */
    public function fillMaker(array $fields, ?Maker $maker = new Maker()) : Maker|string {
        try {
            $currentTime = new \DateTimeImmutable();
            if($maker->getId()) {
                $maker->setUpdatedAt($currentTime);
            } else {
                $maker->setCreatedAt($currentTime);
            }

            foreach($fields as $fieldName => $fieldValue) {
                if($fieldName == MakerEnum::MAKER_NAME) $maker->setName($fieldValue);
                elseif($fieldName == MakerEnum::MAKER_DESCRIPTION) $maker->setDescription($fieldValue);
                elseif($fieldName == MakerEnum::MAKER_LOCATION) $maker->setLocation($fieldValue);
                elseif($fieldName == MakerEnum::MAKER_FOUNDED_AT) $maker->setFoundedAt(new \DateTimeImmutable($fieldValue));
            }
        } catch(\Exception $e) {
            return $e->getMessage();
        }
        
        return $maker;
    }
}