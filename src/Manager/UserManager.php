<?php

namespace App\Manager;

use App\Entity\User;
use App\Enum\UserEnum;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserManager {

    private UserPasswordHasherInterface $passwordHasher;

    function __construct(UserPasswordHasherInterface $passwordHasher) {
        $this->passwordHasher = $passwordHasher;
    }

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

            // Check the value of all required fields
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

                if(!filter_var($fieldValue, FILTER_VALIDATE_EMAIL)) {
                    throw new \Exception(
                        printf("The field '%s' must have a valid email", $fieldName), 
                        Response::HTTP_INTERNAL_SERVER_ERROR
                    );
                }
            } elseif($fieldName == UserEnum::USER_PASSWORD) {
                if(strlen($fieldValue) < 8) {
                    throw new \Exception("The field '{$fieldName}' must at least have 8 characters length");
                }

                if(strlen($fieldValue) > 255) {
                    throw new \Exception("The field '{$fieldName}' can't exceed 255 characters length");
                }

                if(preg_match(UserEnum::USER_PASSWORD_REGEX, $fieldValue) === false) {
                    throw new \Exception("The password isn't secured enough. Please change it");
                }
            }

            $fields[$fieldName] = $fieldValue;
        }

        return $fields;
    }

    /**
     * @param array fields
     * @param ?User user
     * @return User|string
     */
    public function fillUser(array $fields, ?User $user = new User()): User|string {
        try {
            $currentTime = new \DateTimeImmutable();
            if($user->getId()) {
                $user->setUpdatedAt($currentTime);
            } else {
                $user
                    ->setRoles(["ROLE_USER"])
                    ->setCreatedAt($currentTime)
                ;
            }

            foreach($fields as $fieldName => $fieldValue) {
                if($fieldName == UserEnum::USER_FIRSTNAME) $user->setFirstname($fieldValue);
                elseif($fieldName == UserEnum::USER_LASTNAME) $user->setLastname($fieldValue);
                elseif($fieldName == UserEnum::USER_EMAIL) $user->setEmail($fieldValue);
                elseif($fieldName == UserEnum::USER_PASSWORD) {
                    $hashedPassword = $this->passwordHasher->hashPassword($user, $fieldValue);
                    $user->setPassword($hashedPassword);
                }
            }
        } catch(\Exception $e) {
            return $e->getMessage();
        }

        return $user;
    }
}