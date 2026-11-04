import ItineraryPackagesScreen from "@/components/itineraries/ItineraryPackagesScreen";
import { getCustomTabBarContentPadding } from "@/components/CustomTabBar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ItineraryTabScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ItineraryPackagesScreen
      showBackButton
      contentBottomPadding={getCustomTabBarContentPadding(insets.bottom)}
    />
  );
}
