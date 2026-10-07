import ConsentStep from "@/components/auth/ConsentStep";
import { DATA_PRIVACY } from "@/data/legalContent";
import type { Role } from "@/data/types";
import { router, useLocalSearchParams } from "expo-router";

export default function PrivacyScreen() {
  const { role } = useLocalSearchParams<{ role?: Role }>();

  return (
    <ConsentStep
      title="Data Privacy"
      sections={DATA_PRIVACY}
      onAccept={() =>
        router.push({
          pathname: "/signup",
          params: { role },
        })
      }
      onDecline={() => router.replace("/")}
    />
  );
}
