/**
 * Toura - Palawan Curated Mock Database
 * Geographic focus: Palawan, Philippines
 */

import type {
  Booking,
  Driver,
  Hotel,
  Itineraries,
  ItineraryPackage,
  Notification,
  Resort,
  TouristSpot,
  User,
} from "./types";

export const INITIAL_USERS: User[] = [
  {
    id: "user-1",
    name: "Sofia Reyes",
    email: "sofia@traveler.ph",
    role: "traveler",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    phone: "+63 917 555 0192",
    joinedAt: "2025-11-10",
    status: "active",
  },
  {
    id: "user-2",
    name: "Mateo Cruz",
    email: "mateo@elnidobay.ph",
    role: "owner",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    phone: "+63 928 555 4821",
    resortId: "resort-1",
    joinedAt: "2025-08-15",
    status: "active",
  },
  {
    id: "user-3",
    name: "Carmen Salazar",
    email: "carmen@coroncove.ph",
    role: "owner",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    phone: "+63 919 555 9320",
    resortId: "resort-2",
    joinedAt: "2025-09-01",
    status: "active",
  },
  {
    id: "user-4",
    name: "Danilo Villanueva",
    email: "danilo@longbeach.ph",
    role: "owner",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    phone: "+63 930 555 7712",
    resortId: "resort-3",
    joinedAt: "2025-10-05",
    status: "active",
  },
  {
    id: "user-admin",
    name: "Toura Admin",
    email: "admin@toura.ph",
    role: "admin",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80",
    phone: "+63 917 000 0001",
    joinedAt: "2025-01-01",
    status: "active",
  },
];

export const INITIAL_RESORTS: Resort[] = [
  {
    id: "resort-1",
    ownerId: "user-2",
    name: "El Nido Bayview Cliffside Villas",
    tagline:
      "Perched above Bacuit Bay with private sunset terraces and crystal lagoon access",
    municipality: "El Nido",
    location: "Corong-Corong Beach, El Nido, Palawan",
    description:
      "Tucked against the limestone cliffs of El Nido overlooking Bacuit Bay, El Nido Bayview Cliffside Villas offers sustainable luxury and authentic Palawan hospitality. Each villa features panoramic floor-to-ceiling sea views, locally handwoven bamboo furnishings, open-air rainwater showers, and direct access to private kayak tours across hidden lagoons.",
    coverImage:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=85",
    images: [
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=85",
    ],
    rating: 4.92,
    reviewCount: 84,
    basePrice: 5800,
    amenities: [
      "Ocean View",
      "Infinity Pool",
      "Free Island Breakfast",
      "Private Kayak Rentals",
      "Starlink High-Speed Wi-Fi",
      "Airport Transfer",
      "Air Conditioning",
      "Spa & Massage",
    ],
    status: "published",
    accommodations: [
      {
        id: "acc-101",
        title: "Cliffside Ocean Suite",
        description:
          "Spacious master bedroom facing the sunset with a private wooden sun deck and outdoor copper soaking tub.",
        pricePerNight: 5800,
        capacity: 2,
        bedType: "1 King Bed",
        bedCount: 1,
        availableUnits: 4,
        size: "48 sqm",
        image:
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
        amenities: [
          "King Bed",
          "Private Terrace",
          "Rain Shower",
          "Mini Bar",
          "Sea View",
        ],
      },
      {
        id: "acc-102",
        title: "Bacuit Bay Deluxe Villa",
        description:
          "Two-level villa with living room, private plunge pool, and elevated bedroom with 270-degree bay vistas.",
        pricePerNight: 9200,
        capacity: 4,
        bedType: "1 King Bed + 2 Single Daybeds",
        bedCount: 3,
        availableUnits: 2,
        size: "82 sqm",
        image:
          "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80",
        amenities: [
          "Plunge Pool",
          "Outdoor Lounge",
          "Kitchenette",
          "Nespresso Machine",
          "Starlink Wi-Fi",
        ],
      },
      {
        id: "acc-103",
        title: "Family Canopy Loft",
        description:
          "Surrounded by rainforest palms, this spacious loft sleeps up to 6 guests with separate mezzanine sleeping quarters.",
        pricePerNight: 12500,
        capacity: 6,
        bedType: "2 Queen Beds + 2 Twin Bunk Beds",
        bedCount: 4,
        availableUnits: 2,
        size: "110 sqm",
        image:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
        amenities: [
          "2 Queen Beds",
          "2 Bunk Beds",
          "Dining Area",
          "2 Bathrooms",
          "Balcony",
        ],
      },
    ],
    offers: [
      {
        id: "off-1",
        title: "3D2N Bacuit Island Hopper Special",
        tag: "Best Value",
        description:
          "Includes 2 nights in Ocean Suite, complimentary private boat tour to Hidden Beach & Big Lagoon, daily gourmet breakfast, and airport shuttle.",
        discountRate: "18% OFF",
        validUntil: "2026-12-31",
        inclusions: [
          "Private Boat Tour A",
          "Daily Farm-to-Table Breakfast",
          "Airport Shuttle",
          "Sunset Cocktail Hour",
        ],
      },
      {
        id: "off-2",
        title: "Honeymoon & Sunset Serenade Package",
        tag: "Romance",
        description:
          "Romantic candlelit beachfront 4-course dinner, 60-min couple Hilot massage, and a complimentary bottle of chilled organic wine.",
        discountRate: "Free Spa + Dinner",
        validUntil: "2026-11-30",
        inclusions: [
          "Candlelight Dinner",
          "Couples Hilot Massage",
          "Chilled Wine",
          "Floral Bath",
        ],
      },
    ],
  },
  {
    id: "resort-2",
    ownerId: "user-3",
    name: "Coron Sanctuary Eco Cove",
    tagline:
      "Eco-chic overwater bungalows and dive retreat in the heart of Coron's coral sanctuaries",
    municipality: "Coron",
    location: "Busuanga Island, Coron, Palawan",
    description:
      "Nestled along an untouched marine sanctuary in Coron, this solar-powered sanctuary combines modern eco-architecture with underwater adventures. Directly off your veranda, snorkel with vibrant coral gardens or embark on world-class shipwreck scuba dives guided by PADI-certified locals.",
    coverImage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=85",
    images: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=85",
    ],
    rating: 4.88,
    reviewCount: 62,
    basePrice: 4900,
    amenities: [
      "Overwater Veranda",
      "PADI Dive Center",
      "Coral Reef Access",
      "Solar Powered",
      "Free Kayaks & Snorkel Gear",
      "Fresh Seafood Dining",
      "High-Speed Wi-Fi",
    ],
    status: "published",
    accommodations: [
      {
        id: "acc-201",
        title: "Overwater Lagoon Bungalow",
        description:
          "Built directly above the crystal lagoon with glass floor observation panels and private ladder into the water.",
        pricePerNight: 6400,
        capacity: 2,
        bedType: "1 Queen Bed",
        bedCount: 1,
        availableUnits: 5,
        size: "42 sqm",
        image:
          "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
        amenities: [
          "Glass Floor Panel",
          "Direct Lagoon Access",
          "Queen Bed",
          "Snorkel Kit",
        ],
      },
      {
        id: "acc-202",
        title: "Garden Beach Cottage",
        description:
          "Surrounded by native flowering frangipani and coconut palms, just 20 steps away from the powdery white sand.",
        pricePerNight: 4900,
        capacity: 3,
        bedType: "1 Queen Bed + 1 Single Bed",
        bedCount: 2,
        availableUnits: 6,
        size: "38 sqm",
        image:
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
        amenities: [
          "1 Queen Bed",
          "1 Single Bed",
          "Garden Terrace",
          "Outdoor Shower",
        ],
      },
    ],
    offers: [
      {
        id: "off-3",
        title: "Coron Wreck & Reef Diver's Package",
        tag: "Adventure",
        description:
          "Includes 3 nights stay, 4 guided dives to WWII Japanese shipwrecks and coral reefs with full gear rental included.",
        discountRate: "Save 25%",
        validUntil: "2026-10-31",
        inclusions: [
          "4 Guided Dives",
          "Full Equipment Rental",
          "Nitrox Available",
          "Daily Buffet Breakfast",
        ],
      },
    ],
  },
  {
    id: "resort-3",
    ownerId: "user-4",
    name: "San Vicente Sunset & Surf Retreat",
    tagline:
      "Unwind on the Philippines' longest 14-kilometer golden beach with barefoot tranquility",
    municipality: "San Vicente",
    location: "Long Beach, San Vicente, Palawan",
    description:
      "Located on the world-renowned Long Beach in San Vicente, this peaceful boutique sanctuary offers vast stretches of untouched golden sand, rolling waves, and dramatic sunsets. Perfect for digital nomads, surf enthusiasts, and travelers looking to slow down.",
    coverImage:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1400&q=85",
    images: [
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?auto=format&fit=crop&w=1200&q=85",
    ],
    rating: 4.85,
    reviewCount: 41,
    basePrice: 3800,
    amenities: [
      "14km Beach Access",
      "Surfboard Rentals",
      "Co-working Space",
      "Sunset Cocktail Lounge",
      "Pet Friendly",
      "Yoga Shala",
      "Starlink Wi-Fi",
    ],
    status: "published",
    accommodations: [
      {
        id: "acc-301",
        title: "Sunset Driftwood Cabin",
        description:
          "Rustic artisan cabin crafted from reclaimed hardwood with open ocean views and private hammock deck.",
        pricePerNight: 3800,
        capacity: 2,
        bedType: "1 Queen Bed",
        bedCount: 1,
        availableUnits: 6,
        size: "35 sqm",
        image:
          "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80",
        amenities: ["Queen Bed", "Hammock", "Ceiling Fan & AC", "Work Desk"],
      },
      {
        id: "acc-302",
        title: "Surfside Twin Suite",
        description:
          "Ideal for friends traveling together, featuring two plush double beds and surfboard storage.",
        pricePerNight: 4600,
        capacity: 4,
        bedType: "2 Double Beds",
        bedCount: 2,
        availableUnits: 4,
        size: "45 sqm",
        image:
          "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?auto=format&fit=crop&w=800&q=80",
        amenities: [
          "2 Double Beds",
          "Gear Storage",
          "Outdoor Shower",
          "Garden View",
        ],
      },
    ],
    offers: [
      {
        id: "off-4",
        title: "Stay 4 Pay 3 Long Beach Escape",
        tag: "Extended Stay",
        description:
          "Book 4 nights or more and get the 4th night completely free, including daily morning yoga and board rentals.",
        discountRate: "1 Night FREE",
        validUntil: "2026-12-15",
        inclusions: [
          "Free 4th Night",
          "Daily Sunrise Yoga",
          "Free Surfboards",
          "High-Speed Work Hub",
        ],
      },
    ],
  },
  {
    id: "resort-4",
    ownerId: "user-2",
    name: "Puerto Princesa Palawan Heritage Resort",
    tagline:
      "Tropical botanical gardens and heritage architecture near the Underground River",
    municipality: "Puerto Princesa",
    location: "Sabang Beach, Puerto Princesa, Palawan",
    description:
      "Surrounded by ancient tropical rainforests and coastal mangroves, this property provides the ideal gateway to the world-famous UNESCO Underground River. Features lagoon-style swimming pools, traditional Filipino culinary experiences, and wellness packages.",
    coverImage:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=85",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85",
    ],
    rating: 4.79,
    reviewCount: 53,
    basePrice: 4200,
    amenities: [
      "Lagoon Pool",
      "Underground River Tour Desk",
      "Botanical Gardens",
      "Traditional Filipino Dining",
      "Family Suites",
      "Airport Shuttle",
    ],
    status: "published",
    accommodations: [
      {
        id: "acc-401",
        title: "Heritage Garden Villa",
        description:
          "Handcrafted wooden interior with authentic Filipino motifs and a private garden veranda.",
        pricePerNight: 4200,
        capacity: 2,
        bedType: "1 King Bed",
        bedCount: 1,
        availableUnits: 8,
        size: "40 sqm",
        image:
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
        amenities: [
          "King Bed",
          "Garden Patio",
          "Air Conditioning",
          "Tea/Coffee Maker",
        ],
      },
    ],
    offers: [
      {
        id: "off-5",
        title: "UNESCO Underground River Explorer",
        tag: "Popular",
        description:
          "Includes official park permits, boat transfers, audio-guided cave tour, and buffet lunch by Sabang beach.",
        discountRate: "Complete Tour Included",
        validUntil: "2026-12-31",
        inclusions: [
          "Underground River Permit",
          "Boat Transfers",
          "Buffet Lunch",
          "Sabang Mangrove Paddle",
        ],
      },
    ],
  },
];

export const INITIAL_TOURIST_SPOTS: TouristSpot[] = [
  {
    id: "spot-1",
    name: "Kayangan Lake",
    rating: 4.9,
    reviewCount: 1300000,
    price: 1200,
    municipality: "Coron",
    category: "Lakes & Lagoons",
    description:
      "Reputed as the cleanest inland body of water in Asia, framed by soaring karst peaks and crystalline waters.",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
    tags: ["Snorkeling", "Limestone Cliffs", "Photography"],
  },
  {
    id: "spot-2",
    name: "Big Lagoon",
    rating: 4.9,
    reviewCount: 1300000,
    price: 1500,
    municipality: "El Nido",
    category: "Islands & Lagoons",
    description:
      "An iconic emerald lagoon flanked by majestic karst spires, ideal for serene kayaking and paddleboarding.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    tags: ["Kayaking", "Iconic Spot", "Marine Life"],
  },
  {
    id: "spot-3",
    name: "Nacpan Beach",
    rating: 4.0,
    reviewCount: 900000,
    price: 1000,
    municipality: "El Nido",
    category: "Beaches",
    description:
      "A 4-kilometer continuous stretch of golden powdery sand lined with swaying coconut palms and rolling surf.",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
    tags: ["Sunset", "Twin Beach", "Beach Bar"],
  },
  {
    id: "spot-4",
    name: "Puerto Princesa Subterranean River",
    rating: 5.0,
    reviewCount: 2000000,
    price: 5000,
    municipality: "Puerto Princesa",
    category: "UNESCO World Heritage",
    description:
      "One of the New 7 Wonders of Nature, featuring an 8.2 km navigable underground river through dramatic limestone caverns.",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    tags: ["UNESCO Site", "Cave Tour", "Eco Tourism"],
  },
  {
    id: "spot-5",
    name: "Long Beach",
    rating: 4.2,
    reviewCount: 1500000,
    price: 1310,
    municipality: "San Vicente",
    category: "Beaches",
    description:
      "The longest white/golden sand beach in the Philippines, stretching 14.7 kilometers along the turquoise West Philippine Sea.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    tags: ["Longest Beach", "Surfing", "Tranquil"],
  },
  {
    id: "spot-6",
    name: "Twin Lagoon",
    rating: 4.3,
    reviewCount: 1200000,
    price: 1450,
    municipality: "Coron",
    category: "Lakes & Lagoons",
    description:
      "Two breathtaking emerald lagoons separated by a limestone wall, connected by an underwater swim-through opening.",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    tags: ["Swim-Through", "Thermocline", "Scenic"],
  },
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: "TR-2026-881",
    travelerId: "user-1",
    travelerName: "Sofia Reyes",
    travelerEmail: "sofia@traveler.ph",
    travelerPhone: "+63 917 555 0192",
    resortId: "resort-1",
    resortName: "El Nido Bayview Cliffside Villas",
    municipality: "El Nido",
    accommodationId: "acc-101",
    accommodationTitle: "Cliffside Ocean Suite",
    checkInDate: "2026-09-15",
    checkInTime: "14:00",
    checkOutDate: "2026-09-18",
    nights: 3,
    guestsCount: 2,
    bedRequirements: "1 King Bed (Sunset facing)",
    specialRequests: "Quiet corner room requested. Celebrating anniversary.",
    totalPrice: 17400,
    status: "confirmed",
    paymentNote: "Pay on Arrival (Cash / Bank Transfer at Property)",
    createdAt: "2026-08-10T14:32:00Z",
  },
  {
    id: "TR-2026-882",
    travelerId: "user-1",
    travelerName: "Sofia Reyes",
    travelerEmail: "sofia@traveler.ph",
    travelerPhone: "+63 917 555 0192",
    resortId: "resort-2",
    resortName: "Coron Sanctuary Eco Cove",
    municipality: "Coron",
    accommodationId: "acc-201",
    accommodationTitle: "Overwater Lagoon Bungalow",
    checkInDate: "2026-10-02",
    checkInTime: "15:00",
    checkOutDate: "2026-10-05",
    nights: 3,
    guestsCount: 2,
    bedRequirements: "1 Queen Bed",
    specialRequests: "Need dive gear rental for 2 adults upon check-in.",
    totalPrice: 19200,
    status: "pending",
    paymentNote: "Pay on Arrival (Cash / Local payment)",
    createdAt: "2026-08-20T09:15:00Z",
  },
  {
    id: "TR-2026-750",
    travelerId: "user-1",
    travelerName: "Sofia Reyes",
    travelerEmail: "sofia@traveler.ph",
    travelerPhone: "+63 917 555 0192",
    resortId: "resort-3",
    resortName: "San Vicente Sunset & Surf Retreat",
    municipality: "San Vicente",
    accommodationId: "acc-301",
    accommodationTitle: "Sunset Driftwood Cabin",
    checkInDate: "2026-06-10",
    checkInTime: "14:00",
    checkOutDate: "2026-06-13",
    nights: 3,
    guestsCount: 2,
    bedRequirements: "1 Queen Bed",
    specialRequests: "Late arrival around 6 PM.",
    totalPrice: 11400,
    status: "completed",
    paymentNote: "Paid at Property",
    createdAt: "2026-05-28T11:00:00Z",
  },
];

export const PALAWAN_MUNICIPALITIES: string[] = [
  "All Palawan",
  "Aborlan",
  "Agutaya",
  "Araceli",
  "Balabac",
  "Bataraza",
  "Brooke's Point",
  "Busuanga",
  "Cagayancillo",
  "Coron",
  "Culion",
  "Cuyo",
  "Dumaran",
  "El Nido",
  "Kalayaan",
  "Linapacan",
  "Magsaysay",
  "Narra",
  "Quezon",
  "Rizal",
  "Roxas",
  "San Vicente",
  "Sofronio Española",
  "Taytay",
];

/**
 * Notifications are timestamped relative to "now" so the Today / Yesterday /
 * Earlier grouping and the "2h ago" labels always look alive in the demo.
 */
const hoursAgo = (hours: number) =>
  new Date(Date.now() - hours * 3_600_000).toISOString();

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: "notif-1",
    kind: "booking",
    title: "Booking confirmed",
    body: "Coron Cove Resort — 2 nights for 2 guests. Show this booking at check-in.",
    createdAt: hoursAgo(0.6),
    read: false,
  },
  {
    id: "notif-2",
    kind: "trip",
    title: "Your trip starts soon",
    body: "Kayangan Lake island hop departs from Coron town wharf. Meet your guide 30 minutes early.",
    createdAt: hoursAgo(3),
    read: false,
  },
  {
    id: "notif-3",
    kind: "offer",
    title: "20% off El Nido lagoon tours",
    body: "Weekday departures only. Book by Sunday to lock in the rate.",
    createdAt: hoursAgo(7),
    read: false,
  },
  {
    id: "notif-4",
    kind: "message",
    title: "Message from Danilo Villanueva",
    body: "Hi! I confirmed your airport transfer from Puerto Princesa. What time does your flight land?",
    createdAt: hoursAgo(26),
    read: false,
  },
  {
    id: "notif-5",
    kind: "payment",
    title: "Payment received",
    body: "PHP 11,400 paid for your Big Lagoon escape. A receipt was emailed to you.",
    createdAt: hoursAgo(31),
    read: true,
  },
  {
    id: "notif-6",
    kind: "booking",
    title: "Stay completed",
    body: "Thanks for staying at Long Beach Garden Hotel. Leave a review to help other travellers.",
    createdAt: hoursAgo(52),
    read: true,
  },
  {
    id: "notif-7",
    kind: "system",
    title: "New feature: saved itineraries",
    body: "You can now build and share multi-day Palawan itineraries from the Itinerary tab.",
    createdAt: hoursAgo(84),
    read: true,
  },
  {
    id: "notif-8",
    kind: "trip",
    title: "Weather advisory for Busuanga",
    body: "Moderate seas expected this weekend. Your tour operator may reschedule the dive trip.",
    createdAt: hoursAgo(200),
    read: true,
  },
];

// dates for the mock booking calendar, used in the demo to show available dates and days of the week

export const Dates = [
  {
    dateArrival: "2023-10-01",
    dateDeparture: "2023-10-05",
    daysOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
  },
  {
    dateArrival: "2023-10-10",
    dateDeparture: "2023-10-15",
    daysOfWeek: [
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  },
  {
    dateArrival: "2023-10-20",
    dateDeparture: "2023-10-25",
    daysOfWeek: [
      "Friday",
      "Saturday",
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
    ],
  },
  {
    dateArrival: "2023-11-01",
    dateDeparture: "2023-11-05",
    daysOfWeek: ["Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  },
  {
    dateArrival: "2023-11-10",
    dateDeparture: "2023-11-15",
    daysOfWeek: [
      "Friday",
      "Saturday",
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
    ],
  },
];

export const daysOfWeek = [
  { id: "0", name: "Sunday" },
  { id: "1", name: "Monday" },
  { id: "2", name: "Tuesday" },
  { id: "3", name: "Wednesday" },
  { id: "4", name: "Thursday" },
  { id: "5", name: "Friday" },
  { id: "6", name: "Saturday" },
];

export const DAY_DESCRIPTIONS = [
  "Arrival in the Philippines",
  "Underground River Tour Day",
  "Transfer to Coron",
  "Arrival in the Philippines",
  "Departure",
] as const;

export const HOTEL_DESCRIPTION: Hotel[] = [
  {
    id: "hotel-1",
    description:
      "A peaceful tropical retreat surrounded by lush greenery and beautiful coastal views, offering comfortable rooms, warm Filipino hospitality, and easy access to nearby attractions.",
  },
  {
    id: "hotel-2",
    description:
      "A modern beachfront escape designed for travelers who want to relax by the sea while enjoying comfortable accommodations, refreshing amenities, and stunning tropical sunsets.",
  },
  {
    id: "hotel-3",
    description:
      "A charming island resort featuring spacious rooms, natural surroundings, and convenient access to crystal-clear waters, making it an ideal base for snorkeling, island hopping, and beach adventures.",
  },
  {
    id: "hotel-4",
    description:
      "A cozy boutique hotel in the heart of Palawan, combining contemporary comfort with local character and providing guests with a relaxing stay close to restaurants, shops, and popular attractions.",
  },
  {
    id: "hotel-5",
    description:
      "A secluded eco-friendly retreat surrounded by tropical forests and pristine beaches, perfect for travelers looking for tranquility, nature, and unforgettable outdoor experiences.",
  },
  {
    id: "hotel-6",
    description:
      "A family-friendly resort offering spacious accommodations, recreational facilities, and convenient access to the beach, creating a comfortable and enjoyable stay for guests of all ages.",
  },
  {
    id: "hotel-7",
    description:
      "A luxurious coastal hideaway with elegant rooms, private outdoor spaces, and breathtaking ocean views, perfect for romantic getaways, special occasions, and relaxing vacations.",
  },
  {
    id: "hotel-8",
    description:
      "A laid-back beach resort where guests can enjoy peaceful mornings, golden sunsets, and easy access to swimming, kayaking, island tours, and other tropical activities.",
  },
  {
    id: "resort-9",
    description:
      "A nature-inspired accommodation surrounded by palm trees, gardens, and tropical landscapes, offering a quiet atmosphere while keeping guests within reach of Palawan's most popular destinations.",
  },
  {
    id: "hotel-10",
    description:
      "A welcoming Palawan resort that blends modern comforts with authentic island charm, featuring comfortable accommodations, friendly service, and an ideal location for exploring the area's beaches and natural wonders.",
  },
] as const;

export const DRIVERS: readonly Driver[] = [
  {
    id: "driver-1",
    name: "Mark Anthony Santos",
    plateNumber: "ABC 1234",
    car: "Toyota Vios",
    mobileNumber: "+63 917 123 4567",
  },
  {
    id: "driver-2",
    name: "Juan Carlo Reyes",
    plateNumber: "BCD 2345",
    car: "Toyota Innova",
    mobileNumber: "+63 918 234 5678",
  },
  {
    id: "driver-3",
    name: "Miguel Garcia",
    plateNumber: "CDE 3456",
    car: "Mitsubishi Xpander",
    mobileNumber: "+63 919 345 6789",
  },
  {
    id: "driver-4",
    name: "Daniel Cruz",
    plateNumber: "DEF 4567",
    car: "Toyota Avanza",
    mobileNumber: "+63 920 456 7890",
  },
  {
    id: "driver-5",
    name: "Rafael Mendoza",
    plateNumber: "EFG 5678",
    car: "Hyundai Staria",
    mobileNumber: "+63 921 567 8901",
  },
  {
    id: "driver-6",
    name: "Paolo Villanueva",
    plateNumber: "FGH 6789",
    car: "Toyota HiAce",
    mobileNumber: "+63 922 678 9012",
  },
  {
    id: "driver-7",
    name: "Andrei Navarro",
    plateNumber: "GHI 7890",
    car: "Suzuki Ertiga",
    mobileNumber: "+63 923 789 0123",
  },
  {
    id: "driver-8",
    name: "Christian Bautista",
    plateNumber: "HJK 8901",
    car: "Toyota Innova",
    mobileNumber: "+63 924 890 1234",
  },
  {
    id: "driver-9",
    name: "Kevin Dela Cruz",
    plateNumber: "JKL 9012",
    car: "Mitsubishi Adventure",
    mobileNumber: "+63 925 901 2345",
  },
  {
    id: "driver-10",
    name: "Jerome Aquino",
    plateNumber: "KLM 0123",
    car: "Toyota Fortuner",
    mobileNumber: "+63 926 012 3456",
  },
] as const;

export const ItineraryPackages: Itineraries[] = [
  { id: "01", price: "₱5,000", minicontent: "" },
  { id: "02", price: "₱7,500", minicontent: "" },
  { id: "03", price: "₱10,000", minicontent: "" },
  { id: "04", price: "₱12,500", minicontent: "" },
  { id: "05", price: "₱15,000", minicontent: "" },
  { id: "06", price: "₱18,000", minicontent: "" },
  { id: "07", price: "₱20,000", minicontent: "" },
  { id: "08", price: "₱25,000", minicontent: "" },
  { id: "09", price: "₱30,000", minicontent: "" },
  { id: "10", price: "₱35,000", minicontent: "" },
];

// TODO: These itinerary schedules, prices, dates, and reviews are hardcoded demo data.
const packageSpecs = [
  {
    spotId: "spot-1",
    resortId: "resort-2",
    startDate: "2026-10-10",
    titles: [
      "Arrive in Coron",
      "Kayangan Lake",
      "Coron town",
      "Island hopping",
      "Departure",
    ],
    inclusions: [
      "Resort stay",
      "Guided lake tour",
      "Airport transfers",
      "Local permits",
    ],
    review: {
      id: "review-1",
      name: "Marites",
      rating: 4,
      text: "The lake tour and clear day-by-day plan made this trip easy to enjoy.",
    },
  },
  {
    spotId: "spot-2",
    resortId: "resort-1",
    startDate: "2026-10-17",
    titles: [
      "Arrive in El Nido",
      "Big Lagoon",
      "Island beaches",
      "Coastal day",
      "Departure",
    ],
    inclusions: [
      "Resort stay",
      "Lagoon excursion",
      "Boat transfers",
      "Local permits",
    ],
    review: {
      id: "review-2",
      name: "Ana",
      rating: 5,
      text: "The lagoon day was a highlight, and the included transfers were helpful.",
    },
  },
  {
    spotId: "spot-3",
    resortId: "resort-1",
    startDate: "2026-10-24",
    titles: [
      "Arrive in El Nido",
      "Nacpan Beach",
      "Beach and town",
      "Free exploration",
      "Departure",
    ],
    inclusions: ["Resort stay", "Beach transfer", "Breakfast", "Local guide"],
    review: {
      id: "review-3",
      name: "Paolo",
      rating: 4,
      text: "A relaxed schedule with enough time to enjoy the beach.",
    },
  },
  {
    spotId: "spot-4",
    resortId: "resort-4",
    startDate: "2026-10-31",
    titles: [
      "Arrive in Puerto Princesa",
      "Underground River",
      "Sabang coast",
      "City tour",
      "Departure",
    ],
    inclusions: ["Resort stay", "River tour", "Boat transfer", "Park permits"],
    review: {
      id: "review-4",
      name: "Liza",
      rating: 5,
      text: "The river tour and pickup details were clear and convenient.",
    },
  },
  {
    spotId: "spot-5",
    resortId: "resort-3",
    startDate: "2026-11-07",
    titles: [
      "Arrive in San Vicente",
      "Long Beach",
      "Surf and coast",
      "Free beach day",
      "Departure",
    ],
    inclusions: [
      "Resort stay",
      "Beach transfer",
      "Breakfast",
      "Surfboard rental",
    ],
    review: {
      id: "review-5",
      name: "Nico",
      rating: 4,
      text: "A peaceful trip with a good balance of planned activities and free time.",
    },
  },
  {
    spotId: "spot-6",
    resortId: "resort-2",
    startDate: "2026-11-14",
    titles: [
      "Arrive in Coron",
      "Twin Lagoon",
      "Reef excursion",
      "Coron town",
      "Departure",
    ],
    inclusions: [
      "Resort stay",
      "Lagoon excursion",
      "Boat transfers",
      "Snorkel gear",
    ],
    review: {
      id: "review-6",
      name: "Bea",
      rating: 5,
      text: "The lagoon and snorkeling days were well organized.",
    },
  },
] as const;

const demoImage = (photoId: string, width = 800) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${width}&q=80`;

export const DEMO_OTHER_DESTINATION_SPOTS: TouristSpot[] = [
  {
    id: "spot-7",
    name: "Kawasan Falls",
    rating: 4.8,
    reviewCount: 1100000,
    price: 1100,
    municipality: "Badian",
    category: "Waterfalls",
    description:
      "A multi-tiered turquoise waterfall in Badian, popular for swimming and canyoneering.",
    image: demoImage("photo-1544551763-46a013bb70d5"),
    tags: ["Canyoneering", "Waterfalls", "Swimming"],
  },
  {
    id: "spot-8",
    name: "Mines View Park",
    rating: 4.7,
    reviewCount: 600000,
    price: 500,
    municipality: "Baguio City",
    category: "Viewpoints",
    description:
      "A mountain-top lookout over the Cordillera ranges with a lively souvenir market.",
    image: demoImage("photo-1540555700478-4be289fbecef"),
    tags: ["Viewpoint", "Souvenirs", "Cool Weather"],
  },
  {
    id: "spot-9",
    name: "Cloud 9 Boardwalk",
    rating: 4.6,
    reviewCount: 800000,
    price: 900,
    municipality: "General Luna",
    category: "Surf Spots",
    description:
      "A palm-fringed boardwalk leading to Siargao's most famous surf break.",
    image: demoImage("photo-1512343879784-a960bf40e7f2"),
    tags: ["Surfing", "Boardwalk", "Sunrise"],
  },
  {
    id: "spot-10",
    name: "Calle Crisologo",
    rating: 4.5,
    reviewCount: 400000,
    price: 700,
    municipality: "Vigan City",
    category: "Heritage Streets",
    description:
      "A cobblestone street lined with Spanish-era ancestral houses in Vigan's historic district.",
    image: demoImage("photo-1500648767791-00dcc994a43e"),
    tags: ["Heritage", "Cobblestone", "Kalesa Ride"],
  },
];

type DemoResortInput = {
  id: string;
  name: string;
  tagline: string;
  municipality: string;
  location: string;
  coverPhotoId: string;
  roomPhotoId: string;
  basePrice: number;
  amenities: string[];
  room: {
    id: string;
    title: string;
    bedType: string;
    bedCount: number;
    size: string;
    capacity: number;
  };
};

const buildDemoResort = (input: DemoResortInput): Resort => ({
  id: input.id,
  ownerId: "user-2",
  name: input.name,
  tagline: input.tagline,
  municipality: input.municipality,
  location: input.location,
  description: `${input.tagline}. This listing is sample data.`,
  coverImage: demoImage(input.coverPhotoId, 1400),
  images: [
    demoImage(input.coverPhotoId, 1200),
    demoImage(input.roomPhotoId, 1200),
  ],
  rating: 4.7,
  reviewCount: 30,
  basePrice: input.basePrice,
  amenities: input.amenities,
  status: "published",
  accommodations: [
    {
      id: input.room.id,
      title: input.room.title,
      description: "Comfortable sample room.",
      pricePerNight: input.basePrice,
      capacity: input.room.capacity,
      bedType: input.room.bedType,
      bedCount: input.room.bedCount,
      availableUnits: 5,
      size: input.room.size,
      image: demoImage(input.roomPhotoId),
      amenities: ["Air Conditioning", "Private Bathroom", "Free Wi-Fi"],
    },
  ],
  offers: [],
});

export const DEMO_OTHER_DESTINATION_RESORTS: Resort[] = [
  buildDemoResort({
    id: "resort-5",
    name: "Badian Canyon Lodge",
    tagline: "Riverside rooms minutes from the Kawasan Falls trailhead",
    municipality: "Badian",
    location: "Badian, Cebu",
    coverPhotoId: "photo-1544551763-46a013bb70d5",
    roomPhotoId: "photo-1578683010236-d716f9a3f461",
    basePrice: 4500,
    amenities: [
      "River View",
      "Free Breakfast",
      "Airport Transfer",
      "Free Wi-Fi",
    ],
    room: {
      id: "acc-501",
      title: "Riverside Twin Room",
      bedType: "2 Single Beds",
      bedCount: 2,
      size: "30 sqm",
      capacity: 2,
    },
  }),
  buildDemoResort({
    id: "resort-6",
    name: "Pine Hill Mountain Lodge",
    tagline: "Cozy pine-lined rooms with cool-weather mountain views",
    municipality: "Baguio City",
    location: "Baguio City, Benguet",
    coverPhotoId: "photo-1540555700478-4be289fbecef",
    roomPhotoId: "photo-1566073771259-6a8506099945",
    basePrice: 3200,
    amenities: [
      "Mountain View",
      "Free Breakfast",
      "Fireplace Lounge",
      "Free Wi-Fi",
    ],
    room: {
      id: "acc-601",
      title: "Pine View Queen Room",
      bedType: "1 Queen Bed",
      bedCount: 1,
      size: "28 sqm",
      capacity: 2,
    },
  }),
  buildDemoResort({
    id: "resort-7",
    name: "General Luna Surf Lodge",
    tagline: "Barefoot beachside rooms a short walk from the surf breaks",
    municipality: "General Luna",
    location: "General Luna, Siargao",
    coverPhotoId: "photo-1512343879784-a960bf40e7f2",
    roomPhotoId: "photo-1499793983690-e29da59ef1c2",
    basePrice: 5200,
    amenities: [
      "Beach Access",
      "Surfboard Rentals",
      "Free Breakfast",
      "Free Wi-Fi",
    ],
    room: {
      id: "acc-701",
      title: "Surfside Double Room",
      bedType: "2 Double Beds",
      bedCount: 2,
      size: "32 sqm",
      capacity: 4,
    },
  }),
  buildDemoResort({
    id: "resort-8",
    name: "Heritage House Vigan",
    tagline: "Restored ancestral house steps from the cobblestone streets",
    municipality: "Vigan City",
    location: "Vigan City, Ilocos Sur",
    coverPhotoId: "photo-1500648767791-00dcc994a43e",
    roomPhotoId: "photo-1571003123894-1f0594d2b5d9",
    basePrice: 3000,
    amenities: [
      "Heritage Architecture",
      "Free Breakfast",
      "Walkable Location",
      "Free Wi-Fi",
    ],
    room: {
      id: "acc-801",
      title: "Ancestral Queen Room",
      bedType: "1 Queen Bed",
      bedCount: 1,
      size: "30 sqm",
      capacity: 2,
    },
  }),
];

/** Palawan fixtures + demo destinations. Used by the package list and detail screens. */
export const PACKAGE_SPOTS: TouristSpot[] = [
  ...INITIAL_TOURIST_SPOTS,
  ...DEMO_OTHER_DESTINATION_SPOTS,
];

export const PACKAGE_RESORTS: Resort[] = [
  ...INITIAL_RESORTS,
  ...DEMO_OTHER_DESTINATION_RESORTS,
];

type PackageSpec = {
  spotId: string;
  resortId: string;
  startDate: string;
  /** Matches the chip names on the Tour Packages screen. Defaults to "Palawan". */
  destination?: string;
  titles: readonly string[];
  inclusions: readonly string[];
  review: { id: string; name: string; rating: number; text: string };
};

// TODO(demo-data): hardcoded demo schedules, dates and reviews, like packageSpecs above.
const DEMO_PACKAGE_SPECS: PackageSpec[] = [
  {
    spotId: "spot-7",
    resortId: "resort-5",
    startDate: "2026-11-21",
    destination: "Cebu",
    titles: [
      "Arrive in Cebu",
      "Kawasan Falls",
      "Cebu City",
      "Island hopping",
      "Departure",
    ],
    inclusions: [
      "Lodge stay",
      "Falls and canyoneering",
      "Transfers",
      "Breakfast",
    ],
    review: {
      id: "review-7",
      name: "Karla",
      rating: 5,
      text: "The falls day was the highlight, and the transfers were smooth.",
    },
  },
  {
    spotId: "spot-8",
    resortId: "resort-6",
    startDate: "2026-11-28",
    destination: "Baguio",
    titles: [
      "Arrive in Baguio",
      "Mines View Park",
      "Strawberry farm",
      "Baguio city",
      "Departure",
    ],
    inclusions: ["Lodge stay", "City tour", "Transfers", "Breakfast"],
    review: {
      id: "review-8",
      name: "Rica",
      rating: 4,
      text: "Cool weather, nice views and a relaxed schedule.",
    },
  },
  {
    spotId: "spot-9",
    resortId: "resort-7",
    startDate: "2026-12-05",
    destination: "Siargao",
    titles: [
      "Arrive in Siargao",
      "Cloud 9",
      "Island hopping",
      "Surf day",
      "Departure",
    ],
    inclusions: ["Lodge stay", "Surf lesson", "Island tour", "Breakfast"],
    review: {
      id: "review-9",
      name: "Dennis",
      rating: 4,
      text: "Great surf lesson and a good mix of planned and free days.",
    },
  },
  {
    spotId: "spot-10",
    resortId: "resort-8",
    startDate: "2026-12-12",
    destination: "Vigan",
    titles: [
      "Arrive in Vigan",
      "Calle Crisologo",
      "Heritage houses",
      "Pottery and weaving",
      "Departure",
    ],
    inclusions: ["Heritage stay", "Kalesa ride", "Guided walk", "Breakfast"],
    review: {
      id: "review-10",
      name: "Tess",
      rating: 5,
      text: "Walking the old streets with a guide made the history come alive.",
    },
  },
];

function buildItineraryPackage(spec: PackageSpec): ItineraryPackage {
  const spot = PACKAGE_SPOTS.find((item) => item.id === spec.spotId);
  const resort = PACKAGE_RESORTS.find((item) => item.id === spec.resortId);

  if (!spot || !resort) {
    throw new Error(`Missing mock data for itinerary ${spec.spotId}`);
  }

  return {
    id: spec.spotId,
    spotId: spec.spotId,
    resortId: spec.resortId,
    startDate: spec.startDate,
    destination: spec.destination ?? "Palawan",
    days: spec.titles.map((title, index) => ({
      id: `day-${index + 1}`,
      title,
      notes: [
        `${title} activities and timing are sample itinerary details.`,
        "Confirm pickup times and operators before travel.",
      ],
    })),
    // Demo estimate derived from existing mock prices; not a live quote.
    priceBreakdown: [
      { label: "Accommodation (4 nights)", amount: resort.basePrice * 4 },
      { label: "Tours and activities", amount: spot.price * 4 },
      { label: "Transfers", amount: 2400 },
      { label: "Permits and fees", amount: 1200 },
    ],
    inclusions: [...spec.inclusions],
    reviews: [{ ...spec.review }],
  };
}

export const INITIAL_ITINERARY_PACKAGES: ItineraryPackage[] = [
  ...packageSpecs,
  ...DEMO_PACKAGE_SPECS,
].map((spec) => buildItineraryPackage(spec));
