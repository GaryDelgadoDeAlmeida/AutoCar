<?php

namespace App\Manager;

use App\Entity\Maker;

class MakerManager {

    /**
     * 
     */
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

    /**
     * 
     */
    public function fillMaker(array $fields, ?Maker $maker = new Maker()) : Maker|string {
        try {
            // 
        } catch(\Exception $e) {
            return $e->getMessage();
        }
        
        return $maker;
    }
}