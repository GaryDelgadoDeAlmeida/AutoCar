<?php

namespace App\Repository;

use App\Entity\Newsletter;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Newsletter>
 */
class NewsletterRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Newsletter::class);
    }

    /**
     * @param Newsletter entity
     * @param bool flush into database
     */
    public function save(Newsletter $entity, bool $flush = false) {
        $this->getEntityManager()->persist($entity);

        if($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * @param Newsletter entity
     * @param bool flush remove into database
     */
    public function remove(Newsletter $entity, bool $flush = false) {
        $this->getEntityManager()->remove($entity);

        if($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * @return int
     */
    public function countNewsletters() : int {
        return $this->createQueryBuilder("newsletter")
            ->select("COUNT(newsletter.id) as nbrNewsletter")
            ->getQuery()
            ->getSingleResult()["nbrNewsletter"]
        ;
    }
}
