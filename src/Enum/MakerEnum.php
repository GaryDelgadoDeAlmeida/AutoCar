<?php

namespace App\Enum;

abstract class MakerEnum {

    public const MAKER_PHOTO = "photo";
    public const MAKER_NAME = "name";
    public const MAKER_DESCRIPTION = "description";
    public const MAKER_LOCATION = "location";
    public const MAKER_FOUNDED_AT = "founded_at";

    protected array $typeName = [
        self::MAKER_PHOTO => "photo",
        self::MAKER_NAME => "name",
        self::MAKER_DESCRIPTION => "description",
        self::MAKER_LOCATION => "location",
        self::MAKER_FOUNDED_AT => "founded_at",
    ];

    public static function getAvailableChoices() : array {
        return [
            self::MAKER_PHOTO,
            self::MAKER_NAME,
            self::MAKER_DESCRIPTION,
            self::MAKER_LOCATION,
            self::MAKER_FOUNDED_AT,
        ];
    }

    public static function getChoices() : array {
        $choices = [];

        foreach(self::getAvailableChoices() as $choice) {
            $choice[self::$typeName[$choice]] = $choice;
        }

        return $choices;
    }
}