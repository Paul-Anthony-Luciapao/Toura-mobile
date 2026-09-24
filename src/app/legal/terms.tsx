import LegalScreen from "@/components/common/LegalScreen";
import { LEGAL_FOOTER, TERMS_AND_CONDITIONS } from "@/data/legalContent";

export default function TermsScreen() {
  return (
    <LegalScreen
      title="Terms & Conditions"
      sections={TERMS_AND_CONDITIONS}
      footer={LEGAL_FOOTER}
    />
  );
}
