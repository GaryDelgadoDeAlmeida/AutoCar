<?php

namespace App\Command;

use App\Enum\ConsumptionEnum;
use App\Manager\ConsumptionManager;
use App\Repository\ConsumptionRepository;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

#[AsCommand(
    name: 'app:import-consumptions',
    description: 'Add a short description for your command',
)]
class ImportConsumptionsCommand extends Command
{
    private ConsumptionManager $consumptionManager;
    private ConsumptionRepository $consumptionRepository;

    public function __construct(
        ConsumptionManager $consumptionManager, 
        ConsumptionRepository $consumptionRepository
    ) {
        parent::__construct();
        $this->consumptionManager = $consumptionManager;
        $this->consumptionRepository = $consumptionRepository;
    }

    protected function configure(): void
    {
        $this
            // ->addArgument('arg1', InputArgument::OPTIONAL, 'Argument description')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        
        // $arg1 = $input->getArgument('arg1');
        // if ($arg1) {
        //     $io->note(sprintf('You passed an argument: %s', $arg1));
        // }

        $consumptions = [
            "atvtype" => "type of alternative fuel or advanced technology vehicle",
            "barrels08" => "annual petroleum consumption in barrels for fuelType1",
            "barrelsA08" => "annual petroleum consumption in barrels for fuelType2",
            "charge120" => "time to charge an electric vehicle in hours at 120 V",
            "charge240" => "time to charge an electric vehicle in hours at 240 V",
            "charge240b" => "time to charge an electric vehicle in hours at 240 V using the alternate charger",
            "cityCD" => "city gasoline consumption (gallons/100 miles) in charge depleting mode",
            "cityE" => "city electricity consumption in kw-hrs/100 miles",
            "cityMpk" => "city miles per Kilogram for Hydrogen",
            "cityUmpk" => "unrounded city miles per Kilogram for Hydrogen",
            "co2" => "tailpipe CO2 in grams/mile for fuelType1",
            "co2A" => "tailpipe CO2 in grams/mile for fuelType2",
            "co2TailpipeAGpm" => "tailpipe CO2 in grams/mile for fuelType2",
            "co2TailpipeGpm" => "tailpipe CO2 in grams/mile for fuelType1",
            "comb08" => "combined MPG for fuelType1",
            "comb08U" => "unrounded combined MPG for fuelType1",
            "combA08" => "combined MPG for fuelType2",
            "combA08U" => "unrounded combined MPG for fuelType2",
            "combE" => "combined electricity consumption in kw-hrs/100 miles",
            "combMpk" => "combined miles per Kilogram for Hydrogen",
            "combUmpk" => "unrounded combined miles per Kilogram for Hydrogen",
            "combinedCD" => "combined gasoline consumption (gallons/100 miles) in charge depleting mode",
            "combinedUF" => "EPA combined utility factor (share of electricity) for PHEV",
            "highway08" => "highway MPG for fuelType1",
            "highway08U" => "unrounded highway MPG for fuelType1",
            "highwayA08" => "highway MPG for fuelType2",
            "highwayA08U" => "unrounded highway MPG for fuelType2",
            "highwayCD" => "highway gasoline consumption (gallons/100miles) in charge depleting mode",
            "highwayE" => "highway electricity consumption in kw-hrs/100 miles",
            "highwayMpk" => "highway miles per Kilogram for Hydrogen",
            "highwayUmpk" => "unrounded highway miles per Kilogram for Hydrogen",
            "highwayUF" => "EPA highway utility factor (share of electricity) for PHEV",
        ];

        foreach($consumptions as $fieldName => $fieldValue) {
            $category = "";
            if(strpos($fieldName, "city") === 0) {
                $category = "city";
            } elseif(strpos($fieldName, "co2") === 0) {
                $category = "co2";
            } elseif(strpos($fieldName, "highway") === 0) {
                $category = "highway";
            } elseif(strpos($fieldName, "charge") === 0) {
                $category = "charge";
            }

            $consumption = $this->consumptionManager->fillConsumption([
                ConsumptionEnum::CONSUMPTION_TITLE => $fieldName,
                ConsumptionEnum::CONSUMPTION_DESCRIPTION => $fieldValue,
                ConsumptionEnum::CONSUMPTION_CATEGORY => $category
            ]);

            $this->consumptionRepository->save($consumption, true);
        }

        $io->success('All consumptions datas has been imported');

        return Command::SUCCESS;
    }
}
