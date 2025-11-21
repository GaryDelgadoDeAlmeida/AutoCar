<?php

namespace App\Controller\API;

use App\Manager\NewsletterManager;
use App\Repository\NewsletterRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api', name: 'api_')]
class NewsletterController extends AbstractController
{
    private NewsletterManager $newsletterManager;
    private NewsletterRepository $newsletterRepository;

    function __construct(
        NewsletterManager $newsletterManager,
        NewsletterRepository $newsletterRepository
    ) {
        $this->newsletterManager = $newsletterManager;
        $this->newsletterRepository = $newsletterRepository;
    }

    #[Route('/newsletter', name: 'post_newsletter', methods: ["POST"])]
    public function post_newsletter(Request $request): JsonResponse {
        $jsonContent = json_decode($request->getContent(), true);
        if(empty($jsonContent)) {
            return $this->json([
                "message" => "An error has been encountered with the sended body"
            ], Response::HTTP_PRECONDITION_FAILED);
        }

        try {
            $fields = $this->newsletterManager->checkFields($jsonContent);
            if(empty($fields)) {
                throw new \Exception("An error has been encountered with the sended body", Response::HTTP_PRECONDITION_FAILED);
            }

            $newsletter = $this->newsletterManager->fillNewsletter($fields);
            if(is_string($newsletter)) {
                throw new \Exception($newsletter);
            }

            $this->newsletterRepository->save($newsletter, true);
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], isset(Response::$statusTexts[$code]) && $code !== Response::HTTP_OK ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(
            $newsletter, 
            Response::HTTP_CREATED
        );
    }
}
