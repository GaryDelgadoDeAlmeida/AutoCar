<?php

namespace App\Enum;

abstract class UserEnum {

    public const USER_FIRSTNAME = "firstname";
    public const USER_LASTNAME = "lastname";
    public const USER_EMAIL = "email";
    public const USER_PASSWORD = "password";
    public const USER_PASSWORD_REGEX = "/[\'\/~`\!@#\$%\^&\*\(\)_\-\+=\{\}\[\]\|;:\"\<\>,\.\?\\\]/";
    public const USER_EMAIL_REGEX = "/^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/";

    // Update password purpose
    public const USER_CURRENT_PASSWORD = "current_password";
    public const USER_NEW_PASSWORD = "new_password";
    public const USER_CONFIRM_NEW_PASSWORD = "confirm_new_password";

    protected array $typeName = [
        self::USER_FIRSTNAME => "Firstname",
        self::USER_LASTNAME => "Lastname",
        self::USER_EMAIL => "Email",
        self::USER_PASSWORD => "Password"
    ];

    public static function getAvailableChoices(): array {
        return [
            self::USER_FIRSTNAME,
            self::USER_LASTNAME,
            self::USER_EMAIL,
            self::USER_PASSWORD
        ];
    }

    public static function getPwdAvailableChoices() : array {
        return [
            self::USER_CURRENT_PASSWORD,
            self::USER_NEW_PASSWORD,
            self::USER_CONFIRM_NEW_PASSWORD
        ];
    }

    public static function getChoices(): array {
        $choices = [];

        foreach(self::getAvailableChoices() as $choice) {
            $choices[self::$typeName[$choice]] = $choice;
        }

        return $choices;
    }
}