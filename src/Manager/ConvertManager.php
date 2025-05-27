<?php

namespace App\Manager;

class ConvertManager {

    private float $oneGallonToOneL = 3.78541;
    private float $oneMillesToOneKM = 1.60934;
    private float $oneGallonPerMillesToKilometersPerLiters = 42.51437;
    private float $oneCubitFeetToOneCubeMeter = 0.0283168;

    /**
     * Convert gallon to liters
     * 
     * @param float $gallons
     * @return float
     */
    public function convertGallonToLiters(float $gallons) : float {
        return $this->oneGallonToOneL * $gallons;
    }

    /**
     * Convert milles to kilometers
     * 
     * @return void
     */
    public function convertMillesToKilometers(float $milles) : float {
        return $this->oneMillesToOneKM * $milles;
    }

    /**
     * Convert Cubit feet to m3
     * 
     * @param float $cubitFeet
     * @return float
     */
    public function convertCubitFeetToCubeMeter(float $cubitFeet) : float {
        return $this->oneCubitFeetToOneCubeMeter * $cubitFeet;
    }

    /**
     * Convert m3 to kg
     * 
     * @param float $m3
     * @return void
     */
    public function convertCubeMeterToKg(float $m3) : float {
        return $m3 * 1000;
    }

    /**
     * Convert gallon/100miles to 100km/L
     * 
     * @return float
     */
    public function convertGallonPerMillesToKilometrePerLiters(float $gallonsPerMiles) : float {
        // return ($this->oneGallonToOneL / 100) * ($this->oneMillesToOneKM * 100);
        return $this->oneGallonPerMillesToKilometersPerLiters / $gallonsPerMiles;
    }
}