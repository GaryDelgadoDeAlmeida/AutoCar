<?php

namespace App\Controller\API;

use App\Manager\SerializeManager;
use App\Repository\MakerRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api', name: 'api_')]
class MakerController extends AbstractController
{
    private SerializeManager $serializeManager;
    private MakerRepository $makerRepository;
    
    function __construct(
        SerializeManager $serializeManager, 
        MakerRepository $makerRepository
    ) {
        $this->serializeManager = $serializeManager;
        $this->makerRepository = $makerRepository;
    }

    #[Route('/makers', name: 'get_makers', methods: ["GET"])]
    public function get_makers(Request $request): JsonResponse {
        $limit = 12;
        $offset = is_numeric($request->get("offset")) && intval($request->get("offset")) == $request->get("offset") && $request->get("offset") > 1 ? intval($request->get("offset")) : 1;
        $makers = $this->makerRepository->findBy([], ["name" => "ASC"], $limit, ($offset - 1) * $limit);

        return $this->json([
            "offset" => $offset,
            "maxOffset" => ceil($this->makerRepository->countMakers() / $limit),
            "results" => !empty($makers) ? $this->serializeManager->serializeContent($makers) : $makers
        ]);
    }

    #[Route('/maker/{makerID}', name: 'get_maker', methods: ["GET"])]
    public function get_maker(int $makerID) : JsonResponse {
        $maker = $this->makerRepository->find($makerID);
        if(empty($maker)) {
            return $this->json([
                "message" => "Maker not found"
            ], Response::HTTP_NOT_FOUND);
        }

        return $this->json(
            $this->serializeManager->serializeContent($maker),
            Response::HTTP_OK
        );
    }
}
