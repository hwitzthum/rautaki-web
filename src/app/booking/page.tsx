import BookingPage, { bookingMetadata } from "@/components/pages/BookingPage";

export const metadata = bookingMetadata("de");

export default function Page() {
  return <BookingPage locale="de" />;
}
