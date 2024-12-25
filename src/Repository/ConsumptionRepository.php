<?php

namespace App\Repository;

use App\Entity\Consumption;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Consumption>
 */
class ConsumptionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Consumption::class);
    }

    /**
     * @param Consumption entity
     * @param bool flush
     */
    public function save(Consumption $entity, bool $flush = false) : void {
        $this->getEntityManager()->persist($entity);

        if($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * @param Consumption entity to remove
     * @param bool flush change into database
     */
    public function remove(Consumption $entity, bool $flush = false) : void {
        $this->getEntityManager()->remove($entity);

        if($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * @param int offset
     * @param int limit
     * @return Consumption[]
     */
    public function getConsumptions(int $offset, int $limit) : array {
        return $this->createQueryBuilder("consumption")
            ->select("
                consumption.id,
                consumption.title,
                consumption.description,
                consumption.category
            ")
            ->orderBy("consumption.title", "ASC")
            ->setFirstResult(($offset - 1) * $limit)
            ->setMaxResults($limit)
            ->getQuery()
            ->getResult()
        ;
    }

    /**
     * @return int
     */
    public function countConsumptions() : int {
        return $this->createQueryBuilder("consumption")
            ->select("COUNT(consumption.id) as nbrConsumptions")
            ->getQuery()
            ->getSingleResult()["nbrConsumptions"]
        ;
    }
}
