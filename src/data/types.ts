import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps, ComponentType } from "react";
import type { ImageSourcePropType } from "react-native";
import type { SvgProps } from "react-native-svg";

export type Role = "traveler" | "owner";

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role | null;
  avatar: string | null;
  phone: string;
  joinedAt: string;
  status: string;
  resortId?: string;
};

export type Accommodation = {
  id: string;
  title: string;
  description: string;
  pricePerNight: number;
  capacity: number;
  bedType: string;
  bedCount: number;
  availableUnits: number;
  size: string;
  image: string;
  amenities: string[];
};

export type Offer = {
  id: string;
  title: string;
  tag: string;
  description: string;
  discountRate: string;
  validUntil: string;
  inclusions: string[];
};

export type Resort = {
  id: string;
  ownerId: string;
  name: string;
  tagline: string;
  municipality: string;
  location: string;
  description: string;
  coverImage: string;
  images: string[];
  rating: number;
  reviewCount: number;
  basePrice: number;
  amenities: string[];
  status: string;
  accommodations: Accommodation[];
  offers: Offer[];
};

export type SpotSummary = {
  id: string;
  name: string;
  municipality: string;
  image: string;
  rating: number;
  reviewCount: number;
  price: number;
};

export type TouristSpot = {
  id: string;
  name: string;
  municipality: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  price: number;
};

export type Booking = {
  id: string;
  travelerId: string;
  travelerName: string;
  travelerEmail: string;
  travelerPhone: string;
  resortId: string;
  resortName: string;
  municipality: string;
  accommodationId: string;
  accommodationTitle: string;
  checkInDate: string;
  checkInTime: string;
  checkOutDate: string;
  nights: number;
  guestsCount: number;
  bedRequirements: string;
  specialRequests: string;
  totalPrice: number;
  status: "confirmed" | "pending" | "completed";
  paymentNote: string;
  createdAt: string;
};

// Chat — private threads between a traveler and a resort owner.

export type ChatRole = "traveler" | "owner";

export type ChatParty = {
  id: string;
  name: string;
  email: string | null;
  avatar: string | null;
  role: Role;
};

export type ChatResort = {
  id: string;
  name: string;
  municipality: string;
  coverImage: string | null;
};

export type ChatMessage = {
  id: string;
  conversationId: string;
  senderId: string | null;
  senderName: string;
  senderRole: Role | null;
  body: string;
  clientId: string | null;
  createdAt: string;
};

export type Conversation = {
  id: string;
  subject: string | null;
  status: "open" | "closed";
  myRole: ChatRole;
  otherParty: ChatParty | null;
  resort: ChatResort | null;
  bookingId: string | null;
  lastMessageAt: string | null;
  unreadCount: number;
  lastMessage: {
    id: string;
    senderId: string | null;
    senderName: string;
    body: string;
    createdAt: string;
  } | null;
  createdAt: string;
};

// Guest and Admin

export type NotificationKind =
  "booking" | "trip" | "offer" | "message" | "payment" | "system";

export type Notification = {
  id: string;
  kind: NotificationKind;
  title: string;
  body: string;
  /** ISO 8601 timestamp — drives both the "2h ago" label and the Today/Yesterday grouping. */
  createdAt: string;
  read: boolean;
};

export type Driver = {
  id: string;
  name: string;
  plateNumber: string;
  car: string;
  mobileNumber: string;
};

export type Hotel = {
  id: string;
  description: string;
};

export type Itineraries = {
  id: string;
  price: string;
  minicontent: string;
};

export type ItineraryDay = {
  id: string;
  title: string;
  notes: string[];
};

export type PackagePriceLine = {
  label: string;
  amount: number;
};

export type PackageReview = {
  id: string;
  name: string;
  rating: number;
  text: string;
};

export type ItineraryPackage = {
  id: string;
  spotId: string;
  resortId: string;
  startDate: string;
  days: ItineraryDay[];
  priceBreakdown: PackagePriceLine[];
  inclusions: string[];
  reviews: PackageReview[];
  destination?: string;
};

export type TimePickerSettings = Readonly<{
  hourCycle: 12 | 24;
  minuteInterval: 1 | 5 | 10 | 15 | 30;
}>;

export type ItineraryDates = Readonly<{
  dateArrival: string;
  dateDeparture: string;
  arrivalTime: string;
  departureTime: string;
  daysOfWeek: string[];
  timePicker: TimePickerSettings;
}>;

export type ButtonProps = Readonly<{
  title: string;
  onPress?: () => void;
  width?: string;
  height?: string;
  backgroundColor?: string;
  textColor?: string;
  textSize?: string;
  className?: string;
  textClassName?: string;
  gradient?: boolean;
}>;

export type Guest = {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date | null;
  phone: string;
  email: string;
};

export type ID = { id: number; name: string };

export type IoniconsName = ComponentProps<typeof Ionicons>["name"];

type PaymentMethodBase = {
  id: string;
  name: string;
  description?: string;
};

export type PaymentMethod =
  | (PaymentMethodBase & {
      iconType: "ionicon";
      icon: typeof Ionicons;
      iconName: IoniconsName;
    })
  | (PaymentMethodBase & {
      iconType: "svg";
      icon: ComponentType<SvgProps>;
    })
  | (PaymentMethodBase & {
      iconType: "image";
      image: ImageSourcePropType;
    });

export type Amenities = {
  name: string;
  icon: ComponentProps<typeof Ionicons>["name"];
};
