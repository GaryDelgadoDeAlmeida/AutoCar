<?php

namespace App\Enum;

abstract class FuelEnum {

    public const FUEL_TITLE = "title";
    public const FUEL_KEY = "key";
    public const FUEL_PRICE = "price";

    protected static array $typeName = [
        self::FUEL_TITLE => "Title",
        self::FUEL_PRICE => "Price",
        self::FUEL_KEY => "Key",
    ];

    public static function getAvalaibleChoices() : array {
        return [
            self::FUEL_TITLE,
            self::FUEL_PRICE,
            self::FUEL_KEY
        ];
    }

    public static function getChoices() : array {
        $choices = [];

        foreach(self::getAvalaibleChoices() as $choice) {
            $choices[self::$typeName[$choice]] = $choice;
        }

        return $choices;
    }
}