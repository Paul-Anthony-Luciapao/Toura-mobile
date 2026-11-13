import type { ImageSourcePropType } from "react-native";

const ACTIVITY_IMAGES: Record<string, ImageSourcePropType> = {
  "big-lagoon": require("../../assets/images/big-lagoon.webp"),
  "small-lagoon": require("../../assets/images/twin-lagoon.jpg"),
  "secret-beach": require("../../assets/images/elnido.jpg"),
  "island-hopping-a": require("../../assets/images/big-lagoon.webp"),
  "island-hopping-c": require("../../assets/images/elnido.jpg"),
  kayaking: require("../../assets/images/big-lagoon.webp"),
  snorkeling: require("../../assets/images/twin-lagoon.jpg"),
  "nacpan-beach": require("../../assets/images/Napcan.jpg"),
  "taraw-cliff": require("../../assets/images/elnido.jpg"),
  "el-nido-tour-a": require("../../assets/images/big-lagoon.webp"),
  "el-nido-tour-b": require("../../assets/images/elnido.jpg"),
  "el-nido-tour-c": require("../../assets/images/elnido.jpg"),
  "el-nido-tour-d": require("../../assets/images/twin-lagoon.jpg"),
  "kayangan-lake": require("../../assets/images/kayangan-lake.jpeg"),
  "twin-lagoon": require("../../assets/images/twin-lagoon.jpg"),
  "skeleton-wreck": require("../../assets/images/coron.jpg"),
  "malcapuya-island": require("../../assets/images/coron.jpg"),
  "scuba-diving": require("../../assets/images/coron.jpg"),
  "maquinit-hot-springs": require("../../assets/images/coron.jpg"),
  "coron-tour-a": require("../../assets/images/kayangan-lake.jpeg"),
  "coron-tour-b": require("../../assets/images/twin-lagoon.jpg"),
  "coron-tour-c": require("../../assets/images/coron.jpg"),
  "honda-bay-island-route": require("../../assets/images/puertoprinsesa.jpg"),
  "underground-river": require("../../assets/images/puertoprinsesa.jpg"),
  "honda-bay": require("../../assets/images/puertoprinsesa.jpg"),
  "ugong-rock": require("../../assets/images/puertoprinsesa.jpg"),
  "firefly-watching": require("../../assets/images/puertoprinsesa.jpg"),
  "mangrove-paddle-boating": require("../../assets/images/puertoprinsesa.jpg"),
  "turtle-watching": require("../../assets/images/sanvicente.jpg"),
  "island-hopping": require("../../assets/images/sanvicente.jpg"),
  "beach-camping": require("../../assets/images/sanvicente.jpg"),
  "sunset-watching": require("../../assets/images/sanvicente.jpg"),
  paddleboarding: require("../../assets/images/sanvicente.jpg"),
  "long-beach": require("../../assets/images/sanvicente.jpg"),
  "port-barton-tour-a": require("../../assets/images/sanvicente.jpg"),
  "port-barton-tour-b": require("../../assets/images/sanvicente.jpg"),
  "port-barton-tour-c": require("../../assets/images/sanvicente.jpg"),
  "port-barton-tour-d": require("../../assets/images/sanvicente.jpg"),
};

const DESTINATION_IMAGES: Record<string, ImageSourcePropType> = {
  "el-nido": require("../../assets/images/elnido.jpg"),
  coron: require("../../assets/images/coron.jpg"),
  "puerto-princesa": require("../../assets/images/puertoprinsesa.jpg"),
  "port-barton": require("../../assets/images/sanvicente.jpg"),
  adventure: require("../../assets/images/elnido.jpg"),
};

export function getActivityImage(
  activityId: string,
  destinationId: string,
): ImageSourcePropType {
  return (
    ACTIVITY_IMAGES[activityId] ??
    DESTINATION_IMAGES[destinationId] ??
    DESTINATION_IMAGES.adventure
  );
}
