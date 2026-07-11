import ImprintPage, { imprintMetadata } from "@/components/pages/ImprintPage";

export const metadata = imprintMetadata("de");

export default function Page() {
  return <ImprintPage locale="de" />;
}
