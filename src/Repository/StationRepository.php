<?php

namespace App\Repository;

use App\Entity\Station;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Station>
 */
class StationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Station::class);
    }

    /**
     * @param Station entity
     * @param bool flush into database
     */
    public function save(Station $entity, bool $flush = false) {
        $this->getEntityManager()->persist($entity);

        if($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * @param Station entity
     * @param bool flush remove into database
     */
    public function remove(Station $entity, bool $flush = false) {
        $this->getEntityManager()->remove($entity);

        if($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * Get all zip code where a stations is located
     */
    public function getExistingZipCodes() {
        return $this->createQueryBuilder("s")
            ->select("DISTINCT s.zipCode")
            ->getQuery()
            ->getResult()
        ;
    }

    /**
     * Get all city where a stations is located
     */
    public function getExistingCities() {
        return $this->createQueryBuilder("s")
            ->select("DISTINCT s.city")
            ->getQuery()
            ->getResult()
        ;
    }

    public function searchStationsByParameters(array $parameters, int $offset, int $limit) : array {
        $qb = $this->createQueryBuilder("s");

        if(!empty($parameters["fuel"])) {
            $qb
                ->innerJoin("App\Entity\StationFuel", "sf", "sf.station = s.id")
                ->where("sf.fuelKey LIKE :fuel")
                ->setParameter("fuel", $parameters["fuel"])
            ;
        }

        if($parameters["use_position"] === "true") {}

        if(!empty($parameters["address"])) {}

        if(!empty($parameters["city"])) {
            $qb
                ->andWhere("s.city LIKE :stationCity")
                ->setParameter("stationCity", $parameters["city"])
            ;
        }

        return $qb
            ->setFirstResult(($offset - 1) * $limit)
            ->setMaxResults($limit)
            ->getQuery()
            ->getResult()
        ;
    }

    /**
     * Count the curent number of station in the database
     * 
     * @return int
     */
    public function countStations() : int {
        return $this->createQueryBuilder("station")
            ->select("COUNT(station.id) as nbrStations")
            ->getQuery()
            ->getSingleResult()["nbrStations"]
        ;
    }

    /**
     * Count results from search stations using sended parameters
     * 
     * @param array $parameters
     * @return int
     */
    public function countStationsByParameters(array $parameters) : int {
        $qb = $this->createQueryBuilder("s")
            ->select("COUNT(s.id) as nbrStations");

        if(!empty($parameters["fuel"])) {
            $qb
                ->innerJoin("App\Entity\StationFuel", "sf", "sf.station = s.id")
                ->where("sf.fuelKey LIKE :fuel")
                ->setParameter("fuel", $parameters["fuel"])
            ;
        }

        if($parameters["use_position"] === "true") {}

        if(!empty($parameters["address"])) {}

        if(!empty($parameters["city"])) {
            $qb
                ->andWhere("s.city LIKE :stationCity")
                ->setParameter("stationCity", $parameters["city"])
            ;
        }

        return $qb
            ->getQuery()
            ->getSingleResult()["nbrStations"]
        ;
    }
}
