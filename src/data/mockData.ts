/**
 * Toura - Palawan Curated Mock Database
 * Geographic focus: Palawan, Philippines
 */

import type { Booking, Resort, TouristSpot, User } from "./types";

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
    reviewCount: "1.3M",
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
    reviewCount: "1.3M",
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
    reviewCount: "900k",
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
    reviewCount: "2M",
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
    reviewCount: "1.5M",
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
    reviewCount: "1.2M",
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
