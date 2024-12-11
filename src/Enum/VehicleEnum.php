<?php

namespace App\Enum;

abstract class VehicleEnum {

    public const VEHICLE_MAKER = "maker";
    public const VEHICLE_PHOTO = "photo";
    public const VEHICLE_BASEMODEL = "basemodel";
    public const VEHICLE_NAME = "name";
    public const VEHICLE_FUEL = "fuel";
    public const VEHICLE_FUEL_TANK = "fuel_tank";
    public const VEHICLE_WEIGHT = "vehicle_weight";
    public const VEHICLE_MAX_SPEED = "max_speed";
    public const VEHICLE_AVERAGE_FUELD_CONSUMPTION = "average_fuel_consumption";
    public const VEHICLE_PRICE = "price";
    public const VEHICLE_BUILD_AT = "build_at";

    private array $typeName = [
        self::VEHICLE_MAKER => "Maker",
        self::VEHICLE_PHOTO => "Photo",
        self::VEHICLE_BASEMODEL => "Base model",
        self::VEHICLE_NAME => "Name",
        self::VEHICLE_FUEL => "Fuel",
        self::VEHICLE_FUEL_TANK => "Fuel tank",
        self::VEHICLE_WEIGHT => "Weight",
        self::VEHICLE_MAX_SPEED => "Max speed",
        self::VEHICLE_AVERAGE_FUELD_CONSUMPTION => "Average fuel consumption",
        self::VEHICLE_PRICE => "Price",
        self::VEHICLE_BUILD_AT => "Build at"
    ];

    public function getRequiredFields() : array {
        return [];
    }

    public static function getAvalaibleChoices() : array {
        return [
            self::VEHICLE_MAKER,
            self::VEHICLE_PHOTO,
            self::VEHICLE_BASEMODEL,
            self::VEHICLE_NAME,
            self::VEHICLE_PRICE,
            self::VEHICLE_FUEL,
            self::VEHICLE_FUEL_TANK,
            self::VEHICLE_WEIGHT,
            self::VEHICLE_MAX_SPEED,
            self::VEHICLE_AVERAGE_FUELD_CONSUMPTION,
            self::VEHICLE_BUILD_AT,
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