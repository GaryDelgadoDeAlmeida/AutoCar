<?php

namespace App\Enum;

abstract class StationEnum {
    
    public const STATION_ADDRESS = "address";
    public const STATION_CITY = "city";
    public const STATION_ZIPCODE = "zipCode";
    public const STATION_COUNTRY = "country";
    public const STATION_LATITUDE = "latitude";
    public const STATION_LONGITUDE = "longitude";

    protected array $typeName = [
        self::STATION_ADDRESS => "Address",
        self::STATION_CITY => "City",
        self::STATION_ZIPCODE => "Zip Code",
        self::STATION_COUNTRY => "Country",
        self::STATION_LATITUDE => "Latitude",
        self::STATION_LONGITUDE => "Longitude",
    ];

    public static function getAvailableChoices() : array {
        return [
            self::STATION_ADDRESS,
            self::STATION_CITY,
            self::STATION_ZIPCODE,
            self::STATION_COUNTRY,
            self::STATION_LATITUDE,
            self::STATION_LONGITUDE
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