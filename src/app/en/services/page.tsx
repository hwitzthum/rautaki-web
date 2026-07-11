import ServicesPage, {
  servicesMetadata,
} from "@/components/pages/ServicesPage";

export const metadata = servicesMetadata("en");

export default function Page() {
  return <ServicesPage locale="en" />;
}
