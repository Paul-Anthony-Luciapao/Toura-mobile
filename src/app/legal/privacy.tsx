import LegalScreen from "@/components/common/LegalScreen";
import { DATA_PRIVACY, LEGAL_FOOTER } from "@/data/legalContent";

export default function PrivacyScreen() {
  return (
    <LegalScreen
      title="Data Privacy"
      sections={DATA_PRIVACY}
      footer={LEGAL_FOOTER}
    />
  );
}
