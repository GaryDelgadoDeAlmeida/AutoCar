<?php

namespace App\Enum;

abstract class VehicleCharacteristicsEnum {

    public const VEHICLE_CHARACTERISTICS_VEHICLE = "vehicle";
    public const VEHICLE_CHARACTERISTICS_CHARACTERISTIC = "characteristic";
    public const VEHICLE_CHARACTERISTICS_VALUE = "value";

    protected array $typeName = [
        self::VEHICLE_CHARACTERISTICS_VEHICLE => "Vehicle",
        self::VEHICLE_CHARACTERISTICS_CHARACTERISTIC => "Characteristic",
        self::VEHICLE_CHARACTERISTICS_VALUE => "Value"
    ];

    public static function getAvailableChoices() : array {
        return [
            self::VEHICLE_CHARACTERISTICS_VEHICLE,
            self::VEHICLE_CHARACTERISTICS_CHARACTERISTIC,
            self::VEHICLE_CHARACTERISTICS_VALUE
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