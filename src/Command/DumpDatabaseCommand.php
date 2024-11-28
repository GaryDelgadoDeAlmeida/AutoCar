<?php

namespace App\Command;

use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'app:dump-database',
    description: 'Dump all databases',
)]
class DumpDatabaseCommand extends Command
{
    public function __construct()
    {
        parent::__construct();
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
        
        try {
            $this->dump_MySQL('127.0.0.1:3306', 'root', 'root', 'autocar', 2);
            $io->success("Sauvegarde terminée");
        } catch(\Exception $e) {
            $io->error($e->getMessage());
            return Command::FAILURE;
        }

        return Command::SUCCESS;
    }

    /**
     * @param string server
     * @param string login
     * @param string password
     * @param int mode
     */
    private function dump_MySQL(string $serveur, string $login, string $password, string $base, int $mode) {
        $connexion = mysqli_connect($serveur, $login, $password);
        mysqli_select_db($connexion, $base);
        
        $entete  = "-- ----------------------\n";
        $entete .= "-- dump de la base ".$base." au ".date("d-M-Y")."\n";
        $entete .= "-- ----------------------\n\n\n";
        $creations = "";
        $insertions = "\n\n";
        
        $listeTables = mysqli_query($connexion, "show tables");
        while($table = mysqli_fetch_array($listeTables)) {
            // structure ou la totalité de la BDD
            if($mode == 1 || $mode == 2) {
                $creations .= "-- -----------------------------\n";
                $creations .= "-- Structure de la table ".$table[0]."\n";
                $creations .= "-- -----------------------------\n";
                
                $listeCreationsTables = mysqli_query($connexion, "show create table ".$table[0]);
                while($creationTable = mysqli_fetch_array($listeCreationsTables)) {
                    $creations .= $creationTable[1].";\n\n";
                }
            }
            
            // données ou la totalité
            if($mode > 1) {
                $donnees = mysqli_query($connexion, "SELECT * FROM ".$table[0]);
                $insertions .= "-- -----------------------------\n";
                $insertions .= "-- Contenu de la table ".$table[0]."\n";
                $insertions .= "-- -----------------------------\n";
                while($nuplet = mysqli_fetch_array($donnees)) {
                    $insertions .= "INSERT INTO ".$table[0]." VALUES(";
                    for($i=0; $i < mysqli_num_fields($donnees); $i++) {
                        if($i != 0) {
                            $insertions .=  ", ";
                        }

                        if(mysqli_fetch_field_direct($donnees, $i) == "string" || mysqli_fetch_field_direct($donnees, $i) == "blob") {
                            $insertions .=  "'";
                        }

                        $insertions .= addslashes($nuplet[$i]);
                        if(mysqli_fetch_field_direct($donnees, $i) == "string" || mysqli_fetch_field_direct($donnees, $i) == "blob") {
                            $insertions .=  "'";
                        }
                    }

                    $insertions .=  ");\n";
                }

                $insertions .= "\n";
            }
        }
    
        mysqli_close($connexion);
    
        $currentTime = (new \DateTimeImmutable())->format("Y-m-d-H-i-s");
        $fichierDump = fopen(dirname(__FILE__) . "/../../public/database-dump--{$currentTime}.sql", "wb");
        fwrite($fichierDump, $entete);
        fwrite($fichierDump, $creations);
        fwrite($fichierDump, $insertions);
        fclose($fichierDump);
    }
}
