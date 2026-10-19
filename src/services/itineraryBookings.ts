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

export type ItineraryBooking = ItineraryBookingResponse & {
  arrival_date: string;
  arrival_time: string | null;
  departure_date: string;
  departure_time: string | null;
  created_at: string;
  itinerary_package: {
    id: string;
    title: string;
    image: string | null;
    destination: string | null;
    days: { id: string; title: string; notes: string[] }[];
    inclusions: string[];
  };
  guests: {
    id: number;
    first_name: string;
    last_name: string;
    date_of_birth: string;
    phone: string | null;
    email: string | null;
  }[];
};

export async function fetchMyItineraryBookings(): Promise<ItineraryBooking[]> {
  const { data } = await api.get<ItineraryBooking[]>("/itinerary-bookings");
  return data;
}

export async function fetchItineraryBooking(
  bookingId: string | number,
): Promise<ItineraryBooking> {
  const { data } = await api.get<ItineraryBooking>(
    `/itinerary-bookings/${bookingId}`,
  );
  return data;
}

export async function deleteItineraryBooking(
  bookingId: string | number,
): Promise<void> {
  await api.delete(`/itinerary-bookings/${bookingId}`);
}
