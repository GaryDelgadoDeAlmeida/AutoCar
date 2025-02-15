<?php

namespace App\Controller\API\Backoffice;

use App\Enum\TestimonialEnum;
use App\Manager\FileManager;
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
    private FileManager $fileManager;
    private TestimonialManager $testimonialManager;
    private TestimonialRepository $testimonialRepository;

    function __construct(
        FileManager $fileManager,
        TestimonialManager $testimonialManager,
        TestimonialRepository $testimonialRepository
    ) {
        $this->fileManager = $fileManager;
        $this->testimonialManager = $testimonialManager;
        $this->testimonialRepository = $testimonialRepository;
    }
    
    #[Route('/testimonial', name: 'post_testimonial', methods: ["POST"])]
    public function post_testimonial(Request $request): JsonResponse {
        $jsonContent = json_decode($request->getContent(), true);
        if(empty($jsonContent)) {
            return $this->json([
                "message" => "An error has been encountered with the sended body"
            ], Response::HTTP_PRECONDITION_FAILED);
        }

        try {
            $fields = $this->testimonialManager->checkFields($jsonContent);
            if(empty($fields)) {
                throw new \Exception("An error has been encountered with the sended body", Response::HTTP_PRECONDITION_FAILED);
            }

            $testimonial = $this->testimonialManager->fillTestimonial($fields);
            if(is_string($testimonial)) {
                throw new \Exception($testimonial);
            }

            $this->testimonialRepository->save($testimonial, true);
        } catch(\Exception $e) {
            $code = $e->getCode();
            
            return $this->json([
                "message" => $e->getMessage()
            ], isset(Response::$statusTexts[$code]) && $code !== 200 ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json($testimonial, Response::HTTP_CREATED);
    }

    #[Route('/testimonial/{testimonialID}', name: 'get_testimonial', methods: ["GET"])]
    public function get_testimonial(int $testimonialID) : JsonResponse {
        return $this->json([], Response::HTTP_OK);
    }
    
    #[Route('/testimonial/{:testimonialID}/update', name: 'update_testimonial', methods: ["UPDATE", "PUT"])]
    public function update_testimonial(int $testimonialID, Request $request): JsonResponse {
        return $this->json([], Response::HTTP_ACCEPTED);
    }
    
    #[Route('/testimonial/{testimonialID}/photo/update', name: 'post_testimonial_photo', methods: ["POST"])]
    public function post_testimonial_photo(int $testimonialID, Request $request): JsonResponse {
        $testimonial = $this->testimonialRepository->find($testimonialID);
        if(empty($testimonial)) {
            return $this->json([
                "message" => "The testimonial couldn't be found"
            ], Response::HTTP_NOT_FOUND);
        }

        $photo = $request->files->get("photo", null);
        if(empty($photo)) {
            return $this->json([
                "message" => "An error has been encountered with the sended body"
            ], Response::HTTP_PRECONDITION_FAILED);
        }

        try {
            $fields = $this->testimonialManager->checkFields([
                TestimonialEnum::TESTIMONIAL_PHOTO => $photo,
            ]);
            if(empty($fields)) {
                throw new \Exception("An error has been encountered with the sended body", Response::HTTP_PRECONDITION_FAILED);
            }

            // Save files in testimonial repository
            $fields[TestimonialEnum::TESTIMONIAL_PHOTO] = "/content/img/testimonials/" . $this->fileManager->uploadFile($fields[TestimonialEnum::TESTIMONIAL_PHOTO], $this->getParameter("testimonials_img_directory"), "{$testimonial->getId()} - {$testimonial->getFistname()} {{$testimonial->getLastname()}}");

            // Update testimonial object
            $testimonial = $this->testimonialManager->fillTestimonial($fields, $testimonial);
            if(is_string($testimonial)) {
                throw new \Exception($testimonial, Response::HTTP_INTERNAL_SERVER_ERROR);
            }

            // Save changes into database
            $this->testimonialRepository->save($testimonial, true);
        } catch(\Exception $e) {
            $code = $e->getCode();
            
            return $this->json([
                "message" => $e->getMessage()
            ], isset(Response::$statusTexts[$code]) && $code !== 200 ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json([], Response::HTTP_CREATED);
    }
    
    #[Route('/testimonial/{testimonialID}/remove', name: 'remove_testimonial', methods: ["DELETE"])]
    public function remove_testimonial(int $testimonialID): JsonResponse {
        $testimonial = $this->testimonialRepository->find($testimonialID);
        if(empty($testimonial)) {
            return $this->json([
                "message" => "The testimonial couldn't be found"
            ], Response::HTTP_NOT_FOUND);
        }

        try {
            // Remove the testimonial image
            if(!empty($testimonial->getPath())) {
                $this->fileManager->removeFile($testimonial->getPath());
            }

            // Remove the testimonial object
            $this->testimonialRepository->remove($testimonial, true);
        } catch(\Exception $e) {
            $code = $e->getCode();
            
            return $this->json([
                "message" => $e->getMessage()
            ], isset(Response::$statusTexts[$code]) && $code !== 200 ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(null, Response::HTTP_NO_CONTENT);
    }
}
