<?php

namespace App\Repository;

use App\Entity\StationFuel;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<StationFuel>
 */
class StationFuelRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, StationFuel::class);
    }

    /**
     * @param StationFuel entity
     * @param bool flush into database
     */
    public function save(StationFuel $entity, bool $flush = false) {
        $this->getEntityManager()->persist($entity);

        if($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * @param StationFuel entity
     * @param bool flush remove into database
     */
    public function remove(StationFuel $entity, bool $flush = false) {
        $this->getEntityManager()->remove($entity);

        if($flush) {
            $this->getEntityManager()->flush();
        }
    }
}
