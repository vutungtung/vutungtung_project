import { useState, useEffect } from "react";
import { fetchVehicles } from "../api/vehicleApi";
import type { Vehicle } from "../types/vehicle";

export const useVehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        const data = await fetchVehicles();
        setVehicles(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadVehicles();
  }, []);

  return { vehicles, setVehicles, loading, error };
};
