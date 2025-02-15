<?php

namespace App\Enum;

abstract class ConsumptionEnum {

    public const CONSUMPTION_TITLE = "title";
    public const CONSUMPTION_DESCRIPTION = "description";
    public const CONSUMPTION_CATEGORY = "category";

    protected array $typeName = [
        self::CONSUMPTION_TITLE => "Title",
        self::CONSUMPTION_DESCRIPTION => "Description",
        self::CONSUMPTION_CATEGORY => "Category",
    ];

    public static function getAvailableChoices() : array {
        return [
            self::CONSUMPTION_TITLE,
            self::CONSUMPTION_DESCRIPTION,
            self::CONSUMPTION_CATEGORY,
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