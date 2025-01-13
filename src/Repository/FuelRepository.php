<?php

namespace App\Repository;

use App\Entity\Fuel;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Fuel>
 */
class FuelRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Fuel::class);
    }

    /**
     * @param Fuel
     * @param bool
     * @return void
     */
    public function save(Fuel $entity, bool $flush = false) {
        $this->getEntityManager()->persist($entity);

        if($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * @param Fuel
     * @param bool
     * @return void
     */
    public function remove(Fuel $entity, bool $flush = false) {
        $this->getEntityManager()->remove($entity);

        if($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * @return Fuel[]
     */
    public function getFuels() : array {
        return $this->createQueryBuilder("fuel")
            ->select("
                fuel.id,
                fuel.title,
                fuel.fuelKey,
                fuel.price
            ")
            ->getQuery()
            ->getResult()
        ;
    }

    public function getFuel(int $fuelID) {
        return $this->createQueryBuilder("fuel")
            ->select("
                fuel.id,
                fuel.title,
                fuel.fuelKey,
                fuel.price
            ")
            ->where("fuel.id = :fuelID")
            ->setParameter("fuelID", $fuelID)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }

    /**
     * @param int vehicleID
     * @return Fuel[]
     */
    public function getVehicleFuels(int $vehicleID) : array {
        return $this->createQueryBuilder("fuel")
            ->select("
                fuel.id,
                fuel.title,
                fuel.fuelKey,
                fuel.price
            ")
            ->innerJoin("fuel.vehicles", "vehicle")
            ->where("vehicle.id = :vehicleID")
            ->setParameter("vehicleID", $vehicleID)
            ->getQuery()
            ->getResult()
        ;
    }

    /**
     * @return int
     */
    public function countFuels() : int {
        return $this->createQueryBuilder("fuel")
            ->select("COUNT(fuel.id) as nbrFuels")
            ->getQuery()
            ->getSingleResult()["nbrFuels"]
        ;
    }
}
