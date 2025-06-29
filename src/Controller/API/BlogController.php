<?php

namespace App\Controller\API;

use App\Repository\BlogRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api', name: 'api_')]
class BlogController extends AbstractController
{
    private BlogRepository $blogRepository;

    function __construct(BlogRepository $blogRepository) {
        $this->blogRepository = $blogRepository;
    }

    #[Route('/blogs', name: 'get_blogs', methods: ["GET"])]
    public function get_blogs(Request $request): JsonResponse {
        $limit = is_numeric($request->get("limit")) && intval($request->get("limit")) == $request->get("limit") && $request->get("limit") > 1 ? intval($request->get("limit")) : 12;
        $offset = is_numeric($request->get("offset")) && intval($request->get("offset")) == $request->get("offset") && $request->get("offset") > 1 ? intval($request->get("offset")) : 1;
        $blogs = $this->blogRepository->findBy([], ["createdAt" => "DESC"], $limit, ($offset - 1) * $limit);

        return $this->json([
            "offset" => $offset,
            "maxOffset" => ceil($this->blogRepository->countArticles() / $limit),
            "results" => $blogs
        ], Response::HTTP_OK);
    }

    #[Route('/blog/{blogID}', requirements: ["blogID" => "\d+"], name: 'get_blog', methods: ["GET"])]
    public function get_blog(int $blogID) : JsonResponse {
        $blog = $this->blogRepository->find($blogID);
        if(empty($blog)) {
            return $this->json([
                "message" => "Not found article"
            ], Response::HTTP_NOT_FOUND);
        }
        
        return $this->json(
            [
                "article" => $blog,
                "recent_articles" => $this->blogRepository->getRecentArticles($blogID)
            ], 
            Response::HTTP_OK
        );
    }

    #[Route('/blog/{blogID}/comments', requirements: ["blogID" => "\d+"], name: 'get_blog_comments', methods: ["GET"])]
    public function get_blog_comments(int $blogID) : JsonResponse {
        $comments = [];
        
        return $this->json([
            "results" => $comments
        ], Response::HTTP_OK);
    }
}
