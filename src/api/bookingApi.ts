// src/api/bookingApi.ts
export const fetchBookingById = async (bookingId: string | undefined) => {
  if (!bookingId) return null;
  const res = await fetch(
    `https://68b7d508b7154050432608f0.mockapi.io/vehicles/booking/${bookingId}`
  );
  if (!res.ok) throw new Error("Failed to fetch booking");
  return res.json();
};
