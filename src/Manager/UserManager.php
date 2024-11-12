<?php

namespace App\Manager;

use App\Entity\User;
use App\Enum\UserEnum;
use Symfony\Component\HttpFoundation\Response;

class UserManager {

    /**
     * @param array sended json
     * @return array
     */
    public function checkFields(array $jsonContent): array {
        $fields = [];
        $allowedFields = UserEnum::getAvailableChoices();

        foreach($jsonContent as $fieldName => $fieldValue) {
            if(!in_array($fieldName, $allowedFields)) {
                continue;
            }

            if(in_array($fieldName, $allowedFields) && empty($fieldValue)) {
                throw new \Exception(
                    printf("The field '%s' must have a value.", $fieldName), 
                    Response::HTTP_INTERNAL_SERVER_ERROR
                );
            }

            if($fieldName == UserEnum::USER_FIRSTNAME) {
                if(strlen($fieldValue) > 255) {
                    throw new \Exception(
                        printf("The field '%s' can't exceed 255 characters length", $fieldName), 
                        Response::HTTP_INTERNAL_SERVER_ERROR
                    );
                }
            } elseif($fieldName == UserEnum::USER_LASTNAME) {
                if(strlen($fieldValue) > 255) {
                    throw new \Exception(
                        printf("The field '%s' can't exceed 255 characters length", $fieldName), 
                        Response::HTTP_INTERNAL_SERVER_ERROR
                    );
                }
            } elseif($fieldName == UserEnum::USER_EMAIL) {
                if(strlen($fieldValue) > 255) {
                    throw new \Exception(
                        printf("The field '%s' can't exceed 255 characters length", $fieldName), 
                        Response::HTTP_INTERNAL_SERVER_ERROR
                    );
                }

                if(!is_email($fieldValue)) {
                    throw new \Exception(
                        printf("The field '%s' must have a valid email", $fieldName), 
                        Response::HTTP_INTERNAL_SERVER_ERROR
                    );
                }
            } elseif($fieldName == UserEnum::USER_PASSWORD) {
                // 
            }

            $fields[$fieldName] = $fieldValue;
        }

        return $fields;
    }

    /**
     * @param array fields
     * @param ?User user
     * @return User
     */
    public function fillUser(array $fields, ?User $user = new User()): User {
        
        foreach($fields as $fieldName => $fieldValue) {
            // 
        }

        return $user;
    }
}