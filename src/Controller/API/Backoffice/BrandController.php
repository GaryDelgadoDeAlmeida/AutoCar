<?php

namespace App\Controller\API\Backoffice;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class BrandController extends AbstractController
{
    #[Route('/a/p/i/backoffice/brand', name: 'app_a_p_i_backoffice_brand')]
    public function index(): Response
    {
        return $this->render('api/backoffice/brand/index.html.twig', [
            'controller_name' => 'BrandController',
        ]);
    }
}
