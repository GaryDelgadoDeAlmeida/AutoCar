<?php

namespace App\Manager;

use App\Entity\Testimonial;

class TestimonialManager {

    /**
     * Summary of checkFields
     * 
     * @return array
     */
    public function checkFields(array $jsonContent) : array {
        $fields = [];

        foreach($jsonContent as $fieldName => $fieldValue) {
            $fields[$fieldName] = $fieldValue;
        }

        return $fields;
    }

    /**
     * Summary of fillTestimonial
     * 
     * @param array $fields
     * @param mixed $testimonial
     * @return \App\Entity\Testimonial|string
     */
    public function fillTestimonial(array $fields, ?Testimonial $testimonial = new Testimonial()) : Testimonial|string {
        try {
            if(!$testimonial->getId()) {
                $testimonial->setCreatedAt(new \DateTimeImmutable());
            }

            foreach($fields as $fieldName => $fieldValue) {
                if($fieldName == "firstname") $testimonial->setFirstname($fieldValue);
                elseif($fieldName == "lastname") $testimonial->setLastname($fieldValue);
                elseif($fieldName == "comment") $testimonial->setComment($fieldValue);
                elseif($fieldName == "photo") $testimonial->setPhoto($fieldValue);
            }
        } catch(\Exception $e) {
            return $e->getMessage();
        }

        return $testimonial;
    }
}