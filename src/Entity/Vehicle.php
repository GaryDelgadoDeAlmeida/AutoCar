<?php

namespace App\Entity;

use App\Repository\VehicleRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: VehicleRepository::class)]
class Vehicle
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'vehicles')]
    private ?Maker $maker = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $photo = null;

    #[ORM\Column(length: 255)]
    private ?string $basemodel = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

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

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $buildAt = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $updatedAt = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    /**
     * @var Collection<int, VehicleCharacteristic>
     */
    #[ORM\OneToMany(targetEntity: VehicleCharacteristic::class, mappedBy: 'vehicle')]
    private Collection $vehicleCharacteristics;

    /**
     * @var Collection<int, VehicleConsumption>
     */
    #[ORM\OneToMany(targetEntity: VehicleConsumption::class, mappedBy: 'vehicle')]
    private Collection $vehicleConsumptions;

    /**
     * @var Collection<int, Fuel>
     */
    #[ORM\ManyToMany(targetEntity: Fuel::class, inversedBy: 'vehicles')]
    private Collection $fuels;

    public function __construct()
    {
        $this->vehicleCharacteristics = new ArrayCollection();
        $this->vehicleConsumptions = new ArrayCollection();
        $this->fuels = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMaker(): ?Maker
    {
        return $this->maker;
    }

    public function setMaker(?Maker $maker): static
    {
        $this->maker = $maker;

        return $this;
    }

    public function getPhoto(): ?string
    {
        return $this->photo;
    }

    public function setPhoto(?string $photo): static
    {
        $this->photo = $photo;

        return $this;
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

    /**
     * @return Collection<int, VehicleCharacteristic>
     */
    public function getVehicleCharacteristics(): Collection
    {
        return $this->vehicleCharacteristics;
    }

    public function addVehicleCharacteristic(VehicleCharacteristic $vehicleCharacteristic): static
    {
        if (!$this->vehicleCharacteristics->contains($vehicleCharacteristic)) {
            $this->vehicleCharacteristics->add($vehicleCharacteristic);
            $vehicleCharacteristic->setVehicle($this);
        }

        return $this;
    }

    public function removeVehicleCharacteristic(VehicleCharacteristic $vehicleCharacteristic): static
    {
        if ($this->vehicleCharacteristics->removeElement($vehicleCharacteristic)) {
            // set the owning side to null (unless already changed)
            if ($vehicleCharacteristic->getVehicle() === $this) {
                $vehicleCharacteristic->setVehicle(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, VehicleConsumption>
     */
    public function getVehicleConsumptions(): Collection
    {
        return $this->vehicleConsumptions;
    }

    public function addVehicleConsumption(VehicleConsumption $vehicleConsumption): static
    {
        if (!$this->vehicleConsumptions->contains($vehicleConsumption)) {
            $this->vehicleConsumptions->add($vehicleConsumption);
            $vehicleConsumption->setVehicle($this);
        }

        return $this;
    }

    public function removeVehicleConsumption(VehicleConsumption $vehicleConsumption): static
    {
        if ($this->vehicleConsumptions->removeElement($vehicleConsumption)) {
            // set the owning side to null (unless already changed)
            if ($vehicleConsumption->getVehicle() === $this) {
                $vehicleConsumption->setVehicle(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Fuel>
     */
    public function getFuels(): Collection
    {
        return $this->fuels;
    }

    public function addFuel(Fuel $fuel): static
    {
        if (!$this->fuels->contains($fuel)) {
            $this->fuels->add($fuel);
        }

        return $this;
    }

    public function removeFuel(Fuel $fuel): static
    {
        $this->fuels->removeElement($fuel);

        return $this;
    }
}
