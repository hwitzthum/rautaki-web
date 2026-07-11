import AboutPage, { aboutMetadata } from "@/components/pages/AboutPage";

export const metadata = aboutMetadata("de");

export default function Page() {
  return <AboutPage locale="de" />;
}
