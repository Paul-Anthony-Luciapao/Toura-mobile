import { api } from "./api";
import type { TourPackage } from "../types/tourPackage";

type TourPackageResponse = {
  id: string;
  name: string;
  municipality: string;
  description: string;
  image: string | null;
  rating: string | null;
  category: string;
  duration: string;
  price: string;
  price_type: TourPackage["priceType"];
  inclusions: string[];
  exclusions: string[];
  destinations: string[];
  activities: string[];
  available_days: string[] | null;
  max_participants: number | null;
  meeting_point: string | null;
  meeting_time: string | null;
  requirements: string[] | null;
  cancellation_policy: string | null;
};

function mapTourPackage(item: TourPackageResponse): TourPackage {
  return {
    id: item.id,
    name: item.name,
    municipality: item.municipality,
    description: item.description,
    image: item.image ?? undefined,
    rating: item.rating === null ? undefined : Number(item.rating),
    category: item.category,
    duration: item.duration,
    price: Number(item.price),
    priceType: item.price_type,
    inclusions: item.inclusions,
    exclusions: item.exclusions,
    destinations: item.destinations,
    activities: item.activities,
    availableDays: item.available_days ?? undefined,
    maxParticipants: item.max_participants ?? undefined,
    meetingPoint: item.meeting_point ?? undefined,
    meetingTime: item.meeting_time ?? undefined,
    requirements: item.requirements ?? undefined,
    cancellationPolicy: item.cancellation_policy ?? undefined,
  };
}

export async function fetchTourPackages(): Promise<TourPackage[]> {
  const { data } = await api.get<TourPackageResponse[]>("/tour-packages");
  return data.map(mapTourPackage);
}

export type CreateTourBookingInput = {
  tour_package_id: string;
  tour_date: string;
  number_of_adults: number;
  number_of_children: number;
  pickup_location: string | null;
  special_requests: string | null;
};

export type TourBooking = {
  id: number;
  booking_reference: string;
  tour_package_id: string;
  tour_date: string;
  number_of_adults: number;
  number_of_children: number;
  total_participants: number;
  pickup_location: string | null;
  special_requests: string | null;
  unit_price: string;
  total_amount: string;
  status: "pending" | "confirmed" | "cancelled" | "expired";
  payment_status: "pending" | "paid" | "refunded";
  expires_at: string | null;
  created_at: string;
  tour_package: TourPackageResponse;
};

export async function createTourBooking(
  input: CreateTourBookingInput,
): Promise<TourBooking> {
  const { data } = await api.post<TourBooking>("/tour-bookings", input);
  return data;
}

export async function fetchMyTourBookings(): Promise<TourBooking[]> {
  const { data } = await api.get<TourBooking[]>("/tour-bookings");
  return data;
}

export async function cancelTourBooking(id: string | number): Promise<void> {
  await api.delete(`/tour-bookings/${id}`);
}

export async function fetchTourBooking(id: string | number): Promise<TourBooking> {
  const { data } = await api.get<TourBooking>(`/tour-bookings/${id}`);
  return data;
}
