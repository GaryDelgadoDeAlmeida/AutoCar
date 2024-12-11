<?php

namespace App\Command;

use App\Entity\Maker;
use App\Entity\Vehicle;
use App\Enum\MakerEnum;
use App\Enum\VehicleEnum;
use App\Manager\MakerManager;
use App\Manager\VehicleManager;
use App\Entity\VehicleConsumption;
use App\Repository\FuelRepository;
use App\Repository\MakerRepository;
use App\Entity\VehicleCharacteristic;
use App\Repository\VehicleRepository;
use App\Repository\ConsumptionRepository;
use App\Repository\CharacteristicRepository;
use Symfony\Component\Console\Command\Command;
use App\Repository\VehicleConsumptionRepository;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Input\InputArgument;
use App\Repository\VehicleCharacteristicRepository;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

#[AsCommand(
    name: 'app:import-vehicules',
    description: 'Add a short description for your command',
)]
class ImportVehiculesCommand extends Command
{
    private MakerManager $makerManager;
    private VehicleManager $vehicleManager;
    private FuelRepository $fuelRepository;
    private MakerRepository $makerRepository;
    private VehicleRepository $vehicleRepository;
    private ConsumptionRepository $consumptionRepository;
    private CharacteristicRepository $characteristicRepository;
    private VehicleConsumptionRepository $vehicleConsumptionRepository;
    private VehicleCharacteristicRepository $vehicleCharacteristicRepository;

    public function __construct(
        MakerManager $makerManager,
        VehicleManager $vehicleManager,
        FuelRepository $fuelRepository,
        MakerRepository $makerRepository, 
        VehicleRepository $vehicleRepository,
        ConsumptionRepository $consumptionRepository,
        CharacteristicRepository $characteristicRepository,
        VehicleConsumptionRepository $vehicleConsumptionRepository,
        VehicleCharacteristicRepository $vehicleCharacteristicRepository
    ) {
        parent::__construct();
        $this->makerManager = $makerManager;
        $this->vehicleManager = $vehicleManager;
        $this->fuelRepository = $fuelRepository;
        $this->makerRepository = $makerRepository;
        $this->vehicleRepository = $vehicleRepository;
        $this->consumptionRepository = $consumptionRepository;
        $this->characteristicRepository = $characteristicRepository;
        $this->vehicleConsumptionRepository = $vehicleConsumptionRepository;
        $this->vehicleCharacteristicRepository = $vehicleCharacteristicRepository;
    }

    protected function configure(): void
    {
        $this
            ->addArgument('arg1', InputArgument::OPTIONAL, 'Argument description')
            ->addOption('option1', null, InputOption::VALUE_NONE, 'Option description')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        
        $limit = 100;
        $offset = 1;
        $maxOffset = 1;
        $currentTime = new \DateTimeImmutable();

        do {
            $response = $this->getVehiculesFromAPI($offset, $limit);
            $maxOffset = !empty($response["total_count"]) ? ceil($response["total_count"] / $limit) : $maxOffset;
            
            foreach($response["results"] as $index => $vehicleData) {
                $maker = $this->makerRepository->findOneBy(["name" => $vehicleData["make"]]);
                if(empty($maker)) {
                    $maker = $this->makerManager->fillMaker([
                        MakerEnum::MAKER_NAME => $vehicleData["make"]
                    ]);

                    $this->makerRepository->save($maker, true);
                }

                // Fuel not taken into account
                /*
                    Gasoline or E85 => (regular)
                    Gasoline or Natural Gas
                    Gasoline or Propane
                    Gasoline or Electricity (Regular)
                    Midgrade
                    Premium and Electricity
                    Premium Gas or Electricity
                    Premium or E85
                    Regular Gas or Electricity
                    Regular Gas and Electricity
                */
                $fuel = null;
                if(strtolower($vehicleData["fueltype"]) == "regular") {
                    $fuel = $this->fuelRepository->findOneBy(["fuelKey" => "sp95"]);
                } elseif(strtolower($vehicleData["fueltype"]) == "premium") {
                    $fuel = $this->fuelRepository->findOneBy(["fuelKey" => "sp98"]);
                } elseif(strtolower($vehicleData["fueltype"]) == "cng") {
                    $fuel = $this->fuelRepository->findOneBy(["fuelKey" => "gnv"]);
                } elseif(in_array(strtolower($vehicleData["fueltype"]), ["diesel", "electricity", "hydrogen"])) {
                    $fuel = $this->fuelRepository->findOneBy(["fuelKey" => strtolower($vehicleData["fueltype"])]);
                }

                if(empty($fuel)) {
                    continue;
                }

                $vehicle = $this->vehicleManager->fillVehicle([
                    VehicleEnum::VEHICLE_MAKER => $maker,
                    VehicleEnum::VEHICLE_BASEMODEL => $vehicleData["basemodel"],
                    VehicleEnum::VEHICLE_NAME => $vehicleData["model"],
                    VehicleEnum::VEHICLE_PRICE => 0,
                    VehicleEnum::VEHICLE_BUILD_AT => new \DateTimeImmutable($vehicleData["createdon"])
                ]);

                $vehicle->addFuel($fuel);

                // Save changes into database vehicles
                $this->vehicleRepository->save($vehicle, true);

                foreach($vehicleData as $name => $value) {
                    if(in_array($value, [null, ""])) {
                        continue;
                    }

                    $consumption = $this->consumptionRepository->findOneBy(["title" => $name]);
                    if(!empty($consumption)) {
                        $vehicleConsumption = (new VehicleConsumption())
                            ->setConsumption($consumption)
                            ->setVehicle($vehicle)
                            ->setValue($value)
                            ->setCreatedAt($currentTime)
                        ;

                        $this->vehicleConsumptionRepository->save($vehicleConsumption, true);
                    } else {
                        $characteristic = $this->characteristicRepository->findOneBy(["title" => $name]);
                        if(!empty($characteristic)) {
                            $vehicleCharacteristic = (new VehicleCharacteristic())
                                ->setCharacteristic($characteristic)
                                ->setVehicle($vehicle)
                                ->setValue($value)
                                ->setCreatedAt($currentTime)
                            ;

                            $this->vehicleCharacteristicRepository->save($vehicleCharacteristic, true);
                        }
                    }
                }
            }

            sleep(10);
        } while($offset < $maxOffset);

        $io->success('You have a new command! Now make it your own! Pass --help to see your options.');

        return Command::SUCCESS;
    }

    private function getVehiculesFromAPI(int &$offset, int $limit) {
        $curl = curl_init();

        curl_setopt_array($curl, [
            CURLOPT_URL => "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/all-vehicles-model/records?offset={$offset}&limit={$limit}",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST => "GET",
            CURLOPT_HEADER => false
        ]);

        $curl_response = json_decode(curl_exec($curl), true);
        $curl_errors = curl_error($curl);
        curl_close($curl);
        $offset++;

        return $curl_response;
    }
}
