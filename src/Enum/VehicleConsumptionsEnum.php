<?php

namespace App\Enum;

abstract class VehicleConsumptionsEnum {

    public const VEHICLE_CONSUMPTIONS_VEHICLE = "vehicle";
    public const VEHICLE_CONSUMPTIONS_CONSUMPTION = "consumption";
    public const VEHICLE_CONSUMPTIONS_VALUE = "value";

    protected array $typeName = [
        self::VEHICLE_CONSUMPTIONS_VEHICLE => "Vehicle",
        self::VEHICLE_CONSUMPTIONS_CONSUMPTION => "Consumption",
        self::VEHICLE_CONSUMPTIONS_VALUE => "Value"
    ];

    public static function getAvailableChoices() : array {
        return [
            self::VEHICLE_CONSUMPTIONS_VEHICLE,
            self::VEHICLE_CONSUMPTIONS_CONSUMPTION,
            self::VEHICLE_CONSUMPTIONS_VALUE
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