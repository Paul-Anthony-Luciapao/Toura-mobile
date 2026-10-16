import { api } from "./api";

export type ItineraryBookingGuestInput = {
  first_name: string;
  last_name: string;
  date_of_birth: string | null;
  phone: string | null;
  email: string | null;
};

export type CreateItineraryBookingInput = {
  itinerary_package_id: string;
  arrival_date: string;
  arrival_time: string | null;
  departure_date: string;
  departure_time: string | null;
  guests: ItineraryBookingGuestInput[];
};

export type ItineraryBookingResponse = {
  id: number;
  booking_reference: string;
  itinerary_package_id: string;
  guest_count: number;
  total_price: string;
  status: string;
};

export async function createItineraryBooking(
  input: CreateItineraryBookingInput,
): Promise<ItineraryBookingResponse> {
  const { data } = await api.post<ItineraryBookingResponse>(
    "/itinerary-bookings",
    input,
  );
  return data;
}
