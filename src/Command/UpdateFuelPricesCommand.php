<?php

namespace App\Command;

use App\Enum\FuelEnum;
use App\Enum\FuelKeyEnum;
use App\Enum\FuelPriceHistoryEnum;
use App\Manager\FuelManager;
use App\Manager\FuelPriceHistoryManager;
use App\Repository\FuelPriceHistoryRepository;
use App\Repository\FuelRepository;
use App\Repository\StationFuelRepository;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Helper\QuestionHelper;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Question\ChoiceQuestion;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'app:update-fuel-prices',
    description: 'Add a short description for your command',
)]
class UpdateFuelPricesCommand extends Command
{
    private int $totalPages = 0;

    // Manager
    private FuelManager $fuelManager;
    private FuelPriceHistoryManager $fuelPriceHistoryManager;

    // Repository
    private FuelRepository $fuelRepository;
    private StationFuelRepository $stationFuelRepository;
    private FuelPriceHistoryRepository $fuelPriceHistoryRepository;

    public function __construct(
        FuelManager $fuelManager,
        FuelPriceHistoryManager $fuelPriceHistoryManager,
        FuelRepository $fuelRepository,
        StationFuelRepository $stationFuelRepository,
        FuelPriceHistoryRepository $fuelPriceHistoryRepository
    ) {
        parent::__construct();
        $this->fuelManager = $fuelManager;
        $this->fuelPriceHistoryManager = $fuelPriceHistoryManager;
        $this->fuelRepository = $fuelRepository;
        $this->stationFuelRepository = $stationFuelRepository;
        $this->fuelPriceHistoryRepository = $fuelPriceHistoryRepository;
    }

    protected function configure(): void
    {
        $this
            // ->addArgument('arg1', InputArgument::OPTIONAL, 'Argument description')
            // ->addOption('option1', null, InputOption::VALUE_NONE, 'Option description')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        // Ask the scraping method to the client
        $options = [
            "use_local_data" => "Use local data",
            "use_distant_source" => "use API flux instantanné",
        ];
        $helper = new QuestionHelper();
        $question = new ChoiceQuestion(
            "Veuillez sélectionner la source de donnée pour effectuée la mise à jour",
            array_values($options)
        );
        
        // Rretrive the selected shop
        $givenOption = $helper->ask($input, $output, $question);
        $selectedOption = array_search($givenOption, $options);

        try {
            switch($selectedOption) {
                case "use_local_data":
                    $response = $this->fillWithLocalDatabase($io);
                    break;

                case "use_distant_source":
                    $response = $this->fillWithInstantFluxFuels($io);
                    break;

                default:
                    throw new \Exception("Unauthorized option has selected. Update process has been cancelled.");
            }
        } catch(\Exception $e) {
            $io->error($e->getMessage());
            return Command::FAILURE;
        }

        return $response;
    }

    private function fillWithLocalDatabase(SymfonyStyle $io) {
        // Update fuels
        foreach(FuelKeyEnum::getAvailableChoices() as $fuelKey) {
            $this->updateFuel($fuelKey, $this->stationFuelRepository->avgFuelPrice($fuelKey));
        }

        // Return a response to the client
        $io->success('Fuels has been successfully updated');
        return Command::SUCCESS;
    }

    private function fillWithInstantFluxFuels(SymfonyStyle $io) {
        $offset = 1;
        $limit = 100;
        $foundedError = false;
        // $currentTime = new \DateTimeImmutable();
        $priceMedians = [
            FuelKeyEnum::FUELKEY_DIESEL => ["price" => 0, "nbr" => 0], // Gazole / Diesel (B7)
            FuelKeyEnum::FUELKEY_SP98 => ["price" => 0, "nbr" => 0], // Sans Plomb 98 (E5)
            FuelKeyEnum::FUELKEY_SP95 => ["price" => 0, "nbr" => 0], // Sans Plomb 95 (E5)
            FuelKeyEnum::FUELKEY_SP95E10 => ["price" => 0, "nbr" => 0], // Sans Plomb 95 (E10)
            FuelKeyEnum::FUELKEY_E85 => ["price" => 0, "nbr" => 0], // BioEthanol (E85)
            FuelKeyEnum::FUELKEY_GPLC => ["price" => 0, "nbr" => 0], // GPL
        ];

        do {
            ["response" => $response, "error" => $error] = $this->callFranceGouvAPI("https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/prix-des-carburants-en-france-flux-instantane-v2/records?limit={$limit}&offset={$offset}", $limit);
            if(!empty($error)) {
                $foundedError = $error;
                break;
            }

            if(empty($response["results"])) {
                break;
            }

            foreach($response["results"] as $station) {

                // Gazole / Diesel (B7)
                // $gazoleUpdatedAt = new \DateTimeImmutable($station["gazole_maj"]);
                if(!empty($station["gazole_prix"]) /*&& $gazoleUpdatedAt->format("Y-m-d") == $currentTime->format("Y-m-d")*/) {
                    $priceMedians[FuelKeyEnum::FUELKEY_DIESEL]["nbr"]++;
                    $priceMedians[FuelKeyEnum::FUELKEY_DIESEL]["price"] += floatval($station["gazole_prix"]);
                }
                
                // Sans Plomb 98 (E5)
                // $sp98UpdatedAt = new \DateTimeImmutable($station["sp98_maj"]);
                if(!empty($station["sp98_prix"]) /*&& $sp98UpdatedAt->format("Y-m-d") == $currentTime->format("Y-m-d")*/) {
                    $priceMedians[FuelKeyEnum::FUELKEY_SP98]["nbr"]++;
                    $priceMedians[FuelKeyEnum::FUELKEY_SP98]["price"] += floatval($station["sp98_prix"]);
                }
                
                // Sans Plomb 95 (E5)
                // $sp95UpdatedAt = new \DateTimeImmutable($station["sp95_maj"]);
                if(!empty($station["sp95_prix"]) /*&& $sp95UpdatedAt->format("Y-m-d") == $currentTime->format("Y-m-d")*/) {
                    $priceMedians[FuelKeyEnum::FUELKEY_SP95]["nbr"]++;
                    $priceMedians[FuelKeyEnum::FUELKEY_SP95]["price"] += floatval($station["sp95_prix"]);
                }
                
                // Sans Plomb 95 (E10)
                // $e10UpdatedAt = new \DateTimeImmutable($station["e10_maj"]);
                if(!empty($station["e10_prix"]) /*&& $e10UpdatedAt->format("Y-m-d") == $currentTime->format("Y-m-d")*/) {
                    $priceMedians[FuelKeyEnum::FUELKEY_SP95E10]["nbr"]++;
                    $priceMedians[FuelKeyEnum::FUELKEY_SP95E10]["price"] += floatval($station["e10_prix"]);
                }
                
                // BioEthanol (E85)
                // $e85UpdatedAt = new \DateTimeImmutable($station["e85_maj"]);
                if(!empty($station["e85_prix"]) /*&& $e85UpdatedAt->format("Y-m-d") == $currentTime->format("Y-m-d")*/) {
                    $priceMedians[FuelKeyEnum::FUELKEY_E85]["nbr"]++;
                    $priceMedians[FuelKeyEnum::FUELKEY_E85]["price"] += floatval($station["e85_prix"]);
                }
                
                // GPL
                // $gplcUpdatedAt = new \DateTimeImmutable($station["gplc_maj"]);
                if(!empty($station["gplc_prix"]) /*&& $gplcUpdatedAt->format("Y-m-d") == $currentTime->format("Y-m-d")*/) {
                    $priceMedians[FuelKeyEnum::FUELKEY_GPLC]["nbr"]++;
                    $priceMedians[FuelKeyEnum::FUELKEY_GPLC]["price"] += floatval($station["gplc_prix"]);
                }
            }

            $offset++;
        } while($offset < $this->totalPages);

        if(empty($response["results"]) && !$foundedError) {
            $io->error("API returned not data. Fuels pricing update process has been aborted");
            return Command::FAILURE;
        }

        if($foundedError !== false) {
            $io->error("An error has been encountered with the API. Update process has been cancelled");
            return Command::FAILURE;
        }

        // Update fuels
        foreach($priceMedians as $priceMedianKey => $priceMedianValue) {
            $this->updateFuel($priceMedianKey, $priceMedianValue["price"] / $priceMedianValue["nbr"]);
        }

        $io->success('Fuels has been successfully updated');
        return Command::SUCCESS;
    }

    /**
     * Get all stations of France
     * 
     * @param int $offset
     * @param int $limit
     * @return array{error: string, response: mixed}
     */
    private function callFranceGouvAPI(string $distantURL, int $limit) {
        curl_setopt_array($ch = curl_init(), [
            CURLOPT_URL => $distantURL,
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

    /**
     * Get all stations of France
     * 
     * @param int $offset
     * @param int $limit
     * @return array{error: string, response: mixed}
     */
    private function callInstantFluxGouvAPI(int $offset = 1, int $limit = 20) {
        $ch = curl_init();
        curl_setopt_array($ch, [
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

    /**
     * Update a fuel price
     * 
     * @param string $fuelName
     * @param float $newPrice
     * @return bool
     */
    private function updateFuel(string $fuelName, float $newPrice) {
        $fuel = $this->fuelRepository->findOneBy(["fuelKey" => $fuelName]);
        if(empty($fuel)) {
            return false;
        }

        if($fuel->getPrice() != $newPrice && $newPrice > 0) {

            // Add a fuel history
            $priceHistory = $this->fuelPriceHistoryManager->fillFuelPriceHistory([
                FuelPriceHistoryEnum::HISTORY_FUEL => $fuel,
                FuelPriceHistoryEnum::HISTORY_PRICE => $fuel->getPrice()
            ]);
            $this->fuelPriceHistoryRepository->save($priceHistory);

            // Update existing fuel price
            $fuel = $this->fuelManager->fillFuel([
                FuelEnum::FUEL_PRICE => floatval(number_format($newPrice, 3))
            ], $fuel);
            $this->fuelRepository->save($fuel, true);
        }

        return true;
    }
}
