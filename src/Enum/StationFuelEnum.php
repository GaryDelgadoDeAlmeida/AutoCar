<?php

namespace App\Enum;

abstract class StationFuelEnum {

    public const STATIONFUEL_STATION = "station";
    public const STATIONFUEL_FUEL = "fuel";
    public const STATIONFUEL_FUELKEY = "fuelKey";
    public const STATIONFUEL_PRICE = "price";

    protected array $typeName = [
        self::STATIONFUEL_STATION => "Station",
        self::STATIONFUEL_FUEL => "Fuel",
        self::STATIONFUEL_FUELKEY => "Fuel key",
        self::STATIONFUEL_PRICE => "Price"
    ];

    public static function getAvailableChoices() : array {
        return [
            self::STATIONFUEL_STATION,
            self::STATIONFUEL_FUEL,
            self::STATIONFUEL_FUELKEY,
            self::STATIONFUEL_PRICE
        ];
    }

    public function getChoices() : array {
        $choices = [];

        foreach(self::getAvailableChoices() as $choice) {
            $choices[self::$typeName[$choice]] = $choice;
        }

        return $choices;
    }
}