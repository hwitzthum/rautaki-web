import BookingPage, { bookingMetadata } from "@/components/pages/BookingPage";

export const metadata = bookingMetadata("en");

export default function Page() {
  return <BookingPage locale="en" />;
}
