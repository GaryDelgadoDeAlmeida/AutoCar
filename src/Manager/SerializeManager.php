<?php

namespace App\Manager;

use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;

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
            "json", 
            [
                AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function($object) {
                    return $object->getId();
                },
            ]
        );
    }
}