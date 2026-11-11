import { HOTEL_IMAGES } from "@/data/hotelImages";
import type { Hotel, HotelApiRecord } from "@/types/hotel";
import { api } from "./api";

function mapHotel(record: HotelApiRecord): Hotel {
  return {
    id: record.id,
    name: record.name,
    municipality: record.municipality,
    description: record.description,
    imageKey: record.image_key,
    image: HOTEL_IMAGES[record.image_key],
    address: record.address,
    amenities: record.amenities,
    phone: record.phone,
  };
}

export async function fetchHotels(): Promise<Hotel[]> {
  const { data } = await api.get<HotelApiRecord[]>("/hotels");
  return data.map(mapHotel);
}

export async function fetchHotel(id: string): Promise<Hotel> {
  const { data } = await api.get<HotelApiRecord>(`/hotels/${id}`);
  return mapHotel(data);
}
