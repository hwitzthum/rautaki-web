import VorgehenPage, {
  vorgehenMetadata,
} from "@/components/pages/VorgehenPage";

export const metadata = vorgehenMetadata("de");

export default function Page() {
  return <VorgehenPage locale="de" />;
}
