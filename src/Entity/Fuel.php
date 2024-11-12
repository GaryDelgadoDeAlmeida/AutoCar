<?php

namespace App\Entity;

use App\Repository\FuelRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: FuelRepository::class)]
class Fuel
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $title = null;

    #[ORM\Column]
    private ?float $price = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $updatedAt = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    /**
     * @var Collection<int, FuelPriceHistory>
     */
    #[ORM\OneToMany(targetEntity: FuelPriceHistory::class, mappedBy: 'fuel')]
    private Collection $fuelPriceHistories;

    /**
     * @var Collection<int, Vehicule>
     */
    #[ORM\OneToMany(targetEntity: Vehicule::class, mappedBy: 'fuel')]
    private Collection $vehicules;

    public function __construct()
    {
        $this->fuelPriceHistories = new ArrayCollection();
        $this->vehicules = new ArrayCollection();
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

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): static
    {
        $this->price = $price;

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
     * @return Collection<int, FuelPriceHistory>
     */
    public function getFuelPriceHistories(): Collection
    {
        return $this->fuelPriceHistories;
    }

    public function addFuelPriceHistory(FuelPriceHistory $fuelPriceHistory): static
    {
        if (!$this->fuelPriceHistories->contains($fuelPriceHistory)) {
            $this->fuelPriceHistories->add($fuelPriceHistory);
            $fuelPriceHistory->setFuel($this);
        }

        return $this;
    }

    public function removeFuelPriceHistory(FuelPriceHistory $fuelPriceHistory): static
    {
        if ($this->fuelPriceHistories->removeElement($fuelPriceHistory)) {
            // set the owning side to null (unless already changed)
            if ($fuelPriceHistory->getFuel() === $this) {
                $fuelPriceHistory->setFuel(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Vehicule>
     */
    public function getVehicules(): Collection
    {
        return $this->vehicules;
    }

    public function addVehicule(Vehicule $vehicule): static
    {
        if (!$this->vehicules->contains($vehicule)) {
            $this->vehicules->add($vehicule);
            $vehicule->setFuel($this);
        }

        return $this;
    }

    public function removeVehicule(Vehicule $vehicule): static
    {
        if ($this->vehicules->removeElement($vehicule)) {
            // set the owning side to null (unless already changed)
            if ($vehicule->getFuel() === $this) {
                $vehicule->setFuel(null);
            }
        }

        return $this;
    }
}
