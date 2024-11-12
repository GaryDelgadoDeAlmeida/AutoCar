<?php

namespace App\Enum;

abstract class FuelPriceHistoryEnum {

    public const HISTORY_FUEL = "fuel";
    public const HISTORY_PRICE = "price";

    protected array $typeName = [
        self::HISTORY_FUEL => "Fuel",
        self::HISTORY_PRICE => "Price"
    ];

    public static function getAvailableChoices() : array {
        return [
            self::HISTORY_FUEL,
            self::HISTORY_PRICE
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