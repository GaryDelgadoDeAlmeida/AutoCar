<?php

namespace App\Command;

use App\Entity\Characteristic;
use App\Repository\CharacteristicRepository;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'app:import-characteristics',
    description: 'Add a short description for your command',
)]
class ImportCharacteristicsCommand extends Command
{
    private CharacteristicRepository $characteristicRepository;
    
    public function __construct(CharacteristicRepository $characteristicRepository)
    {
        parent::__construct();
        $this->characteristicRepository = $characteristicRepository;
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
        // $arg1 = $input->getArgument('arg1');

        // if ($arg1) {
        //     $io->note(sprintf('You passed an argument: %s', $arg1));
        // }

        // if ($input->getOption('option1')) {
        //     // ...
        // }

        $characteristics = [
            "cylinders" => "engine cylinders",
            "displ" => "engine displacement in liters",
            "drive" => "drive axle type",
            "engId" => "EPA model type index",
            "evMotor" => "electric motor (kw-hrs)",
            "feScore" => "EPA Fuel Economy Score (-1 = Not available)",
            "fuelCost08" => "annual fuel cost for fuelType1 ($)",
            "fuelCostA08" => "annual fuel cost for fuelType2 ($)",
            "fuelType" => "fuel type with fuelType1 and fuelType2 (if applicable)",
            "fuelType1" => "fuel type 1. For single fuel vehicles, this will be the only fuel. For dual fuel vehicles, this will be the conventional fuel.",
            "fuelType2" => "fuel type 2. For dual fuel vehicles, this will be the alternative fuel (e.g. E85, Electricity, CNG, LPG). For single fuel vehicles, this field is not used",
            "ghgScore" => "EPA GHG score (-1 = Not available)",
            "ghgScoreA" => "EPA GHG score for dual fuel vehicle running on the alternative fuel (-1 = Not available)",
            "guzzler" => "if G or T, this vehicle is subject to the gas guzzler tax",
            "hlv" => "hatchback luggage volume (cubic feet)",
            "hpv" => "hatchback passenger volume (cubic feet)",
            "lv2" => "2 door luggage volume (cubic feet)",
            "lv4" => "4 door luggage volume (cubic feet)",
            "mfrCode" => "3-character manufacturer code",
            "mpgData" => "has My MPG data; see yourMpgVehicle and yourMpgDriverVehicle",
            "phevBlended" => "if true, this vehicle operates on a blend of gasoline and electricity in charge depleting mode",
            "pv2" => "2-door passenger volume (cubic feet)",
            "pv4" => "4-door passenger volume (cubic feet)",
            "rangeA" => "EPA range for fuelType2",
            "rangeCityA" => "EPA city range for fuelType2",
            "rangeHwyA" => "EPA highway range for fuelType2",
            "trany" => "transmission",
            "UCity" => "unadjusted city MPG for fuelType1; see the description of the EPA test procedures",
            "UCityA" => "unadjusted city MPG for fuelType2; see the description of the EPA test procedures",
            "UHighway" => "unadjusted highway MPG for fuelType1; see the description of the EPA test procedures",
            "UHighwayA" => "unadjusted highway MPG for fuelType2; see the description of the EPA test procedures",
            "VClass" => "EPA vehicle size class",
            "youSaveSpend" => "you save/spend over 5 years compared to an average car ($). Savings are positive; a greater amount spent yields a negative number. For dual fuel vehicles, this is the cost savings for gasoline",
            "sCharger" => "if S, this vehicle is supercharged",
            "tCharger" => "if T, this vehicle is turbocharged",
            "c240Dscr" => "electric vehicle charger description",
            "c240bDscr" => "electric vehicle alternate charger description",
            "startStop" => "vehicle has stop-start technology (Y, N, or blank for older vehicles)",
            "phevCity" => "EPA composite gasoline-electricity city MPGe for plug-in hybrid vehicles",
            "phevHwy" => "EPA composite gasoline-electricity highway MPGe for plug-in hybrid vehicles",
            "phevComb" => "EPA composite gasoline-electricity combined city-highway MPGe for plug-in hybrid vehicles",
        ];

        $currentTime = new \DateTimeImmutable();
        try {
            foreach($characteristics as $key => $value) {
                $charact = $this->characteristicRepository->findOneBy(["title" => $key]);
                if(!empty($charact)) {
                    continue;
                }

                $characteristic = (new Characteristic())
                    ->setTitle($key)
                    ->setDescription($value)
                    ->setCreatedAt($currentTime)
                ;
    
                $this->characteristicRepository->save($characteristic, true);
            }
        } catch(\Exception $e) {
            $io->error($e->getMessage());
            return Command::FAILURE;
        }

        $io->success('All characteristics have been imported');
        return Command::SUCCESS;
    }
}
