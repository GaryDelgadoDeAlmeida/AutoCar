<?php

namespace App\Command;

use App\Entity\Maker;
use App\Entity\Vehicle;
use App\Repository\MakerRepository;
use App\Repository\VehicleRepository;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'app:import-vehicules',
    description: 'Add a short description for your command',
)]
class ImportVehiculesCommand extends Command
{
    private MakerRepository $makerRepository;
    private VehicleRepository $vehicleRepository;

    public function __construct(MakerRepository $makerRepository, VehicleRepository $vehicleRepository)
    {
        parent::__construct();
        $this->makerRepository = $makerRepository;
        $this->vehicleRepository = $vehicleRepository;
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
            
            foreach($response["results"] as $index => $vehiculeData) {
                $maker = $this->makerRepository->findOneBy(["name" => $vehiculeData["make"]]);
                if(empty($maker)) {
                    $maker = (new Maker())
                        ->setName($vehiculeData["make"])
                        ->setCreatedAt($currentTime)
                    ;

                    $this->makerRepository->save($maker, true);
                }

                $vehicule = (new Vehicle())
                    ->setBasemodel($vehiculeData["basemodel"])
                    ->setName($vehiculeData["model"])
                    ->setPrice(0)
                    ->setFuel(null)
                    ->setBuildAt(new \DateTimeImmutable($vehiculeData["createdon"]))
                    ->setCreatedAt($currentTime)
                ;

                // Save changes into database every 100 persists of vehicules
                if($index % 100 == 0) {
                    $this->vehicleRepository->save($vehicule, true);
                } else {
                    $this->vehicleRepository->save($vehicule);
                }
            }

            $this->vehicleRepository->save($vehicule, true);
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

        dd($curl_response["results"][0]);

        return $curl_response;
    }
}
