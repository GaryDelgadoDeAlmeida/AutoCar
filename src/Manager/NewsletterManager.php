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

        foreach($jsonContent as $fieldName => $fieldValue) {
            if(!in_array($fieldName, ["email"])) {
                continue;
            }

            if($fieldName == "email") {
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
                if($fieldName == "email") $newsletter->setEmail($fieldValue);
            }
        } catch(\Exception $e) {
            return $e->getMessage();
        }

        return $newsletter;
    }
}