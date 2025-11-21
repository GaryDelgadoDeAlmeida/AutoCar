<?php

namespace App\Manager;

use App\Entity\Maker;
use App\Enum\MakerEnum;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class MakerManager {

    private FileManager $fileManager;

    function __construct(FileManager $fileManager) {
        $this->fileManager = $fileManager;
    }

    /**
     * @param array json content
     * @return array
     */
    public function checkFields(array $jsonContent) : array {
        $fields = [];
        $allowedFields = MakerEnum::getAvailableChoices();

        foreach($jsonContent as $fieldName => $fieldValue) {
            if(!in_array($fieldName, $allowedFields)) {
                continue;
            }

            if($fieldName == MakerEnum::MAKER_PHOTO) {
                if(empty($fieldValue)) {
                    continue;
                }

                if( !($fieldValue instanceof UploadedFile) ) {
                    throw new \Exception("An error has been encountered with the image. The file must be uploaded into the designated form to be treated");
                }
            }

            $fields[$fieldName] = $fieldValue;
        }

        return $fields;
    }

    /**
     * @param array fields
     * @param ?Maker
     * @return Maker|string
     */
    public function fillMaker(array $fields, ?Maker $maker = new Maker()) : Maker|string {
        try {
            $currentTime = new \DateTimeImmutable();
            if($maker->getId()) {
                $maker->setUpdatedAt($currentTime);
            } else {
                $maker->setCreatedAt($currentTime);
            }

            foreach($fields as $fieldName => $fieldValue) {
                if($fieldName == MakerEnum::MAKER_PHOTO) $maker->setLogo($fieldValue);
                elseif($fieldName == MakerEnum::MAKER_NAME) $maker->setName($fieldValue);
                elseif($fieldName == MakerEnum::MAKER_DESCRIPTION) $maker->setDescription($fieldValue);
                elseif($fieldName == MakerEnum::MAKER_LOCATION) $maker->setLocation($fieldValue);
                elseif($fieldName == MakerEnum::MAKER_FOUNDED_AT) $maker->setFoundedAt(new \DateTimeImmutable($fieldValue));
            }
        } catch(\Exception $e) {
            return $e->getMessage();
        }
        
        return $maker;
    }
}