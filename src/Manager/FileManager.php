<?php

namespace App\Manager;

use finfo;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class FileManager {

    private array $mimeTypes = [];

    private ParameterBagInterface $params;

    function __construct(ParameterBagInterface $params) {
        // Check if the mime type file exist
        if(file_exists($params->get("documents_directory") . "mimetypes.json")) {
            $this->mimeTypes = json_decode(file_get_contents($params->get("documents_directory") . "mimetypes.json") ?? "", true);
        }
        
        $this->params = $params;
    }

    /**
     * Create a file locally
     * 
     * @param string $binaryContent
     * @param string $destination
     * @param string $fileName
     * @throws \Exception
     * @return bool|int
     */
    public function createFile(string $binaryContent, string $destination, string $fileName) {
        if(file_exists($destination . $fileName)) {
            unlink($destination . $fileName);
        }

        if(!file_exists($destination)) {
            mkdir($destination, 0777, true);
        }

        $newFilename = "{$destination}/{$fileName}." . $this->getFileExtension($this->checkRawContentMimeType($binaryContent))[0] ?? "txt";
        $openedFile = fopen($newFilename, "rw", true);
        // $response = file_put_contents($file, $binaryContent);
        $response = fwrite($openedFile, $binaryContent, filesize($newFilename));
        if($response === false) {
            throw new \Exception("An error has been encountered during the file creation process");
        }

        return $response;
    }

    /**
     * @param UploadedFile file
     * @param string destination path
     * @return string path of the file
     */
    public function uploadFile(UploadedFile $file, string $destination_path, string $filename) {
        if(!$file->getPath()) {
            throw new \Exception("Une erreur a été rencontrée avec le fichier {$file->getClientOriginalName()}");
        }

        $filename = str_replace([" "], ["-"], strtolower($filename)) . ".{$file->getClientOriginalExtension()}";

        if(!file_exists($destination_path)) {
            mkdir($destination_path, 0777, true);
        }

        if(file_exists("{$destination_path}/{$filename}")) {
            unlink("{$destination_path}/{$filename}");
        }

        if(!copy($file->getPathname(), "{$destination_path}/{$filename}")) {
            throw new \Exception("An error has been encountered. The sended image couldn't be save in the destination directory.");
        }

        return $filename;
    }

    /**
     * @param string file path
     */
    public function removeFile(string $filePath) {
        try {
            if(!file_exists($filePath)) {
                return false;
            }

            // Remove file
            unlink($filePath);
        } catch(\Exception $e) {
            return $e->getMessage();
        }

        return true;
    }

    /**
     * Summary of storeBase64File
     * @param string $fileBINARY
     * @return array|bool|string
     */
    public function checkFileMimeType(string $fileBINARY) {
        try {
            if(empty($fileBINARY)) {
                return false;
            }

            // Get the mime type
            $fileMimeType = mime_content_type($fileBINARY);
            if(empty($fileMimeType)) {
                throw new \Exception("The mime type couldn't be found");
            }
        } catch(\Exception $e) {
            return [
                "code" => $e->getCode(),
                "message" => $e->getMessage()
            ];
        }

        return $this->getFileExtension($fileMimeType) ?? false;
    }

    /**
     * heck content mime type from the binary content
     * 
     * @param string $binary
     * @return bool|string
     */
    public function checkRawContentMimeType(string $binary) {
        return (new finfo(FILEINFO_MIME_TYPE))->buffer($binary);
    }

    /**
     * Return the file extention of a sended mime type
     * 
     * @return string|array
     */
    public function getFileExtension(string $mimeType): string|array {
        return $this->mimeTypes[$mimeType] ?? "";
    }

    /**
     * Sanitize a filename
     * 
     * @param string $filename
     * @param bool $is_filename
     * @return array|string|null
     */
    public function sanitizeFilename(string $filename, bool $is_filename = false): array|string|null {
        // Replace all weird characters with dashes
        $string = preg_replace('/[^\w\-'. ($is_filename ? '~_\.' : ''). ']+/u', '-', $filename);
        
        // Only allow one dash separator at a time (and make string lowercase)
        $string = mb_strtolower(preg_replace('/--+/u', '-', $string), 'UTF-8');

        // Convert all specials chars to the normal ones
        return preg_replace("/&([a-z])[a-z]+;/i", "$1", htmlentities($string));
    }
}