import ConsentStep from "@/components/auth/ConsentStep";
import { DATA_PRIVACY } from "@/data/legalContent";
import { router, useLocalSearchParams } from "expo-router";

export default function PrivacyScreen() {
  const { role } = useLocalSearchParams<{ role?: string }>();

  const handleAccept = () => {
    if (role === "traveler") {
      router.push({ pathname: "/login", params: { role } });
    } else {
      router.push({ pathname: "/coming-soon", params: { role } });
    }
  };

  return (
    <ConsentStep
      title="Data Privacy"
      sections={DATA_PRIVACY}
      onAccept={handleAccept}
    />
  );
}
