<?php

namespace App\Repository;

use App\Entity\FuelPriceHistory;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<FuelPriceHistory>
 */
class FuelPriceHistoryRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, FuelPriceHistory::class);
    }

    /**
     * @param FuelPriceHistory entity
     * @param bool flush
     */
    public function save(FuelPriceHistory $entity, bool $flush = false) : void {
        $this->getEntityManager()->persist($entity);

        if($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * @param FuelPriceHistory entity to remove
     * @param bool flush change into database
     */
    public function remove(FuelPriceHistory $entity, bool $flush = false) : void {
        $this->getEntityManager()->remove($entity);

        if($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * 
     */
    public function countHistories() {
        return $this->createQueryBuilder("history")
            ->select("COUNT(id) as nbrHistories")
            ->getQuery()
            ->getSingleResult()["nbrHistories"]
        ;
    }

    /**
     * @param int fuel id
     * @return int
     */
    public function countFuelHistories(int $fuelID) {
        return $this->createQueryBuilder("history")
            ->select("COUNT(id) as nbrHistories")
            ->leftJoin("history.fuel", "fuel")
            ->where("fuel.id = :fuelID")
            ->setParameter("fuelID", $fuelID)
            ->getQuery()
            ->getSingleResult()["nbrHistories"]
        ;
    }
}
