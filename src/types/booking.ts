export type TourPaymentStatus = "pending" | "paid" | "refunded";

export type TourBookingStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed";

export type TourBooking = {
  id: string;
  customerId: string;
  tourPackageId: string;
  tourDate: string;
  numberOfAdults: number;
  numberOfChildren: number;
  totalParticipants: number;
  pickupLocation: string;
  specialRequests: string | null;
  totalAmount: number;
  paymentStatus: TourPaymentStatus;
  bookingStatus: TourBookingStatus;
};
