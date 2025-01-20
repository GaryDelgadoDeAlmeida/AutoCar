<?php

namespace App\Controller\API\Backoffice;

use App\Repository\TestimonialRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api/backoffice', name: 'api_backoffice_')]
class TestimonialController extends AbstractController
{
    private TestimonialRepository $testimonialRepository;
    function __construct(TestimonialRepository $testimonialRepository) {
        $this->testimonialRepository = $testimonialRepository;
    }
    
    #[Route('/testimonial', name: 'post_testimonial', methods: ["POST"])]
    public function post_testimonial(Request $request): JsonResponse {
        return $this->json([]);
    }
    
    #[Route('/testimonial/{testimonialID}/remove', name: 'remove_testimonial', methods: ["DELETE"])]
    public function remove_testimonial(Request $request): JsonResponse {
        return $this->json([]);
    }
}
