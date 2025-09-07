import type { Booking } from "../types/booking";

export const BOOKING_API_URL =
  "https://68bbe2b00f2491613edd85fe.mockapi.io/booking/booking";
// ⬆️ replace with your real backend API later

// ✅ Fetch all bookings
export const fetchBookings = async (): Promise<Booking[]> => {
  const res = await fetch(BOOKING_API_URL);
  if (!res.ok) throw new Error("Failed to fetch bookings");
  const data: Booking[] = await res.json();
  return data;
};

// ✅ Fetch single booking by ID
export const fetchBookingById = async (id: string): Promise<Booking> => {
  const res = await fetch(`${BOOKING_API_URL}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch booking");
  const data: Booking = await res.json();
  return data;
};

// ✅ Update booking
export const updateBooking = async (
  id: string,
  booking: Booking
): Promise<Booking> => {
  const res = await fetch(`${BOOKING_API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking),
  });
  if (!res.ok) throw new Error("Failed to update booking");
  const data: Booking = await res.json();
  return data;
};

// ✅ Delete booking
export const deleteBooking = async (id: string): Promise<boolean> => {
  const res = await fetch(`${BOOKING_API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete booking");
  return true;
};
