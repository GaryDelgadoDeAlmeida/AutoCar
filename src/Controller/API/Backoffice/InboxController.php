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
        return $this->json([
            "message" => "Route under construction"
        ], Response::HTTP_OK);
    }

    #[Route('/inbox/{inboxID}', name: 'get_inbox', methods: ["GET"])]
    public function get_inbox(int $inboxID) : JsonResponse {
        return $this->json([
            "message" => "Route under construction"
        ], Response::HTTP_OK);
    }

    #[Route('/inboxs/remove', name: 'remove_inboxs', methods: ["DELETE"])]
    public function remove_inboxs(int $inboxID) : JsonResponse {
        return $this->json([
            "message" => "Route under construction"
        ], Response::HTTP_OK);
    }

    #[Route('/inbox/{inboxID}/remove', name: 'remove_inbox', methods: ["DELETE"])]
    public function remove_inbox(int $inboxID) : JsonResponse {
        return $this->json([
            "message" => "Route under construction"
        ], Response::HTTP_OK);
    }
}
