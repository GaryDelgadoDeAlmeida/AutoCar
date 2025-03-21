<?php

namespace App\Enum;

abstract class FuelSimulatorEnum {

    public const FUEL_SIMULATOR_VEHICLE = "vehicle";
    public const FUEL_SIMULATOR_DISTANCE_KM = "km";

    protected array $typeName = [
        self::FUEL_SIMULATOR_VEHICLE => "Vehicle",
        self::FUEL_SIMULATOR_DISTANCE_KM => "Km"
    ];

    public static function getAvailableChoices() : array {
        return [
            self::FUEL_SIMULATOR_VEHICLE,
            self::FUEL_SIMULATOR_DISTANCE_KM
        ];
    }

    public static function getChoices() : array {
        $choices = [];

        foreach(self::getAvailableChoices() as $choice) {
            $choices[] = $choice;
        }

        return $choices;
    }
}