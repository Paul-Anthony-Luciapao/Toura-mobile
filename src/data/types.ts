export type Role = "traveler" | "owner" | "admin";

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
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

export type TouristSpot = {
  id: string;
  name: string;
  municipality: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  rating: number;
  reviewCount: string;
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

// Guest and Admin
