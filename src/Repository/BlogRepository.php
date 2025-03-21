<?php

namespace App\Repository;

use App\Entity\Blog;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Blog>
 */
class BlogRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Blog::class);
    }

    /**
     * @param Blog entity
     * @param bool flush
     */
    public function save(Blog $entity, bool $flush = false) {
        $this->getEntityManager()->persist($entity);

        if($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * @param Blog entity
     * @param bool flush
     */
    public function remove(Blog $entity, bool $flush = false) {
        $this->getEntityManager()->remove($entity);

        if($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * Summary of getRecentArticles
     * 
     * @param mixed $blogID
     * @return void
     */
    public function getRecentArticles(?int $blogID = null) {
        $query = $this->createQueryBuilder("article");

        if(!empty($blogID)) {
            $query
                ->where("article.id != :blogID")
                ->setParameter("blogID", $blogID)
            ;
        }

        return $query
            ->orderBy("article.id", "DESC")
            ->setMaxResults(3)
            ->getQuery()
            ->getResult()
        ;
    }

    /**
     * Summary of countArticles
     * @return int
     */
    public function countArticles() : int {
        return $this->createQueryBuilder("article")
            ->select("COUNT(article.id) as nbrArticlde")
            ->getQuery()
            ->getSingleResult()["nbrArticlde"]
        ;
    }
}
