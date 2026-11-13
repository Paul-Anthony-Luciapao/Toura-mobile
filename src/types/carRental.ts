import type { ImageSourcePropType } from "react-native";

export type CarRentalCategory =
  | "Cars"
  | "Vans"
  | "Motorbikes"
  | "Chauffeur";

export interface CarRentalProvider {
  id: string;
  name: string;
  image: ImageSourcePropType;
  imageFit: "cover" | "contain";
  rating?: number;
  phone: string;
  location: string;
  fleet: string[];
  services: string[];
  categories: CarRentalCategory[];
  websiteName?: string;
}
