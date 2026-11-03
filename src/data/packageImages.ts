import type { TouristSpot } from "@/data/types";
import type { ImageSourcePropType } from "react-native";

export function getPackageSpotImage(
  image: TouristSpot["image"],
): ImageSourcePropType {
  return typeof image === "string" ? { uri: image } : image;
}
