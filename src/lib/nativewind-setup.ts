import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { cssInterop } from "nativewind";

cssInterop(Image, {
  className: "style",
});

cssInterop(Ionicons, {
  className: {
    target: "style",
    nativeStyleToProp: { color: true },
  },
});
