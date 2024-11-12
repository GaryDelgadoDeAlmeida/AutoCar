<?php

namespace App\Enum;

abstract class InboxEnum {

    public const INBOX_SENDER_FULLNAME = "fullname";
    public const INBOX_SENDER_EMAIL = "email";
    public const INBOX_SUBJECT = "subject";
    public const INBOX_MESSAGE = "message";

    protected array $typeName = [
        self::INBOX_SENDER_FULLNAME => "Fullname",
        self::INBOX_SENDER_EMAIL => "Email address",
        self::INBOX_SUBJECT => "Subject",
        self::INBOX_MESSAGE => "Message",
    ];

    public static function getAvailableChoices() : array {
        return [
            self::INBOX_SENDER_FULLNAME,
            self::INBOX_SENDER_EMAIL,
            self::INBOX_SUBJECT,
            self::INBOX_MESSAGE,
        ];
    }

    public static function getChoices() : array {
        $choices = [];

        foreach(self::getAvailableChoices() as $choice) {
            $choices[self::$typeName[$choice]] = $choice;
        }

        return $choices;
    }
}