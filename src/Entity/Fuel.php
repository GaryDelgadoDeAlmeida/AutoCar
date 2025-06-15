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

    #[ORM\Column(length: 255)]
    private ?string $fuelKey = null;

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
     * @var Collection<int, Vehicle>
     */
    #[ORM\ManyToMany(targetEntity: Vehicle::class, mappedBy: 'fuels')]
    private Collection $vehicles;

    public function __construct()
    {
        $this->fuelPriceHistories = new ArrayCollection();
        $this->vehicles = new ArrayCollection();
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

    public function getFuelKey(): ?string
    {
        return $this->fuelKey;
    }

    public function setFuelKey(string $fuelKey): static
    {
        $this->fuelKey = $fuelKey;

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

    /**
     * @return array|FuelPriceHistory
     */
    public function getLastFuelPriceHistories() : FuelPriceHistory|bool {
        $histories = $this->getFuelPriceHistories();

        return $histories->last();
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
     * @return Collection<int, Vehicle>
     */
    public function getVehicles(): Collection
    {
        return $this->vehicles;
    }

    public function addVehicle(Vehicle $vehicle): static
    {
        if (!$this->vehicles->contains($vehicle)) {
            $this->vehicles->add($vehicle);
            $vehicle->addFuel($this);
        }

        return $this;
    }

    public function removeVehicle(Vehicle $vehicle): static
    {
        if ($this->vehicles->removeElement($vehicle)) {
            $vehicle->removeFuel($this);
        }

        return $this;
    }
}
