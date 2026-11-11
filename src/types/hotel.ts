import type { ImageSourcePropType } from "react-native";

export type HotelImageKey =
  | "h-hotel-el-nido"
  | "henry-resort-qi-el-nido"
  | "z-garden-hotel"
  | "namal-el-nido"
  | "j-boutique-hotel"
  | "coron-180-hotel"
  | "ocean-star-hotel-coron"
  | "charms-hotel-coron"
  | "hue-puerto-princesa"
  | "the-legend-palawan";

export type HotelApiRecord = {
  id: number;
  name: string;
  municipality: string;
  description: string;
  image_key: HotelImageKey;
  address?: string | null;
  amenities?: string[] | null;
  phone?: string | null;
};

export type Hotel = Omit<HotelApiRecord, "image_key"> & {
  imageKey: HotelImageKey;
  image: ImageSourcePropType;
};
