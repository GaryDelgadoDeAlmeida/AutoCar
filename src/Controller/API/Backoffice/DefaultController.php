<?php

namespace App\Controller\API\Backoffice;

use App\Repository\FuelRepository;
use App\Repository\InboxRepository;
use App\Repository\MakerRepository;
use App\Repository\TestimonialRepository;
use App\Repository\VehicleRepository;
use App\Repository\VehicleTypeRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api/backoffice', name: 'api_backoffice_default')]
class DefaultController extends AbstractController
{
    private FuelRepository $fuelRepository;
    private MakerRepository $makerRepository;
    private InboxRepository $inboxRepository;
    private VehicleRepository $vehicleRepository;
    private VehicleTypeRepository $vehicleTypeRepository;
    private TestimonialRepository $testimonialRepository;

    function __construct(
        FuelRepository $fuelRepository,
        MakerRepository $makerRepository,
        InboxRepository $inboxRepository,
        VehicleRepository $vehicleRepository,
        VehicleTypeRepository $vehicleTypeRepository,
        TestimonialRepository $testimonialRepository
    ) {
        $this->fuelRepository = $fuelRepository;
        $this->makerRepository = $makerRepository;
        $this->inboxRepository = $inboxRepository;
        $this->vehicleRepository = $vehicleRepository;
        $this->vehicleTypeRepository = $vehicleTypeRepository;
        $this->testimonialRepository = $testimonialRepository;
    }

    #[Route('/home', name: 'get_home', methods: ["GET"])]
    public function index(): JsonResponse {
        return $this->json([
            "nbrMakers" => $this->makerRepository->countMakers(),
            "nbrVehicles" => $this->vehicleRepository->countVehicles(),
            "nbrVehicleTypes" => $this->vehicleTypeRepository->countTypes(),
            "nbrFuels" => $this->fuelRepository->countFuels(),
            "latestVehicles" => $this->vehicleRepository->getLatestVehicles(5),
            "latestInboxes" => $this->inboxRepository->findBy([], ["createdAt" => "DESC"], 5),
            "latestTestimonials" => $this->testimonialRepository->findBy([], ["createdAt" => "DESC"], 5)
        ], Response::HTTP_OK);
    }
}
