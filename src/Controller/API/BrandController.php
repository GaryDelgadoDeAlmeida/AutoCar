<?php

namespace App\Controller\API;

use App\Manager\SerializeManager;
use App\Repository\BrandRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api', name: 'api_')]
class BrandController extends AbstractController
{
    private SerializeManager $serializeManager;
    private BrandRepository $brandRepository;
    
    function __construct(
        SerializeManager $serializeManager, 
        BrandRepository $brandRepository
    ) {
        $this->serializeManager = $serializeManager;
        $this->brandRepository = $brandRepository;
    }

    #[Route('/brands', name: 'get_brands', methods: ["GET"])]
    public function get_brands(Request $request): JsonResponse {
        $limit = 12;
        $offset = is_numeric($request->get("offset")) && intval($request->get("offset")) == $request->get("offset") && $request->get("offset") > 1 ? intval($request->get("offset")) : 1;
        $brands = $this->brandRepository->findBy([], ["name" => "ASC"], $limit, ($offset - 1) * $limit);

        return $this->json([
            "offset" => $offset,
            "maxOffset" => 1,
            "results" => $brands ?? $this->serializeManager->serializeContent($brands)
        ]);
    }

    #[Route('/brand/{brandID}', name: 'get_brand', methods: ["GET"])]
    public function get_brand(int $brandID) : JsonResponse {
        $brand = $this->brandRepository->find($brandID);
        if(empty($brand)) {
            return $this->json([
                "message" => "Brand not found"
            ], Response::HTTP_NOT_FOUND);
        }

        return $this->json(
            $this->serializeManager->serializeContent($brand),
            Response::HTTP_OK
        );
    }
}
