<?php

namespace App\Controller\API\Backoffice;

use App\Manager\MakerManager;
use App\Manager\SerializeManager;
use App\Repository\MakerRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/backoffice', name: 'api_backoffice_')]
class MakerController extends AbstractController
{
    private MakerManager $makerManager;
    private SerializeManager $serializeManager;
    private MakerRepository $makerRepository;
    
    function __construct(
        MakerManager $makerManager,
        SerializeManager $serializeManager,
        MakerRepository $makerRepository
    ) {
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
            $this->serializeManager->serializeContent($maker), 
            Response::HTTP_CREATED
        );
    }

    #[Route("/maker/{makerID}", name: "update_maker", methods: ["UPDATE", "PUT"])]
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
            $this->serializeManager->serializeContent($maker), 
            Response::HTTP_ACCEPTED
        );
    }

    #[Route("/maker/{makerID}/photo/update", name: "update_maker_photo", methods: ["UPDATE", "PUT"])]
    public function update_maker_photo(Request $request, int $makerID) : JsonResponse {
        return $this->json([], Response::HTTP_OK);
    }

    #[Route("/maker/{makerID}/remove", name: "remove_maker", methods: ["DELETE"])]
    public function remove_maker(Request $request, int $makerID) : JsonResponse {
        return $this->json([], Response::HTTP_OK);
    }
}