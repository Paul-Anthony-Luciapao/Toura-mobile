import type { TouristSpot } from "@/data/types";
import { api } from "./api";

type PaginatedResponse<T> = { data: T[] };
type SingleResponse<T> = { data: T };

export async function fetchTouristSpots(params?: { municipality?: string }) {
  const { data } = await api.get<PaginatedResponse<TouristSpot>>(
    "/tourist-spots",
    { params },
  );
  return data.data;
}

export async function fetchTouristSpot(id: string) {
  const { data } = await api.get<SingleResponse<TouristSpot>>(
    `/tourist-spots/${id}`,
  );
  return data.data;
}
