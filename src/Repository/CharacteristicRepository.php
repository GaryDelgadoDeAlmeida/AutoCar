<?php

namespace App\Repository;

use App\Entity\Characteristic;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Characteristic>
 */
class CharacteristicRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Characteristic::class);
    }

    /**
     * @param Characteristic entity
     * @param bool flush
     */
    public function save(Characteristic $entity, bool $flush = false) : void {
        $this->getEntityManager()->persist($entity);

        if($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * @param Characteristic entity to remove
     * @param bool flush change into database
     */
    public function remove(Characteristic $entity, bool $flush = false) : void {
        $this->getEntityManager()->remove($entity);

        if($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * @return int
     */
    public function countCharacteristics() : int {
        return $this->createQueryBuilder("characteristic")
            ->select("COUNt(characteristic.id) as nbrCharacteristic")
            ->getQuery()
            ->getSingleResult()["nbrCharacteristic"]
        ;
    }
}
