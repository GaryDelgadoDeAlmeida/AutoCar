<?php

namespace App\Controller\API\Backoffice;

use App\Manager\TestimonialManager;
use App\Repository\TestimonialRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api/backoffice', name: 'api_backoffice_')]
class TestimonialController extends AbstractController
{
    private TestimonialManager $testimonialManager;
    private TestimonialRepository $testimonialRepository;
    function __construct(
        TestimonialManager $testimonialManager,
        TestimonialRepository $testimonialRepository
    ) {
        $this->testimonialRepository = $testimonialRepository;
        $this->testimonialManager = $testimonialManager;
    }
    
    #[Route('/testimonial', name: 'post_testimonial', methods: ["POST"])]
    public function post_testimonial(Request $request): JsonResponse {
        return $this->json([], Response::HTTP_CREATED);
    }
    
    #[Route('/testimonial/{testimonialID}/update', name: 'update_testimonial', methods: ["UPDATE", "PUT"])]
    public function update_testimonial(int $testimonialID, Request $request): JsonResponse {
        return $this->json([], Response::HTTP_ACCEPTED);
    }
    
    #[Route('/testimonial/{testimonialID}/photo/update', name: 'post_testimonial_photo', methods: ["POST"])]
    public function post_testimonial_photo(int $testimonialID, Request $request): JsonResponse {
        return $this->json([], Response::HTTP_CREATED);
    }
    
    #[Route('/testimonial/{testimonialID}/remove', name: 'remove_testimonial', methods: ["DELETE"])]
    public function remove_testimonial(int $testimonialID): JsonResponse {
        return $this->json([], Response::HTTP_NO_CONTENT);
    }
}
