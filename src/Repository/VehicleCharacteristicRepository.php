<?php

namespace App\Repository;

use App\Entity\VehicleCharacteristic;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<VehicleCharacteristic>
 */
class VehicleCharacteristicRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, VehicleCharacteristic::class);
    }

    
    /**
     * @param VehicleCharacteristic
     * @param bool
     * @return void
     */
    public function save(VehicleCharacteristic $entity, bool $flush = false) {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * @param VehicleCharacteristic
     * @param bool
     * @return void
     */
    public function remove(VehicleCharacteristic $entity, bool $flush = false) {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }
}
