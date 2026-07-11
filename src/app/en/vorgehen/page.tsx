import VorgehenPage, {
  vorgehenMetadata,
} from "@/components/pages/VorgehenPage";

export const metadata = vorgehenMetadata("en");

export default function Page() {
  return <VorgehenPage locale="en" />;
}
