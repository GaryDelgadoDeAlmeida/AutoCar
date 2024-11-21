<?php

namespace App\Controller\API\Backoffice;

use App\Entity\User;
use App\Manager\SerializeManager;
use App\Manager\UserManager;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

#[Route('/api/backoffice', name: 'api_backoffice_')]
class ProfileController extends AbstractController
{
    private UserManager $userManager;
    private SerializeManager $serializeManager;
    private UserRepository $userRepository;

    function __construct(
        UserManager $userManager, 
        SerializeManager $serializeManager,
        UserRepository $userRepository
    ) {
        $this->userManager = $userManager;
        $this->serializeManager = $serializeManager;
        $this->userRepository = $userRepository;
    }

    #[Route('/profile', name: 'get_profile', methods: ["GET"])]
    public function get_profile(#[CurrentUser] User $user): JsonResponse {
        return $this->json(
            $this->serializeManager->serializeContent($user), 
            Response::HTTP_OK
        );
    }

    #[Route('/profile', name: 'update_profile', methods: ["UPDATE", "PUT"])]
    public function update_profile(#[CurrentUser] User $user, Request $request) : JsonResponse {
        $jsonContent = json_decode($request->getContent(), true);
        if(empty($jsonContent)) {
            return $this->json([
                "message" => "An error has been encountered with the sended body."
            ], Response::HTTP_PRECONDITION_FAILED);
        }

        try {
            $fields = $this->userManager->checkFields($jsonContent);
            if(empty($fields)) {
                throw new \Exception("An error has been encountered with the sended body.", Response::HTTP_PRECONDITION_FAILED);
            }

            $user = $this->userManager->fillUser($fields, $user);
            if(is_string($user)) {
                throw new \Exception($user);
            }

            $this->userRepository->save($user, true);
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], isset(Response::$statusTexts[$code]) && $code != Response::HTTP_OK ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json($user, Response::HTTP_OK);
    }
}
