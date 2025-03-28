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
     * Get the maker of a vehicle
     * 
     * @param int $vehicleID
     * @return array
     */
    public function getVehicleMaker(int $vehicleID) : array {
        return $this->createQueryBuilder("maker")
            ->select("
                maker.id, 
                maker.logo, 
                maker.name, 
                maker.description
            ")
            ->innerJoin("maker.vehicles", "vehicle")
            ->where("vehicle.id = :vehicleID")
            ->orderBy("maker.name", "ASC")
            ->setParameter("vehicleID", $vehicleID)
            ->getQuery()
            ->getSingleResult()
        ;
    }

    /**
     * @param int offset
     * @param int limit
     * @return Maker[]|array
     */
    public function getMakers(int $offset, int $limit) : array {
        return $this->createQueryBuilder("maker")
            ->select("
                maker.id, 
                maker.logo, 
                maker.name, 
                maker.description,
                (SELECT COUNT(vehicle.id) FROM \App\Entity\Vehicle as vehicle WHERE vehicle.maker = maker.id) as nbrVehicles
            ")
            ->orderBy("maker.name", "ASC")
            ->setFirstResult(($offset - 1) * $limit)
            ->setMaxResults($limit)
            ->getQuery()
            ->getResult()
        ;
    }

    /**
     * Summary of getMakersForForms
     * 
     * @return mixed
     */
    public function getMakersForForms() {
        return $this->createQueryBuilder("maker")
            ->select("
                maker.id, 
                maker.name
            ")
            ->orderBy("maker.name", "ASC")
            ->getQuery()
            ->getResult()
        ;
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
