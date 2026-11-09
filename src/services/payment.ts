import { isAxiosError } from "axios";
import { api } from "./api";

export type PaymentFailureReason =
  | "invalid_card_details"
  | "expired_card"
  | "insufficient_funds"
  | "payment_declined"
  | "authentication_failed"
  | "connection_timeout"
  | "duplicate_payment";

export async function createCheckout(
  bookingId: number,
  paymentMethodType: "card" | "gcash" | "paymaya",
  bookingType: "itinerary" | "tour" = "itinerary",
) {
  const response = await api.post<{
    checkout_url: string;
    order_id: number;
  }>("/payments/checkout", {
    booking_id: bookingId,
    booking_type: bookingType,
    payment_method_type: paymentMethodType,
  });

  return response.data;
}

export async function getPaymentStatus(orderId: number) {
  const response = await api.get<{
    payment_status: "paid" | "pending" | "failed";
    failure_reason: PaymentFailureReason | null;
  }>(`/payments/orders/${orderId}/status`);

  return response.data;
}

export function getCheckoutFailureReason(
  error: unknown,
): PaymentFailureReason | null {
  if (!isAxiosError(error)) {
    return null;
  }

  const responseData: unknown = error.response?.data;
  const responseCode =
    typeof responseData === "object" &&
    responseData !== null &&
    "code" in responseData &&
    typeof responseData.code === "string"
      ? responseData.code
      : null;

  if (responseCode === "already_paid") {
    return "duplicate_payment";
  }

  if (
    responseCode === "checkout_verification_unavailable" ||
    error.code === "ECONNABORTED" ||
    !error.response
  ) {
    return "connection_timeout";
  }

  return null;
}
