<?php

namespace App\Controller\API\Backoffice;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class VehicleController extends AbstractController
{
    #[Route('/a/p/i/backoffice/vehicle', name: 'app_a_p_i_backoffice_vehicle')]
    public function index(): Response
    {
        return $this->render('api/backoffice/vehicle/index.html.twig', [
            'controller_name' => 'VehicleController',
        ]);
    }
}
