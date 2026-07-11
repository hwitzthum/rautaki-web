import PrivacyPage, { privacyMetadata } from "@/components/pages/PrivacyPage";

export const metadata = privacyMetadata("de");

export default function Page() {
  return <PrivacyPage locale="de" />;
}
