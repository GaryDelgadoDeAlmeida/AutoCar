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
     * @return int
     */
    public function countVehicles() : int {
        return $this->createQueryBuilder("vehicle")
            ->select("COUNT(vehicle.id) as nbrVehicles")
            ->getQuery()
            ->getSingleResult()["nbrVehicles"]
        ;
    }
}
