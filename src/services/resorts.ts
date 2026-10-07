import type { Resort } from "@/data/types";
import { api } from "./api";

type PaginatedResponse<T> = { data: T[] };
type SingleResponse<T> = { data: T };

export async function fetchResorts(params?: { municipality?: string }) {
  const { data } = await api.get<PaginatedResponse<Resort>>("/resorts", {
    params,
  });
  return data.data;
}

export async function fetchResort(id: string) {
  const { data } = await api.get<SingleResponse<Resort>>(`/resorts/${id}`);
  return data.data;
}
