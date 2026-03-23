<?php

namespace App\Enum;

abstract class FuelKeyEnum {

    public const FUELKEY_DIESEL = "diesel";
    public const FUELKEY_SP98 = "sp98";
    public const FUELKEY_SP95 = "sp95";
    public const FUELKEY_SP95E10 = "sp95-e10";
    public const FUELKEY_E85 = "e85";
    public const FUELKEY_GPLC = "gplc";

    public static function getAvailableChoices() : array {
        return [
            self::FUELKEY_DIESEL,
            self::FUELKEY_SP95,
            self::FUELKEY_E85,
            self::FUELKEY_GPLC,
            self::FUELKEY_SP95E10,
            self::FUELKEY_SP98E10,
            self::FUELKEY_SP98
        ];
    }
}