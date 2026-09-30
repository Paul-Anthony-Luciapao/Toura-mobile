import type { TouristSpot } from "@/data/types";
import { api } from "./api";

type PaginatedResponse<T> = { data: T[] };

export async function fetchTouristSpots(params?: { municipality?: string }) {
  const { data } = await api.get<PaginatedResponse<TouristSpot>>(
    "/tourist-spots",
    { params },
  );
  return data.data;
}

export async function fetchTouristSpot(id: string) {
  const { data } = await api.get<TouristSpot>(`/tourist-spots/${id}`);
  return data;
}
