import { api } from "./api";

export async function createCheckout(bookingId: number) {
  const response = await api.post("/payments/checkout", { booking_id: bookingId });

  return response.data as {
    checkout_url: string;
    session_id: string;
  };
}
