import ImprintPage, { imprintMetadata } from "@/components/pages/ImprintPage";

export const metadata = imprintMetadata("en");

export default function Page() {
  return <ImprintPage locale="en" />;
}
