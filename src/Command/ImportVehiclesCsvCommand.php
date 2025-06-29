<?php

namespace App\Command;

use App\Entity\Vehicle;
use App\Entity\VehicleCharacteristic;
use App\Entity\VehicleConsumption;
use App\Enum\MakerEnum;
use App\Manager\ConvertManager;
use App\Manager\MakerManager;
use App\Repository\CharacteristicRepository;
use App\Repository\ConsumptionRepository;
use App\Repository\FuelRepository;
use App\Repository\MakerRepository;
use App\Repository\VehicleCharacteristicRepository;
use App\Repository\VehicleConsumptionRepository;
use App\Repository\VehicleRepository;
use App\Repository\VehicleTypeRepository;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

#[AsCommand(
    name: 'app:import-vehicles-csv',
    description: 'Add a short description for your command',
)]
class ImportVehiclesCsvCommand extends Command
{
    // Others
    private ParameterBagInterface $param;
    
    // Manager
    private MakerManager $makerManager;
    private ConvertManager $convertManager;

    // Repository
    private FuelRepository $fuelRepository;
    private MakerRepository $makerRepository;
    private VehicleRepository $vehicleRepository;
    private VehicleTypeRepository $vehicleTypeRepository;
    private ConsumptionRepository $consumptionRepository;
    private CharacteristicRepository $characteristicRepository;
    private VehicleConsumptionRepository $vehicleConsumptionRepository;
    private VehicleCharacteristicRepository $vehicleCharacteristicRepository;

    public function __construct(
        ParameterBagInterface $param,
        MakerManager $makerManager,
        ConvertManager $convertManager,
        FuelRepository $fuelRepository,
        MakerRepository $makerRepository,
        VehicleRepository $vehicleRepository,
        VehicleTypeRepository $vehicleTypeRepository,
        ConsumptionRepository $consumptionRepository,
        CharacteristicRepository $characteristicRepository,
        VehicleConsumptionRepository $vehicleConsumptionRepository,
        VehicleCharacteristicRepository $vehicleCharacteristicRepository
    ) {
        parent::__construct();

        // General
        $this->param = $param;

        // Manager
        $this->makerManager = $makerManager;
        $this->convertManager = $convertManager;

        // Repository
        $this->fuelRepository = $fuelRepository;
        $this->makerRepository = $makerRepository;
        $this->vehicleRepository = $vehicleRepository;
        $this->vehicleTypeRepository = $vehicleTypeRepository;
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
        $arg1 = $input->getArgument('arg1');
        $filename = "mini-cooper-hardtop-2-doors.csv";

        // Check if the CSV file exist in the designated repository
        $projectDir = $this->param->get("kernel.project_dir") . "/public/documents";
        if(!file_exists("{$projectDir}/{$filename}")) {
            $io->error("The file couldn't be found");
            return Command::FAILURE;
        }

        // Check if the file can be open
        $handle = fopen("{$projectDir}/{$filename}", "r");
        if($handle === false) {
            $io->error("The file couldn't be opened");
            return Command::FAILURE;
        }

        // Start the process to get all the datas in order to save then in the database
        $dataColumns = $columnsName = [];
        $currentTime = new \DateTimeImmutable();
        while(($element = fgetcsv($handle)) !== false) {
            $row = str_getcsv(str_replace("\u{FEFF}", "", $element[0]), ";");
            if($row[0] == "Make") {
                $columnsName = $row;
                $dataColumns = array_flip($row);
                continue;
            }

            $maker = $this->makerRepository->findOneBy(["name" => $row[$dataColumns["Make"]]]);
            if(empty($maker)) {
                $maker = $this->makerManager->fillMaker([
                    MakerEnum::MAKER_NAME => $row[$dataColumns["Make"]]
                ]);

                $this->makerRepository->save($maker, true);
            }

            $fuel = null;
            if(strtolower($row[$dataColumns["Fuel Type"]]) == "regular") {
                $fuel = $this->fuelRepository->findOneBy(["fuelKey" => "sp95"]);
            } elseif(strtolower($row[$dataColumns["Fuel Type"]]) == "premium") {
                $fuel = $this->fuelRepository->findOneBy(["fuelKey" => "sp98"]);
            } elseif(strtolower($row[$dataColumns["Fuel Type"]]) == "cng") {
                $fuel = $this->fuelRepository->findOneBy(["fuelKey" => "gnv"]);
            } elseif(in_array(strtolower($row[$dataColumns["Fuel Type"]]), ["diesel", "electricity"])) {
                $fuel = $this->fuelRepository->findOneBy(["fuelKey" => strtolower($row[$dataColumns["Fuel Type"]])]);
            } else {
                continue;
            }

            // $vehicleType = null;
            // if(strpos(strtolower($row[$dataColumns["Vehicle Size Class"]]), "small sport utility vehicle")) {
            //     $vehicleType = $this->vehicleTypeRepository->findOneBy(["type" => "Small SUV"]);
            // } else {
            //     $vehicleType = $this->vehicleTypeRepository->findOneBy(["type" => $row[$dataColumns["Vehicle Size Class"]]]);
            // }
            
            $vehicle = (new Vehicle())
                ->setMaker($maker)
                ->setBasemodel($row[$dataColumns["baseModel"]])
                ->setName($row[$dataColumns["Model"]])
                ->setBuildAt(new \DateTimeImmutable($row[$dataColumns["Year"]] . "-01-01"))
                ->setAverageFuelConsumption(
                    $this->convertManager->convertGallonPerMillesToKilometrePerLiters(
                        floatval($row[$dataColumns["Annual Petroleum Consumption For Fuel Type1"]])
                    )
                )
                ->addFuel($fuel)
                ->setPrice(0)
                ->setCreatedAt($currentTime)
            ;

            $this->vehicleRepository->save($vehicle, true);

            foreach($row as $fieldName => $fieldValue) {
                if(in_array($fieldName, [
                    $dataColumns["Fuel Type"],
                    $dataColumns["Fuel Type1"],
                    $dataColumns["Fuel Type2"],
                    $dataColumns["Make"],
                    $dataColumns["Model"],
                    $dataColumns["baseModel"],
                    $dataColumns["Year"],
                    $dataColumns["Annual Petroleum Consumption For Fuel Type1"],
                    $dataColumns["Modified On"],
                    $dataColumns["Created On"],
                    $dataColumns["ID"]
                ])) {
                    continue;
                }

                $consumption = null;
                $characteristic = $this->characteristicRepository->getCharacteristicFromDescription($columnsName[$fieldName]);
                if(empty($characteristic)) {
                    $consumption = $this->consumptionRepository->getConsumptionFromDescritpion(str_replace(["for fuel type1", "for fuel type2"], ["", ""], strtolower($columnsName[$fieldName])));
                    if(empty($consumption)) {
                        continue;
                    }
                }

                if(!empty($characteristic)) {
                    $value = $fieldValue;
                    if(in_array($characteristic->getTitle(), ["hlv", "hpv", "lv2", "lv4", "pv2", "pv4"]) && (is_numeric($fieldValue) && floatval($fieldValue) == $fieldValue && floatval($fieldValue) > 0)) {
                        $value = $this->convertManager->convertCubeMeterToKg(
                            $this->convertManager->convertCubitFeetToCubeMeter(floatval($fieldValue))
                        );
                    }

                    $vehicleCharacteristic = (new VehicleCharacteristic())
                        ->setVehicle($vehicle)
                        ->setCharacteristic($characteristic)
                        ->setValue($value)
                        ->setCreatedAt($currentTime);
                    ;
                    $this->vehicleCharacteristicRepository->save($vehicleCharacteristic, true);
                } elseif(!empty($consumption)) {
                    $vehicleConsumption = (new VehicleConsumption())
                        ->setVehicle($vehicle)
                        ->setConsumption($consumption)
                        ->setValue($fieldValue)
                        ->setCreatedAt($currentTime)
                    ;
                    $this->vehicleConsumptionRepository->save($vehicleConsumption, true);
                }
            }
        }

        // At the end, close the file because, we don't need it anymore
        fclose($handle);

        // Return a success response to the client
        $io->success('All vehicles has been successfully added to the database');
        return Command::SUCCESS;
    }
}
