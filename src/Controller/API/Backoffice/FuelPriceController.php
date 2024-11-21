<?php

namespace App\Controller\API\Backoffice;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/backoffice', name: 'api_backoffice_')]
class FuelPriceController extends AbstractController
{
    #[Route('/fuel/price', name: 'get_fuel_price')]
    public function index(): JsonResponse {
        return $this->json([], Response::HTTP_OK);
    }
}
