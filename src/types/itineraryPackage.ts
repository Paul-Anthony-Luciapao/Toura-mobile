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
  name: string;
  spotId: string;
  resortId: string;
  startDate: string;
  duration: string;
  price: number;
  priceBasis: "person" | "couple" | "family of 4";
  activities: string[];
  popular: boolean;
  days: ItineraryDay[];
  priceBreakdown: PackagePriceLine[];
  inclusions: string[];
  reviews: PackageReview[];
  destination?: string;
};
