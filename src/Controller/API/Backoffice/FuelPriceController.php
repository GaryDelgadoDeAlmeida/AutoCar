<?php

namespace App\Controller\API\Backoffice;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/backoffice', name: 'api_backoffice_')]
class FuelPriceController extends AbstractController
{
    #[Route('/fuel/price', name: 'get_fuel_price')]
    public function index(): Response
    {
        return $this->render('api/backoffice/fuel_price/index.html.twig', [
            'controller_name' => 'FuelPriceController',
        ]);
    }
}
