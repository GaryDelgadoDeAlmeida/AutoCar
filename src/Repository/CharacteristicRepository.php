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
     * @param int characteristicID
     * @return Characteristic|null
     */
    public function getCharacteristic(int $characteristicID) : Characteristic|null {
        return $this->createQueryBuilder("characteristic")
            ->select("
                characteristic.id,
                characteristic.title,
                characteristic.description
            ")
            ->where("characteristic.id = :characteristicID")
            ->setParameter("characteristicID", $characteristicID)
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }

    /**
     * Summary of getCharacteristicFromDescription
     * @param string $description
     * @return \App\Entity\Characteristic|null
     */
    public function getCharacteristicFromDescription(string $description) : Characteristic|null {
        return $this->createQueryBuilder("characteristic")
            ->where("characteristic.description LIKE :description")
            ->setParameter("description", "{$description}%")
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }

    /**
     * @param int offset
     * @param int limit
     * @return Characteristic[]
     */
    public function getCharacteristics(int $offset, int $limit) : array {
        return $this->createQueryBuilder("characteristic")
            ->select("
                characteristic.id,
                characteristic.title,
                characteristic.description
            ")
            ->orderBy("characteristic.title", "ASC")
            ->setFirstResult(($offset - 1) * $limit)
            ->setMaxResults($limit)
            ->getQuery()
            ->getResult()
        ;
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
