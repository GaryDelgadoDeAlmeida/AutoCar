<?php

namespace App\Repository;

use App\Entity\Vehicle;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Vehicle>
 */
class VehicleRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Vehicle::class);
    }

    /**
     * @param Vehicle entity
     * @param bool flush
     */
    public function save(Vehicle $entity, bool $flush = false) {
        $this->getEntityManager()->persist($entity);

        if($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * @param Vehicle entity
     * @param bool flush
     */
    public function remove(Vehicle $entity, bool $flush = false) {
        $this->getEntityManager()->remove($entity);

        if($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * Summary of getVehicle
     * 
     * @param int $vehicleID
     * @return array
     */
    public function getVehicle(int $vehicleID) : array {
        return $this->createQueryBuilder("vehicle")
            ->select("
                vehicle.id,
                vehicle.photo,
                vehicle.basemodel,
                vehicle.name,
                vehicle.fuelTank,
                vehicle.vehiculeWeight,
                vehicle.maxSpeed,
                vehicle.averageFuelConsumption,
                vehicle.price,
                vehicle.buildAt,
                vehicle.updatedAt,
                vehicle.createdAt
            ")
            ->where("vehicle.id = :vehicleID")
            ->setParameter("vehicleID", $vehicleID)
            ->getQuery()
            ->getSingleResult()
        ;
    }

    /**
     * @param int offset
     * @param int limit
     * @return array Return an array of vehicle object or an empty array if found nothing
     */
    public function getVehicles(int $offset, int $limit) : array {
        return $this->createQueryBuilder("vehicle")
            ->select("
                vehicle.id,
                vehicle.photo,
                maker.name as maker_name,
                vehicle.basemodel,
                vehicle.name,
                vehicle.price,
                vehicle.buildAt,
                vehicle.createdAt
            ")
            ->innerJoin("vehicle.maker", "maker")
            ->orderBy("vehicle.buildAt", "DESC")
            ->setFirstResult(($offset - 1) * $limit)
            ->setMaxResults($limit)
            ->getQuery()
            ->getResult()
        ;
    }

    /**
     * Summary of getVehiclesForForm
     * 
     * @return array
     */
    public function getVehiclesForForm() : array {
        return $this->createQueryBuilder("vehicle")
            ->select("vehicle.id, vehicle.name, vehicle.buildAt")
            ->orderBy("vehicle.buildAt", "DESC")
            ->getQuery()
            ->getResult()
        ;
    }

    /**
     * @param int limit
     * @return array
     */
    public function getLatestVehicles(int $limit = 5) : array {
        return $this->createQueryBuilder("vehicle")
            ->select("
                vehicle.id,
                vehicle.photo,
                maker.name as maker_name,
                vehicle.basemodel,
                vehicle.name,
                vehicle.price,
                vehicle.buildAt,
                vehicle.createdAt
            ")
            ->innerJoin("vehicle.maker", "maker")
            ->orderBy("vehicle.buildAt", "DESC")
            ->setMaxResults($limit)
            ->getQuery()
            ->getResult()
        ;
    }

    /**
     * @param int maker id
     * @param int offset
     * @param int limit
     */
    public function getMakerVehicles(int $makerID, int $offset, int $limit) : array {
        return $this->createQueryBuilder("vehicle")
            ->select("
                vehicle.id,
                vehicle.photo,
                maker.name as maker_name,
                vehicle.basemodel,
                vehicle.name,
                vehicle.price,
                vehicle.buildAt,
                vehicle.createdAt
            ")
            ->innerJoin("vehicle.maker", "maker")
            ->where("vehicle.maker = :maker_id")
            ->orderBy("vehicle.buildAt", "DESC")
            ->setParameter("maker_id", $makerID)
            ->setFirstResult(($offset - 1) * $limit)
            ->setMaxResults($limit)
            ->getQuery()
            ->getResult()
        ;
    }

    /**
     * @return int
     */
    public function countVehicles() : int {
        return $this->createQueryBuilder("vehicle")
            ->select("COUNT(vehicle.id) as nbrVehicles")
            ->getQuery()
            ->getSingleResult()["nbrVehicles"]
        ;
    }

    /**
     * Count all vehicles associated to a maker
     * 
     * @param int $makerID
     * @return int
     */
    public function countMakerVehicles(int $makerID) : int {
        return $this->createQueryBuilder("vehicle")
            ->select("COUNT(vehicle.id) as nbrVehicles")
            ->where("vehicle.maker = :makerID")
            ->setParameter("makerID", $makerID)
            ->getQuery()
            ->getSingleResult()["nbrVehicles"]
        ;
    }
}
