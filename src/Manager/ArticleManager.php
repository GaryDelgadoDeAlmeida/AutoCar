<?php

namespace App\Manager;

use App\Entity\Blog;
use App\Enum\ArticleEnum;

class ArticleManager {

    /**
     * @param array json content
     * @return array
     */
    public function checkFields(array $jsonContent) : array {
        $fields = [];
        $allowedFields = ArticleEnum::getAllowedFields();

        foreach($jsonContent as $fieldName => $fieldValue) {
            if(!in_array($fieldName, $allowedFields)) {
                continue;
            }

            if($fieldName == ArticleEnum::ARTICLE_PHOTO) {
                // 
            } elseif($fieldName == ArticleEnum::ARTICLE_TITLE) {
                // 
            } elseif($fieldName == ArticleEnum::ARTICLE_CONTENT) {
                // 
            }

            $fields[$fieldName] = $fieldValue;
        }

        return $fields;
    }

    /**
     * @param array fields
     * @param ?Blog $blog
     * @return Blog|string
     */
    public function fillArticle(array $fields, ?Blog $blog = new Blog()) : Blog|string {
        try {
            $currentTime = new \DateTimeImmutable();

            if($blog->getId()) {
                $blog->setUpdatedAt($currentTime);
            } else {
                $blog->setCreatedAt($currentTime);
            }

            foreach($fields as $fieldName => $fieldValue) {
                if($fieldName == ArticleEnum::ARTICLE_PHOTO) $blog->setPhoto($fieldValue);
                elseif($fieldName == ArticleEnum::ARTICLE_TITLE) $blog->setTitle($fieldValue);
                elseif($fieldName == ArticleEnum::ARTICLE_CONTENT) $blog->setContent($fieldValue);
            }
        } catch(\Exception $e) {
            return $e->getMessage();
        }

        return $blog;
    }
}