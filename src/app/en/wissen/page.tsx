import WissenIndexPage, {
  wissenMetadata,
} from "@/components/pages/WissenIndexPage";

export const metadata = wissenMetadata("en");

export default function Page() {
  return <WissenIndexPage locale="en" />;
}
