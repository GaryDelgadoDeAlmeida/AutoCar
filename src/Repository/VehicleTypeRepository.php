<?php

namespace App\Repository;

use App\Entity\VehicleType;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<VehicleType>
 */
class VehicleTypeRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, VehicleType::class);
    }

    public function countTypes() : int {
        return $this->createQueryBuilder("vehicle_type")
            ->select("COUNT(vehicle_type.id) as nbrTypes")
            ->getQuery()
            ->getSingleResult()["nbrTypes"]
        ;
    }
}