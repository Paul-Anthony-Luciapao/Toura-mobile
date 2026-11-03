import { Ionicons } from "@expo/vector-icons";
import { cssInterop } from "nativewind";

// One-time setup: lets Ionicons accept NativeWind `className`.
// Color utilities (e.g. text-textMuted) are forwarded to the icon's
// `color` prop; everything else lands on `style`. Keep using the
// `size` prop for glyph size.
cssInterop(Ionicons, {
  className: {
    target: "style",
    nativeStyleToProp: { color: true },
  },
});
