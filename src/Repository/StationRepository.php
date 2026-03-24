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
     * @return void
     */
    public function save(Station $entity, bool $flush = false) : void {
        $this->getEntityManager()->persist($entity);

        if($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * @param Station entity
     * @param bool flush remove into database
     * @return void
     */
    public function remove(Station $entity, bool $flush = false) : void {
        $this->getEntityManager()->remove($entity);

        if($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * Get all zip code where a stations is located
     * 
     * @return array
     */
    public function getExistingZipCodes() : array {
        return $this->createQueryBuilder("s")
            ->select("DISTINCT s.zipCode")
            ->getQuery()
            ->getResult()
        ;
    }

    /**
     * Get all city where a stations is located
     * 
     * @return array
     */
    public function getExistingCities() : array {
        return $this->createQueryBuilder("s")
            ->select("DISTINCT s.city")
            ->getQuery()
            ->getResult()
        ;
    }

    /**
     * Search stations by parameters
     * 
     * @param array $parameters
     * @param int $offset
     * @param int $limit
     * @return array
     */
    public function searchStationsByParameters(array $parameters, int $offset, int $limit) : array {
        $qb = $this->createQueryBuilder("s");

        if(!empty($parameters["fuel"])) {
            $qb
                ->innerJoin("App\Entity\StationFuel", "sf", "sf.station = s.id")
                ->andWhere("sf.fuelKey LIKE :fuel")
                ->setParameter("fuel", $parameters["fuel"])
            ;
        }

        if($parameters["use_position"] === "true") {
            $qb
                ->andWhere("ST_DISTANCE_SPHERE(
                    POINT(s.longitude, s.latitude),
                    POINT(:longitude, :latitude)
                ) <= :radiusMeter")
                ->setParameter("longitude", $parameters["longitude"])
                ->setParameter("latitude", $parameters["latitude"])
                ->setParameter("radiusMeter", intval($parameters["radius"]) * 1000)
            ;
        } else {
            if(!empty($parameters["address"])) {
                $qb
                    ->andWhere("s.name LIKE :stationAddress")
                    ->setParameter("stationAddress", $parameters["address"])
                ;
            }

            if(!empty($parameters["city"])) {
                $qb
                    ->andWhere("s.city LIKE :stationCity")
                    ->setParameter("stationCity", $parameters["city"])
                ;
            }
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
            ->select("COUNT(s.id) as nbrStations")
        ;

        if(!empty($parameters["fuel"])) {
            $qb
                ->innerJoin("App\Entity\StationFuel", "sf", "sf.station = s.id")
                ->andWhere("sf.fuelKey LIKE :fuel")
                ->setParameter("fuel", $parameters["fuel"])
            ;
        }

        if($parameters["use_position"] === "true") {
            $qb
                ->andWhere("ST_DISTANCE_SPHERE(
                    POINT(s.longitude, s.latitude),
                    POINT(:longitude, :latitude)
                ) <= :radiusMeter")
                ->setParameter("longitude", $parameters["longitude"])
                ->setParameter("latitude", $parameters["latitude"])
                ->setParameter("radiusMeter", intval($parameters["radius"]) * 1000)
            ;
        } else {
            if(!empty($parameters["address"])) {
                $qb
                    ->andWhere("s.name LIKE :stationAddress")
                    ->setParameter("stationAddress", $parameters["address"])
                ;
            }

            if(!empty($parameters["city"])) {
                $qb
                    ->andWhere("s.city LIKE :stationCity")
                    ->setParameter("stationCity", $parameters["city"])
                ;
            }
        }

        return $qb
            ->getQuery()
            ->getSingleResult()["nbrStations"]
        ;
    }
}
