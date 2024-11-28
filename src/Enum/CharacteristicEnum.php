<?php

namespace App\Enum;

abstract class CharacteristicEnum {

    public const CHARACTERISTIC_TITLE = "title";
    public const CHARACTERISTIC_DESCRIPTION = "description";

    private array $typeName = [
        self::CHARACTERISTIC_TITLE => "Title",
        self::CHARACTERISTIC_DESCRIPTION => "Description"
    ];

    public static function getAvailableChoices() : array {
        return [
            self::CHARACTERISTIC_TITLE,
            self::CHARACTERISTIC_DESCRIPTION
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