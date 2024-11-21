<?php

namespace App\Controller\API;

use App\Manager\InboxManager;
use App\Repository\InboxRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api', name: 'api_')]
class InboxController extends AbstractController
{
    private InboxManager $inboxManager;
    private InboxRepository $inboxRepository;

    function __construct(InboxManager $inboxManager, InboxRepository $inboxRepository) {
        $this->inboxManager = $inboxManager;
        $this->inboxRepository = $inboxRepository;
    }

    #[Route('/inbox', name: 'post_inbox', methods: ["POST"])]
    public function post_inbox(Request $request): JsonResponse {
        $jsonContent = json_decode($request->getContent(), true);
        if(empty($jsonContent)) {
            return $this->json([
                "message" => "An error has been encountered with the sended body"
            ], Response::HTTP_PRECONDITION_FAILED);
        }

        try {
            $fields = $this->inboxManager->checkFields($jsonContent);
            if(empty($fields)) {
                throw new \Exception("An error has been encountered with the sended body", Response::HTTP_PRECONDITION_FAILED);
            }

            $inbox = $this->inboxManager->fillInbox($fields);
            if(is_string($inbox)) {
                throw new \Exception($inbox);
            }

            $this->inboxRepository->save($inbox, true);
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], isset(Response::$statusTexts[$code]) && $code !== Response::HTTP_OK ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json($inbox, Response::HTTP_CREATED);
    }
}
