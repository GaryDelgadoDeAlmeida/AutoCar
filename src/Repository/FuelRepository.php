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
}
