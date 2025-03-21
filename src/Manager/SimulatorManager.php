<?php

namespace App\Manager;

use App\Enum\FuelSimulatorEnum;
use App\Repository\VehicleRepository;

class SimulatorManager {

    private VehicleRepository $vehicleRepository;

    function __construct(VehicleRepository $vehicleRepository) {
        $this->vehicleRepository = $vehicleRepository;
    }

    /**
     * Check all sended fields
     * 
     * @param array $jsonContent
     * @return array
     */
    public function checkFields(array $jsonContent) : array {
        $fields = [];
        $allowedFields = FuelSimulatorEnum::getAvailableChoices();

        foreach($jsonContent as $fieldName => $fieldValue) {
            if(!in_array($fieldName, $allowedFields)) {
                continue;
            }

            if($fieldName == FuelSimulatorEnum::FUEL_SIMULATOR_VEHICLE) {
                if(empty($fieldValue)) {
                    throw new \Exception("An vehicle must be selected");
                }

                if(!is_numeric($fieldValue)) {
                    throw new \Exception("The vehicle must be a numeric value");
                }

                if(!is_int($fieldValue)) {
                    throw new \Exception("The vehicle must be a integer value");
                }

                $vehicle = $this->vehicleRepository->find($fieldValue);
                if(empty($vehicle)) {
                    throw new \Exception("The vehicle couldn't be found");
                }

                $fieldValue = $vehicle;
            } elseif($fieldName == FuelSimulatorEnum::FUEL_SIMULATOR_DISTANCE_KM) {
                if(empty($fieldValue)) {
                    throw new \Exception("A distance (km) must be filled");
                }

                if(!is_numeric($fieldValue)) {
                    throw new \Exception("The distance must be a numeric value");
                }

                if($fieldValue <= 0) {
                    throw new \Exception("The distance must be superior to 0 km");
                }

                $fieldValue = floatval($fieldValue);
            }

            $fields[$fieldName] = $fieldValue;
        }

        return $fields;
    }
}