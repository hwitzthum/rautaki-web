import WissenIndexPage, {
  wissenMetadata,
} from "@/components/pages/WissenIndexPage";

export const metadata = wissenMetadata("de");

export default function Page() {
  return <WissenIndexPage locale="de" />;
}
