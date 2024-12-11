<?php

namespace App\Repository;

use App\Entity\VehicleConsumption;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<VehicleConsumption>
 */
class VehicleConsumptionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, VehicleConsumption::class);
    }

    /**
     * @param VehicleConsumption
     * @param bool
     * @return void
     */
    public function save(VehicleConsumption $entity, bool $flush = false) {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * @param VehicleConsumption
     * @param bool
     * @return void
     */
    public function remove(VehicleConsumption $entity, bool $flush = false) {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }
}
