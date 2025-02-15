<?php

namespace App\Controller\API\Backoffice;

use App\Enum\MakerEnum;
use App\Manager\FileManager;
use App\Manager\MakerManager;
use App\Manager\SerializeManager;
use App\Repository\MakerRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

#[Route('/api/backoffice', name: 'api_backoffice_')]
class MakerController extends AbstractController
{
    private FileManager $fileManager;
    private MakerManager $makerManager;
    private SerializeManager $serializeManager;
    private MakerRepository $makerRepository;
    
    function __construct(
        FileManager $fileManager,
        MakerManager $makerManager,
        SerializeManager $serializeManager,
        MakerRepository $makerRepository
    ) {
        $this->fileManager = $fileManager;
        $this->makerManager = $makerManager;
        $this->serializeManager = $serializeManager;
        $this->makerRepository = $makerRepository;
    }

    #[Route('/maker', name: 'post_maker', methods: ["POST"])]
    public function post_maker(Request $request): JsonResponse {
        $jsonContent = json_decode($request->getContent(), true);
        if(empty($jsonContent)) {
            return $this->json([
                "message" => "An error has been encountered with the sended body."
            ], Response::HTTP_PRECONDITION_FAILED);
        }

        try {
            $fields = $this->makerManager->checkFields($jsonContent);
            if(empty($fields)) {
                throw new \Exception("An error has been encountered with the sended body.", Response::HTTP_PRECONDITION_FAILED);
            }

            $maker = $this->makerManager->fillMaker($fields);
            if(is_string($maker)) {
                throw new \Exception($maker);
            }

            $this->makerRepository->save($maker, true);
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], isset(Response::$statusTexts[$code]) && $code !== Response::HTTP_OK ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(
            $maker, 
            Response::HTTP_CREATED
        );
    }

    #[Route("/maker/{makerID}/update", name: "update_maker", methods: ["UPDATE", "PUT"])]
    public function update_maker(Request $request, int $makerID) : JsonResponse {
        $maker = $this->makerRepository->find($makerID);
        if(empty($maker)) {
            return $this->json([
                "message" => "Car brand not found"
            ], Response::HTTP_NOT_FOUND);
        }

        $jsonContent = json_decode($request->getContent(), true);
        if(empty($jsonContent)) {
            return $this->json([
                "message" => "An error has been encountered with the sended body."
            ], Response::HTTP_PRECONDITION_FAILED);
        }

        try {
            $fields = $this->makerManager->checkFields($jsonContent);
            if(empty($fields)) {
                throw new \Exception("An error has been encountered with the sended body.", Response::HTTP_PRECONDITION_FAILED);
            }

            $maker = $this->makerManager->fillMaker($fields, $maker);
            if(is_string($maker)) {
                throw new \Exception($maker);
            }

            $this->makerRepository->save($maker, true);
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], isset(Response::$statusTexts[$code]) && $code !== Response::HTTP_OK ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(
            $maker, 
            Response::HTTP_ACCEPTED,
            [],
            [ObjectNormalizer::IGNORED_ATTRIBUTES => ["vehicles"]]
        );
    }

    #[Route("/maker/{makerID}/photo/update", name: "update_maker_photo", methods: ["POST"])]
    public function update_maker_photo(Request $request, int $makerID) : JsonResponse {
        $maker = $this->makerRepository->find($makerID);
        if(empty($maker)) {
            return $this->json([
                "message" => "Maker coundl't be found"
            ], Response::HTTP_NOT_FOUND);
        }

        $makerLogo = $request->files->get("logo");
        if(empty($makerLogo)) {
            return $this->json([
                "message" => "An error has been encountered with the sended body."
            ], Response::HTTP_PRECONDITION_FAILED);
        }

        try {
            $fields = $this->makerManager->checkFields([MakerEnum::MAKER_PHOTO => $makerLogo]);
            if(empty($fields)) {
                throw new \Exception("An error has been encountered with the sended body.", Response::HTTP_PRECONDITION_FAILED);
            }

            $makers_img_directory = $this->getParameter("makers_img_directory");
            if(!file_exists($makers_img_directory)) {
                mkdir($makers_img_directory, 0777, true);
            }

            // If the file has been successfully saved
            $fields[MakerEnum::MAKER_PHOTO] = "/content/img/makers/" . $this->fileManager->uploadFile($fields[MakerEnum::MAKER_PHOTO], $makers_img_directory, $maker->getName());

            $maker = $this->makerManager->fillMaker($fields, $maker);
            if(is_string($maker)) {
                throw new \Exception($maker);
            }

            $this->makerRepository->save($maker, true);
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], isset(Response::$statusTexts[$code]) && $code !== 200 ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(
            $maker, 
            Response::HTTP_OK,
            [],
            [ObjectNormalizer::IGNORED_ATTRIBUTES => ["vehicles"]]
        );
    }

    #[Route("/maker/{makerID}/remove", name: "remove_maker", methods: ["DELETE"])]
    public function remove_maker(Request $request, int $makerID) : JsonResponse {
        $maker = $this->makerRepository->find($makerID);
        if(empty($maker)) {
            return $this->json([
                "message" => "Maker coundl't be found"
            ], Response::HTTP_NOT_FOUND);
        }

        try {
            // Remove all vehicles linked to the maker
            foreach($maker->getVehicles() as $vehicle) {
                // 
            }

            // Remove file
            if(!empty($maker->getLogo()) && file_exists($this->getParameter("makers_img_directory") . "/{$maker->getLogo()}")) {
                unlink($this->getParameter("makers_img_directory") . "/{$maker->getLogo()}");
            }

            // Remove the maker
            $this->makerRepository->remove($maker, true);
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], isset(Response::$statusTexts[$code]) && $code !== 200 ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json([], Response::HTTP_NO_CONTENT);
    }
}
