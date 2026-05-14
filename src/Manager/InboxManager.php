<?php

namespace App\Manager;

use App\Entity\Inbox;
use App\Enum\InboxEnum;

class InboxManager {

    /**
     * @param array json content
     */
    public function checkFields(array $jsonContent) {
        $fields = [];
        $allowedFields = InboxEnum::getAvailableChoices();

        foreach($jsonContent as $fieldName => $fieldValue) {
            if(!in_array($fieldName, $allowedFields)) {
                continue;
            }
 
            if($fieldName == InboxEnum::INBOX_SENDER_FULLNAME) {
                if(strlen($fieldValue) > 255) {
                    throw new \Exception(sprintf("The field '%s' can't exceed 255 caracters length", InboxEnum::INBOX_SENDER_FULLNAME));
                }
            } elseif($fieldName == InboxEnum::INBOX_SENDER_EMAIL) {
                if(strlen($fieldValue) > 255) {
                    throw new \Exception(sprintf("The field '%s' can't exceed 255 caracters length", InboxEnum::INBOX_SENDER_FULLNAME));
                }

                // Check if sender email is a valid one
                if(filter_var($fieldValue, FILTER_SANITIZE_EMAIL) === false) {
                    throw new \Exception(sprintf("The field '%s' must contain a valid email", InboxEnum::INBOX_SENDER_EMAIL));
                }
            } elseif($fieldName == InboxEnum::INBOX_SUBJECT) {
                if(strlen($fieldValue) > 255) {
                    throw new \Exception(sprintf("The field '%s' can't exceed 255 caracters length", InboxEnum::INBOX_SENDER_FULLNAME));
                }
            } elseif($fieldName == InboxEnum::INBOX_MESSAGE) {
                // 
            }

            $fields[$fieldName] = $fieldValue;
        }
        
        return $fields;
    }

    /**
     * @return Inbox|string
     */
    public function fillInbox(array $fields, ?Inbox $inbox = new Inbox()): Inbox|string {
        try {
            if(!$inbox->getId()) {
                $inbox->setCreatedAt(new \DateTimeImmutable());
            }

            foreach($fields as $fieldName => $fieldValue) {
                if($fieldName == InboxEnum::INBOX_SENDER_FULLNAME) $inbox->setFullname($fieldValue);
                elseif($fieldName == InboxEnum::INBOX_SENDER_EMAIL) $inbox->setEmail($fieldValue);
                elseif($fieldName == InboxEnum::INBOX_SUBJECT) $inbox->setSubject($fieldValue);
                elseif($fieldName == InboxEnum::INBOX_MESSAGE) $inbox->setMessage($fieldValue);
            }
        } catch(\Exception $e) {
            return $e->getMessage();
        }

        return $inbox;
    }
}