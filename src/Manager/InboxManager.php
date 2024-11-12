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
                // 
            } elseif($fieldName == InboxEnum::INBOX_SENDER_EMAIL) {
                // 
            } elseif($fieldName == InboxEnum::INBOX_SUBJECT) {
                // 
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