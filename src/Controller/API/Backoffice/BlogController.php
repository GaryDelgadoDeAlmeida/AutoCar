<?php

namespace App\Controller\API\Backoffice;

use App\Enum\ArticleEnum;
use App\Manager\ArticleManager;
use App\Manager\FileManager;
use App\Manager\SerializeManager;
use App\Repository\BlogRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/backoffice', name: 'api_backoffice_')]
class BlogController extends AbstractController
{
    private FileManager $fileManager;
    private ArticleManager $articleManager;
    private SerializeManager $serializeManager;
    private BlogRepository $blogRepository;

    function __construct(
        FileManager $fileManager,
        ArticleManager $articleManager,
        SerializeManager $serializeManager, 
        BlogRepository $blogRepository
    ) {
        $this->fileManager = $fileManager;
        $this->articleManager = $articleManager;
        $this->serializeManager = $serializeManager;
        $this->blogRepository = $blogRepository;
    }

    #[Route('/blog', name: 'post_blog', methods: ["POST"])]
    public function post_blog(Request $request): JsonResponse {
        $jsonContent = json_decode($request->getContent(), true);
        if(empty($jsonContent)) {
            return $this->json([
                "message" => "An error has been encountered with the sended body."
            ], Response::HTTP_PRECONDITION_FAILED);
        }

        try {
            $fields = $this->articleManager->checkFields($jsonContent);
            if(empty($fields)) {
                throw new \Exception("An error has been encountered with the sended body.", Response::HTTP_PRECONDITION_FAILED);
            }

            $article = $this->articleManager->fillArticle($fields);
            if(is_string($article)) {
                throw new \Exception($article);
            }

            $this->blogRepository->save($article, true);
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], isset(Response::$statusTexts[$code]) && $code !== Response::HTTP_OK ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(
            $this->serializeManager->serializeContent($article), 
            Response::HTTP_CREATED
        );
    }

    #[Route('/blog/{blogID}/update', name: 'update_blog', methods: ["UPDATE", "PUT"])]
    public function update_blog(int $blogID, Request $request) : JsonResponse {
        $blog = $this->blogRepository->find($blogID);
        if(empty($blog)) {
            return $this->json([
                "message" => "Not found article"
            ], Response::HTTP_NOT_FOUND);
        }

        $jsonContent = json_decode($request->getContent(), true);
        if(empty($jsonContent)) {
            return $this->json([
                "message" => "An error has been encountered with the sended body."
            ], Response::HTTP_PRECONDITION_FAILED);
        }

        try {
            $fields = $this->articleManager->checkFields($jsonContent);
            if(empty($fields)) {
                throw new \Exception("An error has been encountered with the sended body.", Response::HTTP_PRECONDITION_FAILED);
            }

            $response = $this->articleManager->fillArticle($fields, $blog);
            if(is_string($response)) {
                throw new \Exception($response);
            }

            $this->blogRepository->save($response, true);
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], isset(Response::$statusTexts[$code]) && $code !== Response::HTTP_OK ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(
            $this->serializeManager->serializeContent($blog), 
            Response::HTTP_ACCEPTED
        );
    }

    #[Route('/blog/{blogID}/photo/update', name: 'update_blog_img', methods: ["UPDATE", "PUT"])]
    public function update_blog_img(int $blogID, Request $request) : JsonResponse {
        $blog = $this->blogRepository->find($blogID);
        if(empty($blog)) {
            return $this->json([
                "message" => "Not found article"
            ], Response::HTTP_NOT_FOUND);
        }

        try {
            $fields = $this->articleManager->checkFields([ArticleEnum::ARTICLE_PHOTO => $photo = $request->files->get("photo")]);
            if(empty($fields)) {
                throw new \Exception("An error has been encountered with the sended body.", Response::HTTP_PRECONDITION_FAILED);
            }

            $response = $this->articleManager->fillArticle($fields, $blog);
            if(is_string($response)) {
                throw new \Exception($response);
            }

            $this->blogRepository->save($response, true);
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], isset(Response::$statusTexts[$code]) && $code !== Response::HTTP_OK ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(
            $this->serializeManager->serializeContent($blog), 
            Response::HTTP_ACCEPTED
        );
    }

    #[Route('/blog/{blogID}/remove', name: 'remove_blog', methods: ["DELETE"])]
    public function remove_blog(int $blogID, Request $request) : JsonResponse {
        $blog = $this->blogRepository->find($blogID);
        if(empty($blog)) {
            return $this->json([
                "message" => "Not found article"
            ], Response::HTTP_NOT_FOUND);
        }

        try {
            // Remove img
            if(!empty($blog->getPhoto())) {
                $this->fileManager->removeFile($blog->getPhoto());
            }

            // Remove article object
            $this->blogRepository->remove($blog, true);
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], isset(Response::$statusTexts[$code]) && $code !== Response::HTTP_OK ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(null, Response::HTTP_NO_CONTENT);
    }
}
