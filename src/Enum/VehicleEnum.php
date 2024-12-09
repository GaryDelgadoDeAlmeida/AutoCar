<?php

namespace App\Enum;

abstract class VehicleEnum {

    public const VEHICLE_BASEMODE = "basemodel";
    public const VEHICLE_NAME = "name";
    public const VEHICLE_PRICE = "price";
    public const VEHICLE_FUEL = "fuel";
    public const VEHICLE_FUEL_TANK = "fuel_tank";
    public const VEHICLE_WEIGHT = "vehicle_weight";
    public const VEHICLE_MAX_SPEED = "max_speed";
    public const VEHICLE_AVERAGE_FUELD_CONSUMPTION = "average_fuel_consumption";
    public const VEHICLE_BUILD_AT = "build_at";

    private array $typeName = [];

    public static function getAvalaibleChoices() : array {
        return [];
    }

    public static function getChoices() : array {
        $choices = [];

        foreach(self::getAvalaibleChoices() as $choice) {
            $choices[self::$typeName[$choice]] = $choice;
        }

        return $choices;
    }
}