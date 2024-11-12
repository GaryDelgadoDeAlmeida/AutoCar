<?php

namespace App\Entity;

use App\Repository\VehiculeRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: VehiculeRepository::class)]
class Vehicule
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $basemodel = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\ManyToOne(inversedBy: 'vehicules')]
    private ?VehiculeMotor $vehiculeMotor = null;

    // Fuel tank capacity (? L)
    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 2, nullable: true)]
    private ?string $fuelTank = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 2, nullable: true)]
    private ?string $vehiculeWeight = null;

    // On km/h
    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 2, nullable: true)]
    private ?string $maxSpeed = null;

    // average fuel consumption on 100km (100km => ? L)
    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 2, nullable: true)]
    private ?string $averageFuelConsumption = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 4)]
    private ?string $price = null;

    #[ORM\ManyToOne(inversedBy: 'vehicules')]
    private ?Fuel $fuel = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $buildAt = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $updatedAt = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getBasemodel(): ?string
    {
        return $this->basemodel;
    }

    public function setBasemodel(string $basemodel): static
    {
        $this->basemodel = $basemodel;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getVehiculeMotor(): ?VehiculeMotor
    {
        return $this->vehiculeMotor;
    }

    public function setVehiculeMotor(?VehiculeMotor $vehiculeMotor): static
    {
        $this->vehiculeMotor = $vehiculeMotor;

        return $this;
    }
    

    public function getFuelTank(): ?string
    {
        return $this->fuelTank;
    }

    public function setFuelTank(?string $fuelTank): static
    {
        $this->fuelTank = $fuelTank;

        return $this;
    }

    public function getVehiculeWeight(): ?string
    {
        return $this->vehiculeWeight;
    }

    public function setVehiculeWeight(?string $vehiculeWeight): static
    {
        $this->vehiculeWeight = $vehiculeWeight;

        return $this;
    }

    public function getMaxSpeed(): ?string
    {
        return $this->maxSpeed;
    }

    public function setMaxSpeed(?string $maxSpeed): static
    {
        $this->maxSpeed = $maxSpeed;

        return $this;
    }

    public function getAverageFuelConsumption(): ?string
    {
        return $this->averageFuelConsumption;
    }

    public function setAverageFuelConsumption(?string $averageFuelConsumption): static
    {
        $this->averageFuelConsumption = $averageFuelConsumption;

        return $this;
    }

    public function getPrice(): ?string
    {
        return $this->price;
    }

    public function setPrice(string $price): static
    {
        $this->price = $price;

        return $this;
    }

    public function getFuel(): ?Fuel
    {
        return $this->fuel;
    }

    public function setFuel(?Fuel $fuel): static
    {
        $this->fuel = $fuel;

        return $this;
    }

    public function getBuildAt(): ?\DateTimeInterface
    {
        return $this->buildAt;
    }

    public function setBuildAt(\DateTimeInterface $buildAt): static
    {
        $this->buildAt = $buildAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTimeImmutable $updatedAt): static
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }
}
