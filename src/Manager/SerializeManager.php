<?php

namespace App\Manager;

use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

class SerializeManager {

    private SerializerInterface $serializer;

    function __construct(SerializerInterface $serializer) {
        $this->serializer = $serializer;
    }

    /**
     * @param mixed entities
     * @return string
     */
    public function serializeContent($entities) {
        return $this->serializer->serialize(
            $entities, 
            "json", [
                ObjectNormalizer::IGNORED_ATTRIBUTES => ["vehicles"]
            ]
        );
    }
}