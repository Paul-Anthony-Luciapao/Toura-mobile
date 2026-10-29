import { api } from "./api";

export async function createCheckout(
  bookingId: number,
  paymentMethodType: "card" | "gcash" | "paymaya",
) {
  const response = await api.post("/payments/checkout", {
    booking_id: bookingId,
    payment_method_type: paymentMethodType,
  });

  return response.data as {
    checkout_url: string;
    session_id: string;
  };
}
