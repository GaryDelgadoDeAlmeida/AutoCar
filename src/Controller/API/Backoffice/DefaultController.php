<?php

namespace App\Controller\API\Backoffice;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/backoffice', name: 'api_backoffice_default')]
class DefaultController extends AbstractController
{
    private Security $security;

    function __cosntruct(Security $security) {
        $this->security = $security;
    }

    #[Route('/home', name: 'get_home', methods: ["GET"])]
    public function index(): JsonResponse {
        $user = $this->security->getUser();

        return $this->json([
            "message" => "Route under construction"
        ], Response::HTTP_OK);
    }
}
