<?php

namespace App\Repository;

use App\Entity\Inbox;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Inbox>
 */
class InboxRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Inbox::class);
    }

    /**
     * @param Inbox entity
     * @param bool flush
     */
    public function save(Inbox $entity, bool $flush = false) : void {
        $this->getEntityManager()->persist($entity);

        if($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * @param Inbox entity to remove
     * @param bool flush change into database
     */
    public function remove(Inbox $entity, bool $flush = false) : void {
        $this->getEntityManager()->remove($entity);

        if($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * Count all received message from this website
     * 
     * @return int
     */
    public function countInboxs(): int{
        return $this->createQueryBuilder("inbox")
            ->select("COUNT(inbox.id) as nbrInboxs")
            ->getQuery()
            ->getSingleResult()["nbrInboxs"]
        ;
    }
}
