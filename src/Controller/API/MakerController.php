<?php

namespace App\Controller\API;

use App\Manager\SerializeManager;
use App\Repository\MakerRepository;
use App\Repository\VehicleRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

#[Route('/api', name: 'api_')]
class MakerController extends AbstractController
{
    private SerializeManager $serializeManager;
    private MakerRepository $makerRepository;
    private VehicleRepository $vehicleRepository;
    
    function __construct(
        SerializeManager $serializeManager, 
        MakerRepository $makerRepository,
        VehicleRepository $vehicleRepository
    ) {
        $this->serializeManager = $serializeManager;
        $this->makerRepository = $makerRepository;
        $this->vehicleRepository = $vehicleRepository;
    }

    #[Route('/makers', name: 'get_makers', methods: ["GET"])]
    public function get_makers(Request $request): JsonResponse {
        $limit = 9;
        $offset = is_numeric($request->get("offset")) && intval($request->get("offset")) == $request->get("offset") && $request->get("offset") > 1 ? intval($request->get("offset")) : 1;
        $makers = [];

        if($request->get("request", null) == "all") {
            $makers = $this->makerRepository->getMakersForForms();
        } else {
            $makers = $this->makerRepository->getMakers($offset, $limit);
        }

        return $this->json([
            "offset" => $offset,
            "maxOffset" => ceil($this->makerRepository->countMakers() / $limit),
            "results" => $makers
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
            [
                "maker" => $maker,
                "nbrVehicles" => $this->vehicleRepository->countMakerVehicles($maker->getId())
            ],
            Response::HTTP_OK,
            [],
            [ObjectNormalizer::IGNORED_ATTRIBUTES => ["vehicles"]]
        );
    }

    #[Route("/maker/{makerID}/vehicles", name: "get_maker_vehicles", methods: ["GET"])]
    public function get_maker_vehicles(int $makerID, Request $request) : JsonResponse {
        $maker = $this->makerRepository->find($makerID);
        if(empty($maker)) {
            return $this->json([
                "message" => "Maker not found"
            ], Response::HTTP_NOT_FOUND);
        }
        
        $limit = 6;
        $offset = is_numeric($request->get("offset")) && intval($request->get("offset")) == $request->get("offset") && $request->get("offset") > 1 ? intval($request->get("offset")) : 1;
        $vehicles = $this->vehicleRepository->getMakerVehicles($makerID, $offset, $limit);

        return $this->json([
            "message" => "Route under construction"
        ], Response::HTTP_OK);
    }
}
