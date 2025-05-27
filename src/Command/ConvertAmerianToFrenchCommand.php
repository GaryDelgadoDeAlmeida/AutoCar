<?php

namespace App\Command;

use App\Manager\ConvertManager;
use App\Repository\VehicleRepository;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'app:convert-amerian-to-french',
    description: 'Add a short description for your command',
)]
class ConvertAmerianToFrenchCommand extends Command
{
    private ConvertManager $convertManager;
    private VehicleRepository $vehicleRepository;

    public function __construct(
        ConvertManager $convertManager,
        VehicleRepository $vehicleRepository
    ) {
        parent::__construct();

        // Manager
        $this->convertManager = $convertManager;

        // Repository
        $this->vehicleRepository = $vehicleRepository;
    }

    protected function configure(): void {
        $this
            // ->addArgument('arg1', InputArgument::OPTIONAL, 'Argument description')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int {
        $io = new SymfonyStyle($input, $output);
        // $arg1 = $input->getArgument('arg1');

        $nbrEmptyFuelDatas = $nbrUpdatedRows = 0;
        $vehicleToIgnore = [257, 260];
        $vehicles = $this->vehicleRepository->findAll();
        
        try {
            foreach($vehicles as $vehicle) {
                if(in_array($vehicle->getId(), $vehicleToIgnore)) {
                    continue;
                }
    
                $vehicleFuelConsumptions = $vehicle->getAverageFuelConsumption();
                if(empty($vehicleFuelConsumptions) || $vehicleFuelConsumptions <= 0) {
                    $nbrEmptyFuelDatas++;
                    continue;
                }
    
                $vehicle->setAverageFuelConsumption(
                    $this->convertManager->convertGallonPerMillesToKilometrePerLiters(
                        $vehicle->getAverageFuelConsumption()
                    )
                );
    
                $this->vehicleRepository->save($vehicle, true);
                $nbrUpdatedRows++;
            }
        } catch(\Exception $e) {
            $io->error("An error has been encountered. This is the message : {$e->getMessage()}");
        }

        $io->success("Total rows : " . (count($vehicles) - count($vehicleToIgnore)) . " ; Updated rows : {$nbrUpdatedRows} ; Nbr vehicle without fuel datas : {$nbrEmptyFuelDatas}");

        return Command::SUCCESS;
    }
}
