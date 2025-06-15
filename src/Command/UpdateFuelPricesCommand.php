<?php

namespace App\Command;

use App\Enum\FuelEnum;
use App\Enum\FuelPriceHistoryEnum;
use App\Manager\FuelManager;
use App\Manager\FuelPriceHistoryManager;
use App\Repository\FuelPriceHistoryRepository;
use App\Repository\FuelRepository;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'app:update-fuel-prices',
    description: 'Add a short description for your command',
)]
class UpdateFuelPricesCommand extends Command
{
    private int $totalPages = 0;

    private FuelManager $fuelManager;
    private FuelPriceHistoryManager $fuelPriceHistoryManager;
    private FuelRepository $fuelRepository;
    private FuelPriceHistoryRepository $fuelPriceHistoryRepository;

    public function __construct(
        FuelManager $fuelManager,
        FuelPriceHistoryManager $fuelPriceHistoryManager,
        FuelRepository $fuelRepository,
        FuelPriceHistoryRepository $fuelPriceHistoryRepository
    ) {
        parent::__construct();
        $this->fuelManager = $fuelManager;
        $this->fuelPriceHistoryManager = $fuelPriceHistoryManager;
        $this->fuelRepository = $fuelRepository;
        $this->fuelPriceHistoryRepository = $fuelPriceHistoryRepository;
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

        $offset = 1;
        $limit = 100;
        $foundedError = false;
        // $currentTime = new \DateTimeImmutable();
        $priceMedians = [
            "gazole" => ["price" => 0, "nbr" => 0], // Gazole / Diesel (B7)
            "sp98" => ["price" => 0, "nbr" => 0], // Sans Plomb 98 (E5)
            "sp95" => ["price" => 0, "nbr" => 0], // Sans Plomb 95 (E5)
            "e10" => ["price" => 0, "nbr" => 0], // Sans Plomb 95 (E10)
            "e85" => ["price" => 0, "nbr" => 0], // BioEthanol (E85)
            "gpl" => ["price" => 0, "nbr" => 0], // GPL
        ];
        
        do {
            ["response" => $response, "error" => $error] = $this->callGouvAPI($offset, $limit);
            if(!empty($error)) {
                $foundedError = $error;
                break;
            }

            foreach($response["results"] as $station) {

                // Gazole / Diesel (B7)
                // $gazoleUpdatedAt = new \DateTimeImmutable($station["gazole_maj"]);
                if(!empty($station["gazole_prix"]) /*&& $gazoleUpdatedAt->format("Y-m-d") == $currentTime->format("Y-m-d")*/) {
                    $priceMedians["gazole"]["nbr"]++;
                    $priceMedians["gazole"]["price"] += floatval($station["gazole_prix"]);
                }
                
                // Sans Plomb 98 (E5)
                // $sp98UpdatedAt = new \DateTimeImmutable($station["sp98_maj"]);
                if(!empty($station["sp98_prix"]) /*&& $sp98UpdatedAt->format("Y-m-d") == $currentTime->format("Y-m-d")*/) {
                    $priceMedians["sp98"]["nbr"]++;
                    $priceMedians["sp98"]["price"] += floatval($station["sp98_prix"]);
                }
                
                // Sans Plomb 95 (E5)
                // $sp95UpdatedAt = new \DateTimeImmutable($station["sp95_maj"]);
                if(!empty($station["sp95_prix"]) /*&& $sp95UpdatedAt->format("Y-m-d") == $currentTime->format("Y-m-d")*/) {
                    $priceMedians["sp95"]["nbr"]++;
                    $priceMedians["sp95"]["price"] += floatval($station["sp95_prix"]);
                }
                
                // Sans Plomb 95 (E10)
                // $e10UpdatedAt = new \DateTimeImmutable($station["e10_maj"]);
                if(!empty($station["e10_prix"]) /*&& $e10UpdatedAt->format("Y-m-d") == $currentTime->format("Y-m-d")*/) {
                    $priceMedians["e10"]["nbr"]++;
                    $priceMedians["e10"]["price"] += floatval($station["e10_prix"]);
                }
                
                // BioEthanol (E85)
                // $e85UpdatedAt = new \DateTimeImmutable($station["e85_maj"]);
                if(!empty($station["e85_prix"]) /*&& $e85UpdatedAt->format("Y-m-d") == $currentTime->format("Y-m-d")*/) {
                    $priceMedians["e85"]["nbr"]++;
                    $priceMedians["e85"]["price"] += floatval($station["e85_prix"]);
                }
                
                // GPL
                // $gplcUpdatedAt = new \DateTimeImmutable($station["gplc_maj"]);
                if(!empty($station["gplc_prix"]) /*&& $gplcUpdatedAt->format("Y-m-d") == $currentTime->format("Y-m-d")*/) {
                    $priceMedians["gpl"]["nbr"]++;
                    $priceMedians["gpl"]["price"] += floatval($station["gplc_prix"]);
                }
            }

            $offset++;
        } while($offset < $this->totalPages);

        if($foundedError !== false) {
            $io->error("An error has been encountered with the API. Update process has been cancelled");
            return Command::FAILURE;
        }

        // Gazole
        $this->updateFuel("diesel", $priceMedians['gazole']["price"] / $priceMedians['gazole']["nbr"]);

        // Sans Plomb 98 (E5)
        $this->updateFuel("sp98", $priceMedians['sp98']["price"] / $priceMedians['sp98']["nbr"]);

        // Sans Plomb 95 (E5)
        $this->updateFuel("sp95", $priceMedians['sp95']["price"] / $priceMedians['sp95']["nbr"]);

        // Sans Plomb 95 (E10)
        $this->updateFuel("sp95-e10", $priceMedians['e10']["price"] / $priceMedians['e10']["nbr"]);

        // BioEthanol E85
        $this->updateFuel("e85", $priceMedians['e85']["price"] / $priceMedians['e85']["nbr"]);

        // GPL
        $this->updateFuel("gpl", $priceMedians['gpl']["price"] / $priceMedians['gpl']["nbr"]);

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
    private function callGouvAPI(int $offset = 1, int $limit = 20) {
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
