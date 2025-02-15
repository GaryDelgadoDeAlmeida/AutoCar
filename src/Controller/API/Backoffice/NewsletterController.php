<?php

namespace App\Controller\API\Backoffice;

use App\Repository\NewsletterRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api/backoffice', name: 'api_backoffice_')]
class NewsletterController extends AbstractController
{
    private NewsletterRepository $newsletterRepository;

    function __construct(NewsletterRepository $newsletterRepository) {
        $this->newsletterRepository = $newsletterRepository;
    }
    
    #[Route('/newsletters', name: 'get_newsletters', methods: ["GET"])]
    public function get_newsletters(Request $request): JsonResponse {
        $limit = 20;
        $offset = is_numeric($request->get("offset")) && intval($request->get("offset")) == $request->get("offset") && $request->get("offset") > 1 ? intval($request->get("offset")) : 1;

        return $this->json([
            "offset" => $offset,
            "maxOffset" => ceil($this->newsletterRepository->countNewsletters() / $limit),
            "results" => $this->newsletterRepository->findBy([], ["email" => "ASC"], $limit, ($offset - 1) * $limit)
        ], Response::HTTP_OK);
    }

    #[Route('/newsletter/{newsletterID}/remove', name: 'remove_newsletter', methods: ["DELETE"])]
    public function remove_newsletter(int $newsletterID) : JsonResponse {
        $newsletter = $this->newsletterRepository->find($newsletterID);
        if(empty($newsletter)) {
            return $this->json([
                "message" => "The subscribed client couldn't be found"
            ], Response::HTTP_NOT_FOUND);
        }
        try {
            $this->newsletterRepository->remove($newsletter, true);
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], isset(Response::$statusTexts[$code]) && $code != Response::HTTP_OK ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        return $this->json(null, Response::HTTP_NO_CONTENT);
    }
}
