// export const API_URL =
//   "https://68b7d508b7154050432608f0.mockapi.io/vehicles/vehicleddata";

// // Fetch all vehicles
// export const fetchVehicles = async () => {
//   const res = await fetch(API_URL);
//   if (!res.ok) throw new Error("Failed to fetch vehicles");
//   const data = await res.json();
//   return data;
// };

// // Fetch vehicle by ID
// export const fetchVehicleById = async (id: string) => {
//   const res = await fetch(`${API_URL}/${id}`);
//   if (!res.ok) throw new Error("Failed to fetch vehicle");
//   const data = await res.json();
//   return data;
// };

// // Add new vehicle
// export const addVehicle = async (vehicle: any) => {
//   const res = await fetch(API_URL, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(vehicle),
//   });
//   if (!res.ok) throw new Error("Failed to add vehicle");
//   const data = await res.json();
//   return data;
// };

// // Update vehicle
// export const updateVehicle = async (id: string, vehicle: any) => {
//   const res = await fetch(`${API_URL}/${id}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(vehicle),
//   });
//   if (!res.ok) throw new Error("Failed to update vehicle");
//   const data = await res.json();
//   return data;
// };

// // Delete vehicle
// export const deleteVehicle = async (id: string) => {
//   const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
//   if (!res.ok) throw new Error("Failed to delete vehicle");
//   return true;
// };

import type { Vehicle } from "../types/vehicle";

export const API_URL =
  "https://68b7d508b7154050432608f0.mockapi.io/vehicles/vehicleddata";

// Fetch all vehicles
export const fetchVehicles = async (): Promise<Vehicle[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch vehicles");
  const data: Vehicle[] = await res.json();
  return data;
};

// Fetch vehicle by ID
export const fetchVehicleById = async (id: string): Promise<Vehicle> => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch vehicle");
  const data: Vehicle = await res.json();
  return data;
};

// Add new vehicle
export const addVehicle = async (vehicle: Vehicle): Promise<Vehicle> => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(vehicle),
  });
  if (!res.ok) throw new Error("Failed to add vehicle");
  const data: Vehicle = await res.json();
  return data;
};

// Update vehicle
export const updateVehicle = async (
  id: string,
  vehicle: Vehicle
): Promise<Vehicle> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(vehicle),
  });
  if (!res.ok) throw new Error("Failed to update vehicle");
  const data: Vehicle = await res.json();
  return data;
};

// Delete vehicle
export const deleteVehicle = async (id: string): Promise<boolean> => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete vehicle");
  return true;
};
