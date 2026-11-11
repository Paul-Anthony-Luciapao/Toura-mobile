import type { HotelImageKey } from "@/types/hotel";
import type { ImageSourcePropType } from "react-native";

export const HOTEL_IMAGES: Record<HotelImageKey, ImageSourcePropType> = {
  "h-hotel-el-nido": require("../../assets/images/hotels/H-hotel.jpeg"),
  "henry-resort-qi-el-nido": require("../../assets/images/hotels/Henry-Resort-Qi-El-Nido.jpg"),
  "z-garden-hotel": require("../../assets/images/hotels/Z-garden.jpeg"),
  "namal-el-nido": require("../../assets/images/hotels/Namal.jpg"),
  "j-boutique-hotel": require("../../assets/images/hotels/J-Botique-Hoteljpg.jpg"),
  "coron-180-hotel": require("../../assets/images/hotels/Coron-180.jpg"),
  "ocean-star-hotel-coron": require("../../assets/images/hotels/Ocean-Star.jpg"),
  "charms-hotel-coron": require("../../assets/images/hotels/Charms-Hotel.jpg"),
  "hue-puerto-princesa": require("../../assets/images/hotels/Hue-Hotel.jpg"),
  "the-legend-palawan": require("../../assets/images/hotels/The-Legend.jpg"),
};
