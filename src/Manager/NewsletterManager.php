<?php

namespace App\Manager;

use App\Entity\Newsletter;

class NewsletterManager {

    /**
     * @param array json content
     * @return array
     */
    public function checkFields(array $jsonContent) : array {
        $fields = [];
        $allowedFields = [];

        foreach($fields as $fieldName => $fieldValue) {
            if(!in_array($fieldName, $allowedFields)) {
                continue;
            }

            if($fieldName == "") {
                // 
            }

            $fields[$fieldName] = $fieldValue;
        }

        return $fields;
    }

    /**
     * @param array fields
     * @return Newsletter|string
     */
    public function fillNewsletter(array $fields) : Newsletter|string {
        $newsletter = (new Newsletter())
            ->setCreatedAt(new \DateTimeImmutable())
        ;

        try {
            foreach($fields as $fieldName => $fieldValue) {
                // 
            }
        } catch(\Exception $e) {
            return $e->getMessage();
        }

        return $newsletter;
    }
}