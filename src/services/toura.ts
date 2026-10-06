import axios from "axios";
import type {
  Accommodation,
  Offer,
  Resort,
  SpotSummary,
  TouristSpot,
} from "@/data/types";
import { API_BASE_URL, api } from "./api";

type ApiList<T> = {
  success: boolean;
  count: number;
  data: T[];
};

type ApiItem<T> = {
  success: boolean;
  data: T;
};

type ApiResort = {
  id: number;
  owner_id: number;
  name: string;
  tagline: string | null;
  municipality: string;
  location: string;
  type: string;
  description: string;
  cover_image: string | null;
  images: string[];
  rating: number;
  review_count: number;
  base_price: number;
  amenities: string[];
  status: string;
  accommodations?: ApiAccommodation[];
  offers?: ApiOffer[];
};

type ApiAccommodation = {
  id: number;
  resort_id: number;
  title: string;
  description: string;
  price_per_night: number;
  extra_guest_fee: number;
  weekend_rate: number;
  weekly_discount: number;
  monthly_discount: number;
  capacity: number;
  bed_type: string;
  bed_count: number;
  available_units: number;
  size: string;
  image: string | null;
  images: string[];
  amenities: string[];
};

type ApiOffer = {
  id: number;
  resort_id: number;
  title: string;
  tag: string;
  description: string;
  discount_rate: string;
  valid_until: string | null;
  inclusions: string[];
};

type ApiSpot = {
  id: number;
  name: string;
  municipality: string;
  category: string;
  description: string;
  image: string | null;
  images: string[];
  tags: string[];
};

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80";

function firstImage(image: string | null, images: string[]) {
  return image ?? images[0] ?? PLACEHOLDER_IMAGE;
}

function toAccommodation(raw: ApiAccommodation): Accommodation {
  return {
    id: String(raw.id),
    title: raw.title,
    description: raw.description,
    pricePerNight: raw.price_per_night,
    capacity: raw.capacity,
    bedType: raw.bed_type,
    bedCount: raw.bed_count,
    availableUnits: raw.available_units,
    size: raw.size,
    image: firstImage(raw.image, raw.images),
    amenities: raw.amenities ?? [],
  };
}

function toOffer(raw: ApiOffer): Offer {
  return {
    id: String(raw.id),
    title: raw.title,
    tag: raw.tag,
    description: raw.description,
    discountRate: raw.discount_rate,
    validUntil: raw.valid_until ?? "",
    inclusions: raw.inclusions ?? [],
  };
}

function toResort(raw: ApiResort): Resort {
  return {
    id: String(raw.id),
    ownerId: String(raw.owner_id),
    name: raw.name,
    tagline: raw.tagline ?? "",
    municipality: raw.municipality,
    location: raw.location,
    description: raw.description,
    coverImage: firstImage(raw.cover_image, raw.images),
    images: raw.images ?? [],
    rating: raw.rating,
    reviewCount: raw.review_count,
    basePrice: raw.base_price,
    amenities: raw.amenities ?? [],
    status: raw.status,
    accommodations: (raw.accommodations ?? []).map(toAccommodation),
    offers: (raw.offers ?? []).map(toOffer),
  };
}

function toSpot(raw: ApiSpot): TouristSpot {
  return {
    id: String(raw.id),
    name: raw.name,
    municipality: raw.municipality,
    category: raw.category,
    description: raw.description,
    image: firstImage(raw.image, raw.images),
    tags: raw.tags ?? [],
  };
}

function toSpotSummary(raw: ApiResort): SpotSummary {
  return {
    id: String(raw.id),
    name: raw.name,
    municipality: raw.municipality,
    image: firstImage(raw.cover_image, raw.images),
    rating: raw.rating,
    reviewCount: String(raw.review_count),
    price: raw.base_price,
  };
}

export async function fetchTouristSpots() {
  const { data } = await api.get<ApiList<ApiSpot>>("/spots");
  return data.data.map(toSpot);
}

export async function fetchResortSummaries() {
  const { data } = await api.get<ApiList<ApiResort>>("/resorts");
  return data.data.map(toSpotSummary);
}

export async function fetchResort(id: string) {
  try {
    const { data } = await api.get<ApiItem<ApiResort>>(`/resorts/${id}`);
    return toResort(data.data);
  } catch {
    return null;
  }
}

export function describeApiError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (error.code === "ECONNABORTED") {
      return `Request timed out. No response from ${API_BASE_URL}.`;
    }

    if (!error.response) {
      return `Cannot reach ${API_BASE_URL} (${error.code ?? error.message}). Check that the server is running and reachable from this device.`;
    }

    return `Server returned ${error.response.status} for ${error.response.config.url}.`;
  }

  return error instanceof Error ? error.message : "Unknown error.";
}
