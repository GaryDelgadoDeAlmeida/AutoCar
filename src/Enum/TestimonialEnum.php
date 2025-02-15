<?php

namespace App\Enum;

abstract class TestimonialEnum {

    public const TESTIMONIAL_PHOTO = "photo";
    public const TESTIMONIAL_FIRSTNAME = "firstname";
    public const TESTIMONIAL_LASTNAME = "lastname";
    public const TESTIMONIAL_COMMENT = "comment";

    protected array $typeName = [
        self::TESTIMONIAL_PHOTO => "Photo",
        self::TESTIMONIAL_FIRSTNAME => "Firstname",
        self::TESTIMONIAL_LASTNAME => "Lastname",
        self::TESTIMONIAL_COMMENT => "Comment"
    ];

    public static function getAvailableChoices() : array {
        return [
            self::TESTIMONIAL_PHOTO,
            self::TESTIMONIAL_FIRSTNAME,
            self::TESTIMONIAL_LASTNAME,
            self::TESTIMONIAL_COMMENT
        ];
    }

    public function getChoices() : array {
        $choices = [];

        foreach(self::getAvailableChoices() as $choice) {
            $choices[self::$typeName[$choice]] = $choice;
        }

        return $choices;
    }
}