<?php

namespace App\Entity;

use App\Repository\CharacteristicRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CharacteristicRepository::class)]
class Characteristic
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $title = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $description = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    /**
     * @var Collection<int, VehicleCharacteristic>
     */
    #[ORM\OneToMany(targetEntity: VehicleCharacteristic::class, mappedBy: 'characteristic')]
    private Collection $vehicleCharacteristics;

    public function __construct()
    {
        $this->vehicleCharacteristics = new ArrayCollection();
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
            $vehicleCharacteristic->setCharacteristic($this);
        }

        return $this;
    }

    public function removeVehicleCharacteristic(VehicleCharacteristic $vehicleCharacteristic): static
    {
        if ($this->vehicleCharacteristics->removeElement($vehicleCharacteristic)) {
            // set the owning side to null (unless already changed)
            if ($vehicleCharacteristic->getCharacteristic() === $this) {
                $vehicleCharacteristic->setCharacteristic(null);
            }
        }

        return $this;
    }
}
