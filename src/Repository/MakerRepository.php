<?php

namespace App\Repository;

use App\Entity\Maker;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Maker>
 */
class MakerRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Maker::class);
    }

    /**
     * @param Maker entity
     * @param bool flush into database
     */
    public function save(Maker $entity, bool $flush = false) {
        $this->getEntityManager()->persist($entity);

        if($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * @param Maker entity
     * @param bool flush remove into database
     */
    public function remove(Maker $entity, bool $flush = false) {
        $this->getEntityManager()->remove($entity);

        if($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * @return int Return the number of makers stored in the dabase
     */
    public function countMakers() : int {
        return $this->createQueryBuilder("maker")
            ->select("COUNT(maker.id) as nbrMakers")
            ->getQuery()
            ->getSingleResult()["nbrMakers"]
        ;
    }
}
