<?php

namespace App\Enum;

abstract class ArticleEnum {

    public const ARTICLE_PHOTO = "photo";
    public const ARTICLE_TITLE = "title";
    public const ARTICLE_CONTENT = "content";

    protected array $typeName = [
        self::ARTICLE_PHOTO => "Photo",
        self::ARTICLE_TITLE => "Title",
        self::ARTICLE_CONTENT => "Content"
    ];

    public static function getAllowedFields() : array {
        return [
            self::ARTICLE_PHOTO,
            self::ARTICLE_TITLE,
            self::ARTICLE_CONTENT
        ];
    }

    private static function getAvailableChoices() : array {
        return [
            self::ARTICLE_PHOTO,
            self::ARTICLE_TITLE,
            self::ARTICLE_CONTENT
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