<?php

namespace App\Command;

use App\Enum\StationEnum;
use App\Enum\StationFuelEnum;
use App\Manager\StationFuelManager;
use App\Manager\StationManager;
use App\Repository\StationFuelRepository;
use App\Repository\StationRepository;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'app:update-stations',
    description: 'Add a short description for your command',
)]
class UpdateStationsCommand extends Command
{
    private int $offset = 1;
    private int $totalPages = 0;
    private StationManager $stationManager;
    private StationFuelManager $stationFuelManager;
    private StationRepository $stationRepository;
    private StationFuelRepository $stationFuelRepository;

    public function __construct(
        StationManager $stationManager,
        StationFuelManager $stationFuelManager,
        StationRepository $stationRepository,
        StationFuelRepository $stationFuelRepository
    ) {
        parent::__construct();
        $this->stationManager = $stationManager;
        $this->stationFuelManager = $stationFuelManager;
        $this->stationRepository = $stationRepository;
        $this->stationFuelRepository = $stationFuelRepository;
    }

    protected function configure(): void {
        $this
            // ->addArgument('arg1', InputArgument::OPTIONAL, 'Argument description')
            // ->addOption('option1', null, InputOption::VALUE_NONE, 'Option description')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $limit = 100;
        $foundedError = null;
        
        try {
            do {
                ["response" => $response, "error" => $error] = $this->callGouvAPI($this->offset, $limit);
                if(!empty($error)) {
                    $foundedError = $error;
                    break;
                }

                if(empty($response["results"])) {
                    break;
                }

                foreach($response["results"] as $result) {
                    $station = $this->stationRepository->findOneBy([
                        "latitude" => $result["geom"]["lat"], 
                        "longitude" => $result["geom"]["lon"]
                    ], ["id" => "DESC"]);
                    if(empty($station)) {
                        $station = $this->stationManager->fillStation([
                            StationEnum::STATION_ADDRESS => $result["adresse"],
                            StationEnum::STATION_CITY => $result["ville"],
                            StationEnum::STATION_ZIPCODE => $result["cp"],
                            StationEnum::STATION_COUNTRY => "",
                            StationEnum::STATION_LATITUDE => $result["geom"]["lat"],
                            StationEnum::STATION_LONGITUDE => $result["geom"]["lon"]
                        ]);
                        if(is_string($station)) {
                            throw new \Exception($station);
                        }

                        $this->stationRepository->save($station, true);
                    }

                    // Gazole/Diesel
                    if(!empty($result["gazole_prix"])) {
                        $stationFuel = $this->stationFuelRepository->findOneBy(["station" => $station->getId(), "fuelKey" => "diesel"], ["id" => "DESC"]);
                        if(empty($stationFuel)) {
                            $stationFuel = $this->stationFuelManager->fillStationFuel([
                                StationFuelEnum::STATIONFUEL_STATION => $station,
                                StationFuelEnum::STATIONFUEL_FUEL => "Gazole / Diesel (B7)",
                                StationFuelEnum::STATIONFUEL_FUELKEY => "diesel",
                                StationFuelEnum::STATIONFUEL_PRICE => $result["gazole_prix"],
                            ]);
                        } else {
                            $stationFuel = $this->stationFuelManager->fillStationFuel([
                                StationFuelEnum::STATIONFUEL_PRICE => $result["gazole_prix"]
                            ], $stationFuel);
                        }

                        if(is_string($stationFuel)) {
                            throw new \Exception($stationFuel);
                        }

                        $this->stationFuelRepository->save($stationFuel, true);
                    }

                    // Essence SP95
                    if(!empty($result["sp95_prix"])) {
                        $stationFuel = $this->stationFuelRepository->findOneBy(["station" => $station->getId(), "fuelKey" => "sp95"], ["id" => "DESC"]);
                        if(empty($stationFuel)) {
                            $stationFuel = $this->stationFuelManager->fillStationFuel([
                                StationFuelEnum::STATIONFUEL_STATION => $station,
                                StationFuelEnum::STATIONFUEL_FUEL => "Sans Plomb 95 (E5)",
                                StationFuelEnum::STATIONFUEL_FUELKEY => "sp95",
                                StationFuelEnum::STATIONFUEL_PRICE => $result["sp95_prix"],
                            ]);
                        } else {
                            $stationFuel = $this->stationFuelManager->fillStationFuel([
                                StationFuelEnum::STATIONFUEL_PRICE => $result["sp95_prix"]
                            ], $stationFuel);
                        }

                        if(is_string($stationFuel)) {
                            throw new \Exception($stationFuel);
                        }

                        $this->stationFuelRepository->save($stationFuel, true);
                    }

                    // Essence SP95-E85
                    if(!empty($result["e85_prix"])) {
                        $stationFuel = $this->stationFuelRepository->findOneBy(["station" => $station->getId(), "fuelKey" => "e85"], ["id" => "DESC"]);
                        if(empty($stationFuel)) {
                            $stationFuel = $this->stationFuelManager->fillStationFuel([
                                StationFuelEnum::STATIONFUEL_STATION => $station,
                                StationFuelEnum::STATIONFUEL_FUEL => "BioEthanol E85",
                                StationFuelEnum::STATIONFUEL_FUELKEY => "e85",
                                StationFuelEnum::STATIONFUEL_PRICE => $result["e85_prix"],
                            ]);
                        } else {
                            $stationFuel = $this->stationFuelManager->fillStationFuel([
                                StationFuelEnum::STATIONFUEL_PRICE => $result["e85_prix"]
                            ], $stationFuel);
                        }

                        if(is_string($stationFuel)) {
                            throw new \Exception($stationFuel);
                        }

                        $this->stationFuelRepository->save($stationFuel, true);
                    }

                    // GLP
                    if(!empty($result["gplc_prix"])) {
                        $stationFuel = $this->stationFuelRepository->findOneBy(["station" => $station->getId(), "fuelKey" => "gpl"], ["id" => "DESC"]);
                        if(empty($stationFuel)) {
                            $stationFuel = $this->stationFuelManager->fillStationFuel([
                                StationFuelEnum::STATIONFUEL_STATION => $station,
                                StationFuelEnum::STATIONFUEL_FUEL => "GPL",
                                StationFuelEnum::STATIONFUEL_FUELKEY => "gpl",
                                StationFuelEnum::STATIONFUEL_PRICE => $result["gplc_prix"],
                            ]);
                        } else {
                            $stationFuel = $this->stationFuelManager->fillStationFuel([
                                StationFuelEnum::STATIONFUEL_PRICE => $result["gplc_prix"]
                            ], $stationFuel);
                        }

                        if(is_string($stationFuel)) {
                            throw new \Exception($stationFuel);
                        }

                        $this->stationFuelRepository->save($stationFuel, true);
                    }

                    // Essence SP98-E10
                    if(!empty($result["e10_prix"])) {
                        $stationFuel = $this->stationFuelRepository->findOneBy(["station" => $station->getId(), "fuelKey" => "sp98-e10"], ["id" => "DESC"]);
                        if(empty($stationFuel)) {
                            $stationFuel = $this->stationFuelManager->fillStationFuel([
                                StationFuelEnum::STATIONFUEL_STATION => $station,
                                StationFuelEnum::STATIONFUEL_FUEL => "Super 98 (E10)",
                                StationFuelEnum::STATIONFUEL_FUELKEY => "sp98-e10",
                                StationFuelEnum::STATIONFUEL_PRICE => $result["e10_prix"],
                            ]);
                        } else {
                            $stationFuel = $this->stationFuelManager->fillStationFuel([
                                StationFuelEnum::STATIONFUEL_PRICE => $result["e10_prix"]
                            ], $stationFuel);
                        }

                        if(is_string($stationFuel)) {
                            throw new \Exception($stationFuel);
                        }

                        $this->stationFuelRepository->save($stationFuel, true);
                    }

                    // Essence SP98
                    if(!empty($result["sp98_prix"])) {
                        $stationFuel = $this->stationFuelRepository->findOneBy(["station" => $station->getId(), "fuelKey" => "sp98"], ["id" => "DESC"]);
                        if(empty($stationFuel)) {
                            $stationFuel = $this->stationFuelManager->fillStationFuel([
                                StationFuelEnum::STATIONFUEL_STATION => $station,
                                StationFuelEnum::STATIONFUEL_FUEL => "Sans Plomb 98 (E5)",
                                StationFuelEnum::STATIONFUEL_FUELKEY => "sp98",
                                StationFuelEnum::STATIONFUEL_PRICE => $result["sp98_prix"],
                            ]);
                        } else {
                            $stationFuel = $this->stationFuelManager->fillStationFuel([
                                StationFuelEnum::STATIONFUEL_PRICE => $result["sp98_prix"]
                            ], $stationFuel);
                        }

                        if(is_string($stationFuel)) {
                            throw new \Exception($stationFuel);
                        }

                        $this->stationFuelRepository->save($stationFuel, true);
                    }
                }

                $this->offset++;
            } while($this->offset < $this->totalPages);
        } catch(\Exception $e) {
            $io->error($e->getMessage());
            return Command::FAILURE;
        }

        if($foundedError) {
            $io->error("An error has been encoutered. The process has been cancelled");
            $io->error($foundedError);
            return Command::FAILURE;
        }

        $io->success("All stations fuels price has successfully updated");
        return Command::SUCCESS;
    }

    /**
     * Get all stations of France
     * 
     * @param int $offset
     * @param int $limit
     * @return array{error: string, response: mixed}
     */
    private function callGouvAPI(int $offset = 1, int $limit = 20) {
        curl_setopt_array($ch = curl_init(), [
            CURLOPT_URL => "https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/prix-des-carburants-en-france-flux-instantane-v2/records?limit={$limit}&offset={$offset}",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HEADER => false,
            CURLOPT_HTTPHEADER => [
                "Content-Type" => "application/json",
                "Accept" => "application/json"
            ]
        ]);

        $response = curl_exec($ch);
        $jsonResponse = json_decode($response, true);
        $error = curl_error($ch);

        curl_close($ch);

        $totalPages = isset($jsonResponse["total_count"]) ? ceil($jsonResponse["total_count"] / $limit) : 0;
        if($this->totalPages != $totalPages) {
            $this->totalPages = $totalPages;
        }

        return ["response" => $jsonResponse, "error" => $error];
    }
}
