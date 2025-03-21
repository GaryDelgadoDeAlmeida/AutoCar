<?php

namespace App\Controller\API;

use App\Enum\FuelSimulatorEnum;
use App\Manager\SimulatorManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api', name: 'api_')]
class SimulatorController extends AbstractController
{
    private SimulatorManager $simulatorManager;

    function __construct(SimulatorManager $simulatorManager) {
        $this->simulatorManager = $simulatorManager;
    }

    #[Route('/fuel-simulator', name: 'post_fuel_simulator', methods: ["POST"])]
    public function post_fuel_simulator(Request $request): JsonResponse {
        $jsonContent = json_decode($request->getContent(), true);
        if(empty($jsonContent)) {
            return $this->json([
                "message" => "An error has been encountered with the sended body."
            ], Response::HTTP_PRECONDITION_FAILED);
        }

        $response = [];

        try {
            $fields = $this->simulatorManager->checkFields($jsonContent);
            if(empty($fields)) {
                throw new \Exception("An error has been encountered with the sended body.", Response::HTTP_PRECONDITION_FAILED);
            }

            $fuel = $fields[FuelSimulatorEnum::FUEL_SIMULATOR_VEHICLE]->getFuels()[0];
            $fuelPrice = $fuel->getPrice();
            $vehicleMedianConso = $fields[FuelSimulatorEnum::FUEL_SIMULATOR_VEHICLE]->getAverageFuelConsumption() / 100;

            $oneshotCalc = $fuelPrice * ($vehicleMedianConso * $fields[FuelSimulatorEnum::FUEL_SIMULATOR_DISTANCE_KM]);

            $response = [
                "fuelName" => $fuel->getTitle(),
                "fuelPrice" => $fuelPrice,
                "vehicleAverageConso" => $vehicleMedianConso,
                "calcOneshotTrip" => $oneshotCalc,
            ];
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], isset(Response::$statusTexts[$code]) && $code != Response::HTTP_OK ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json($response, Response::HTTP_OK);
    }
}
