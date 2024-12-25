<?php

namespace App\Controller\API\Backoffice;

use App\Manager\SerializeManager;
use App\Repository\FuelRepository;
use App\Repository\MakerRepository;
use App\Repository\VehicleRepository;
use App\Repository\VehicleTypeRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api/backoffice', name: 'api_backoffice_default')]
class DefaultController extends AbstractController
{
    private SerializeManager $serializeManager;
    private FuelRepository $fuelRepository;
    private MakerRepository $makerRepository;
    private VehicleRepository $vehicleRepository;
    private VehicleTypeRepository $vehicleTypeRepository;

    function __construct(
        SerializeManager $serializeManager,
        FuelRepository $fuelRepository,
        MakerRepository $makerRepository,
        VehicleRepository $vehicleRepository,
        VehicleTypeRepository $vehicleTypeRepository
    ) {
        $this->serializeManager = $serializeManager;
        $this->fuelRepository = $fuelRepository;
        $this->makerRepository = $makerRepository;
        $this->vehicleRepository = $vehicleRepository;
        $this->vehicleTypeRepository = $vehicleTypeRepository;
    }

    #[Route('/home', name: 'get_home', methods: ["GET"])]
    public function index(): JsonResponse {
        return $this->json([
            "nbrMakers" => $this->makerRepository->countMakers(),
            "nbrVehicles" => $this->vehicleRepository->countVehicles(),
            "nbrVehicleTypes" => $this->vehicleTypeRepository->countTypes(),
            "nbrFuels" => $this->fuelRepository->countFuels(),
            "latestVehicles" => $latestVehicles = $this->vehicleRepository->getLatestVehicles(5)
        ], Response::HTTP_OK);
    }
}
