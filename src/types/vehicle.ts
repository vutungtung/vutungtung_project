export type FuelType = "petrol" | "diesel" | "electric" | "hybrid";
export type Transmission = "manual" | "automatic";
export type Status =  "Available" | "Rented" | "Maintanence";

export type VehicleBase = {
  id?: string;
  title: string;
  name: string; // not title
  brand: string;
  model: string;
  type: string; // e.g., "SUV", "Sedan"
  seats: number;
  description: string;
  category: string;
  fuelType: FuelType;
  seatingCapacity: number;
  transmission: Transmission;
  mileage: string;
  pricePerDay: number;
  features: string[]; // ["AC", "ABS", ...]
  image: string[]; // array of image URLs
  licenseNumber?: string; // optional if you use it
  status: Status;
};

export type Vehicle = VehicleBase & { id: string }; // server records always have id
export type NewVehicle = VehicleBase; // when creating (id is server-generated)



