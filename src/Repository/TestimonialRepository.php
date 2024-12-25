<?php

namespace App\Repository;

use App\Entity\Testimonial;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Testimonial>
 */
class TestimonialRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Testimonial::class);
    }

    /**
     * @return int
     */
    public function countTestimonials() : int {
        return $this->createQueryBuilder("testimonial")
            ->select("COUNT(testimonial.id) as nbrTestimonials")
            ->getQuery()
            ->getSingleResult()["nbrTestimonials"]
        ;
    }
}
