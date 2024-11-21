<?php

namespace App\Controller\API\Backoffice;

use App\Repository\InboxRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/backoffice', name: 'api_backoffice_')]
class InboxController extends AbstractController
{
    private InboxRepository $inboxRepository;

    function __construct(InboxRepository $inboxRepository) {
        $this->inboxRepository = $inboxRepository;
    }

    #[Route('/inboxs', name: 'get_inboxs')]
    public function get_inboxs(Request $request): JsonResponse {
        $limit = 10;
        $offset = is_numeric($request->get("offset")) && intval($request->get("offset")) == $request->get("offset") && $request->get("offset") > 1 ? intval($request->get("offset")) : 1;

        return $this->json([
            "offset" => $offset,
            "maxOffset" => ceil($this->inboxRepository->countInboxs() / $limit),
            "results" => $this->inboxRepository->findBy([], ["createdAt" => "DESC"], $limit, ($offset - 1) * $limit)
        ], Response::HTTP_OK);
    }

    #[Route('/inbox/{inboxID}', name: 'get_inbox', methods: ["GET"])]
    public function get_inbox(int $inboxID) : JsonResponse {
        $inbox = $this->inboxRepository->find($inboxID);
        if(empty($inbox)) {
            return $this->json([
                "message" => "The message couldn't be found"
            ], Response::HTTP_NOT_FOUND);
        }

        return $this->json($inbox, Response::HTTP_OK);
    }

    #[Route('/inboxs/remove', name: 'remove_inboxs', methods: ["DELETE"])]
    public function remove_inboxs() : JsonResponse {
        $inboxs = $this->inboxRepository->findAll();
        if(empty($inboxs)) {
            return $this->json(null, Response::HTTP_OK);
        }

        try {
            foreach($inboxs as $inbox) {
                $this->inboxRepository->remove($inbox, true);
            }
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], isset(Response::$statusTexts[$code]) && $code !== Response::HTTP_OK ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(null, Response::HTTP_NO_CONTENT);
    }

    #[Route('/inbox/{inboxID}/remove', name: 'remove_inbox', methods: ["DELETE"])]
    public function remove_inbox(int $inboxID) : JsonResponse {
        $inbox = $this->inboxRepository->find($inboxID);
        if(empty($inbox)) {
            return $this->json(null, Response::HTTP_OK);
        }

        try {
            $this->inboxRepository->remove($inbox, true);
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], isset(Response::$statusTexts[$code]) && $code !== Response::HTTP_OK ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(null, Response::HTTP_NO_CONTENT);
    }
}
