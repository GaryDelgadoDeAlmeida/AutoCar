<?php

namespace App\Manager;

use Symfony\Component\HttpFoundation\File\UploadedFile;

class FileManager {

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

        $filepath = "/content/sponsors/{$filename}";
        if(!rename($file->getPath(), $destination_path . "/{$filename}")) {
            throw new \Exception("An error has been encountered. The sended image couldn't be save in the destination directory.");
        }

        return $filepath;
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
}