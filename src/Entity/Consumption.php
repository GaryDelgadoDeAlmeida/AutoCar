<?php

namespace App\Entity;

use App\Repository\ConsumptionRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ConsumptionRepository::class)]
class Consumption
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $title = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $description = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $category = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $updatedAt = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    /**
     * @var Collection<int, VehicleConsumption>
     */
    #[ORM\OneToMany(targetEntity: VehicleConsumption::class, mappedBy: 'consumption')]
    private Collection $vehicleConsumptions;

    public function __construct()
    {
        $this->vehicleConsumptions = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getCategory(): ?string
    {
        return $this->category;
    }

    public function setCategory(?string $category): static
    {
        $this->category = $category;

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
            $vehicleConsumption->setConsumption($this);
        }

        return $this;
    }

    public function removeVehicleConsumption(VehicleConsumption $vehicleConsumption): static
    {
        if ($this->vehicleConsumptions->removeElement($vehicleConsumption)) {
            // set the owning side to null (unless already changed)
            if ($vehicleConsumption->getConsumption() === $this) {
                $vehicleConsumption->setConsumption(null);
            }
        }

        return $this;
    }
}
