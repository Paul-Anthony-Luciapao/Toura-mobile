import ConsentStep from "@/components/auth/ConsentStep";
import { TERMS_AND_CONDITIONS } from "@/data/legalContent";
import type { Role } from "@/data/types";
import { router, useLocalSearchParams } from "expo-router";

export default function ConsentScreen() {
  const { role } = useLocalSearchParams<{ role?: Role }>();

  return (
    <ConsentStep
      title="Terms & Conditions"
      sections={TERMS_AND_CONDITIONS}
      onAccept={() =>
        router.push({
          pathname: "/privacy",
          params: { role },
        })
      }
      onDecline={() => router.replace("/")}
    />
  );
}
