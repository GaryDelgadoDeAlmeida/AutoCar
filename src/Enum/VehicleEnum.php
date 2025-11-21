<?php

namespace App\Enum;

abstract class VehicleEnum {

    public const VEHICLE_MAKER = "maker";
    public const VEHICLE_PHOTO = "photo";
    public const VEHICLE_BASEMODEL = "basemodel";
    public const VEHICLE_NAME = "model";
    public const VEHICLE_FUEL = "fuel";
    public const VEHICLE_FUEL_TANK = "fuelTank";
    public const VEHICLE_WEIGHT = "vehiculeWeight";
    public const VEHICLE_MAX_SPEED = "maxSpeed";
    public const VEHICLE_AVERAGE_FUELD_CONSUMPTION = "averageFuelConsumption";
    public const VEHICLE_PRICE = "price";
    public const VEHICLE_BUILD_AT = "buildAt";
    public const VEHICLE_CONSUMPTIONS = "consumptions";
    public const VEHICLE_CHARACTERISTICS = "characteristics";

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
        self::VEHICLE_BUILD_AT => "Build at",
        self::VEHICLE_CONSUMPTIONS => "Consumptions",
        self::VEHICLE_CHARACTERISTICS => "Characteristics"
    ];

    public static function getRequiredFields() : array {
        return [
            self::VEHICLE_MAKER,
            self::VEHICLE_BASEMODEL,
            self::VEHICLE_NAME,
            self::VEHICLE_FUEL,
            self::VEHICLE_BUILD_AT
        ];
    }

    public static function getAvailableChoices() : array {
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
            self::VEHICLE_CONSUMPTIONS,
            self::VEHICLE_CHARACTERISTICS
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