import ServicesPage, {
  servicesMetadata,
} from "@/components/pages/ServicesPage";

export const metadata = servicesMetadata("de");

export default function Page() {
  return <ServicesPage locale="de" />;
}
