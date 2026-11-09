import { INITIAL_RESORTS, INITIAL_TOURIST_SPOTS } from "./mockData";
import type { Resort, TouristSpot } from "./types";
import type { ItineraryPackage } from "../types/itineraryPackage";

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
    dayNotes: [
      [
        "Arrive in Coron and transfer to the resort for check-in.",
        "Review the next day's lake tour and local permit requirements.",
      ],
      [
        "Visit Kayangan Lake, reached by a short uphill walk to the viewpoint and lake.",
        "Allow time for swimming and enjoy the limestone scenery.",
      ],
      [
        "Explore Coron town and its local shops and eateries.",
        "Keep the afternoon flexible for a relaxed resort stay.",
      ],
      [
        "Take a guided boat trip to nearby islands and snorkeling spots.",
        "Bring sun protection and follow the guide's safety instructions.",
      ],
      [
        "Check out and transfer to the airport or ferry terminal.",
        "Confirm departure time and transport arrangements with the resort.",
      ],
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
    dayNotes: [
      [
        "Arrive in El Nido and transfer to the resort for check-in.",
        "Confirm the boat tour departure point and permit requirements.",
      ],
      [
        "Explore Big Lagoon by kayak or boat with a local tour guide.",
        "Follow local access rules and allow time for the lagoon's narrow entrance.",
      ],
      [
        "Visit nearby island beaches on a guided boat excursion.",
        "Take breaks for swimming and snorkeling when conditions allow.",
      ],
      [
        "Enjoy a flexible coastal day around El Nido.",
        "Ask the resort about nearby beaches and current sea conditions.",
      ],
      [
        "Check out and transfer to the airport or ferry terminal.",
        "Confirm departure time and transport arrangements with the resort.",
      ],
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
    dayNotes: [
      [
        "Arrive in El Nido and settle in at the resort.",
        "Confirm the land transfer to Nacpan Beach for the following day.",
      ],
      [
        "Spend the day at Nacpan Beach, known for its long stretch of sand.",
        "Check local swimming conditions and arrange return transport in advance.",
      ],
      [
        "Enjoy a relaxed beach morning before exploring El Nido town.",
        "Try local restaurants and browse the town at your own pace.",
      ],
      [
        "Keep the day open for another beach visit or a rest at the resort.",
        "Ask locally about weather, transport, and optional activities.",
      ],
      [
        "Check out and transfer to the airport or ferry terminal.",
        "Confirm departure time and transport arrangements with the resort.",
      ],
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
    dayNotes: [
      [
        "Arrive in Puerto Princesa and transfer to the resort.",
        "Confirm pickup time and the permits needed for the river tour.",
      ],
      [
        "Travel to Sabang for a guided boat tour of the Puerto Princesa Underground River.",
        "Follow park guidance and allow for the road and boat transfers.",
      ],
      [
        "Explore the Sabang coast and enjoy time by the shore.",
        "Keep the schedule flexible around weather and boat conditions.",
      ],
      [
        "Visit selected Puerto Princesa city highlights with a local guide.",
        "Confirm the route and stops with the tour operator.",
      ],
      [
        "Check out and transfer to the airport or ferry terminal.",
        "Confirm departure time and transport arrangements with the resort.",
      ],
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
    dayNotes: [
      [
        "Arrive in San Vicente and check in at the resort.",
        "Confirm transfers to Long Beach and any planned activities.",
      ],
      [
        "Explore Long Beach and enjoy its wide shoreline.",
        "Bring sun protection and check local swimming conditions.",
      ],
      [
        "Try a surf session or enjoy the coastline at your own pace.",
        "Arrange board rental and lessons with a local operator if needed.",
      ],
      [
        "Enjoy a flexible beach day with time to relax or revisit a favorite spot.",
        "Check transport availability before heading out.",
      ],
      [
        "Check out and transfer to the airport or ferry terminal.",
        "Confirm departure time and transport arrangements with the resort.",
      ],
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
    dayNotes: [
      [
        "Arrive in Coron and transfer to the resort for check-in.",
        "Confirm the lagoon tour's meeting point and equipment needs.",
      ],
      [
        "Visit Twin Lagoon by boat and experience its connected lagoons.",
        "Follow the guide's advice about swimming conditions and access.",
      ],
      [
        "Join a guided reef excursion for snorkeling around Coron's marine sites.",
        "Use reef-safe practices and follow local marine guidelines.",
      ],
      [
        "Explore Coron town and enjoy time for local food and shopping.",
        "Keep the afternoon open to rest after the boat excursions.",
      ],
      [
        "Check out and transfer to the airport or ferry terminal.",
        "Confirm departure time and transport arrangements with the resort.",
      ],
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
  {
    spotId: "spot-13",
    resortId: "resort-1",
    startDate: "2026-11-21",
    titles: [
      "Arrive in El Nido",
      "Lio Beach",
      "Island and coastline",
      "Free beach day",
      "Departure",
    ],
    dayNotes: [
      [
        "Arrive in El Nido and transfer to the resort for check-in.",
        "Confirm local transport to Lio Beach and the next day's plans.",
      ],
      [
        "Spend the day at Lio Beach, with time to swim and relax by the shore.",
        "Check local sea conditions and follow beach safety guidance.",
      ],
      [
        "Explore the El Nido coastline or join an optional local island excursion.",
        "Confirm boat availability and weather conditions before departure.",
      ],
      [
        "Enjoy a flexible beach day for swimming, dining, or resting at the resort.",
        "Arrange any local transportation with the resort in advance.",
      ],
      [
        "Check out and transfer to the airport or ferry terminal.",
        "Confirm departure time and transport arrangements with the resort.",
      ],
    ],
    inclusions: [
      "Resort stay",
      "Lio Beach transfer",
      "Breakfast",
      "Local transport assistance",
    ],
    review: {
      id: "review-7",
      name: "Mika",
      rating: 5,
      text: "A relaxing El Nido stay with plenty of time to enjoy Lio Beach.",
    },
  },
  {
    spotId: "spot-9",
    resortId: "resort-4",
    startDate: "2026-11-28",
    titles: [
      "Arrive in Puerto Princesa",
      "Travel to Balabac",
      "Balabac island hopping",
      "Sandbars and beaches",
      "Return to Puerto Princesa",
    ],
    dayNotes: [
      [
        "Arrive in Puerto Princesa and check in at the resort.",
        "Confirm the overland transfer, boat schedule, and permits with the tour operator.",
      ],
      [
        "Travel south toward Balabac and follow the operator's planned land and boat transfers.",
        "This route is long; confirm transport and overnight arrangements before booking.",
      ],
      [
        "Explore Balabac's islands and beaches with a local boat operator.",
        "The island route depends on weather, tides, and local conditions.",
      ],
      [
        "Visit available sandbars and beaches on a guided excursion.",
        "Bring drinking water, sun protection, and any essentials recommended by the guide.",
      ],
      [
        "Return toward Puerto Princesa using the pre-arranged land and boat transfers.",
        "Allow schedule flexibility and confirm onward travel after reaching the city.",
      ],
    ],
    inclusions: [
      "Puerto Princesa resort stay",
      "Balabac land and boat transfers",
      "Guided island-hopping tour",
      "Local permits and fees",
    ],
    review: {
      id: "review-8",
      name: "Janelle",
      rating: 5,
      text: "Balabac's beaches were beautiful, and confirming transfers early made the trip easier.",
    },
  },
  {
    spotId: "spot-10",
    resortId: "resort-1",
    startDate: "2026-12-05",
    titles: [
      "Arrive in El Nido",
      "Matinloc Island",
      "Hidden beaches and coves",
      "Coastal exploration",
      "Departure",
    ],
    dayNotes: [
      [
        "Arrive in El Nido and check in at the resort.",
        "Confirm the boat tour schedule, meeting point, and local access requirements.",
      ],
      [
        "Visit Matinloc Island as part of a guided Bacuit Archipelago boat excursion.",
        "Stops and swimming access may vary with sea and weather conditions.",
      ],
      [
        "Explore nearby beaches and coves with the boat tour operator.",
        "Follow the guide's advice and take care around rocky shorelines.",
      ],
      [
        "Enjoy a flexible day for another local excursion or time in El Nido town.",
        "Arrange optional activities locally and confirm current conditions.",
      ],
      [
        "Check out and transfer to the airport or ferry terminal.",
        "Confirm departure time and transport arrangements with the resort.",
      ],
    ],
    inclusions: [
      "El Nido resort stay",
      "Matinloc Island boat excursion",
      "Boat transfers",
      "Local permits",
    ],
    review: {
      id: "review-9",
      name: "Luis",
      rating: 5,
      text: "The Matinloc Island tour had incredible scenery and a well-paced boat day.",
    },
  },
  {
    spotId: "spot-11",
    resortId: "resort-1",
    startDate: "2026-12-12",
    titles: [
      "Arrive in El Nido",
      "Transfer to Darocotan Island",
      "Island and reef day",
      "Beach and free time",
      "Return to El Nido",
    ],
    dayNotes: [
      [
        "Arrive in El Nido and check in at the resort.",
        "Confirm the land and boat transfers to Darocotan Island in advance.",
      ],
      [
        "Travel to Darocotan Island with the arranged local transfers.",
        "Check boat departure times and luggage guidance with your operator.",
      ],
      [
        "Explore the island coastline and nearby reef areas where conditions allow.",
        "Use reef-safe practices and follow local guidance for swimming and snorkeling.",
      ],
      [
        "Enjoy a relaxed beach day and time to explore the island.",
        "Confirm meal and return-boat arrangements with your host or operator.",
      ],
      [
        "Return to El Nido by the pre-arranged boat and land transfers.",
        "Allow extra time for weather-related schedule changes.",
      ],
    ],
    inclusions: [
      "El Nido resort stay",
      "Darocotan Island transfers",
      "Local island excursion",
      "Breakfast",
    ],
    review: {
      id: "review-10",
      name: "Rina",
      rating: 5,
      text: "Darocotan was peaceful, and the island stay made it easy to slow down.",
    },
  },
  {
    spotId: "spot-12",
    resortId: "resort-1",
    startDate: "2026-12-19",
    titles: [
      "Arrive in El Nido",
      "Boat trip to Catian Island",
      "Island and lagoon exploration",
      "Coastal day",
      "Departure",
    ],
    dayNotes: [
      [
        "Arrive in El Nido and check in at the resort.",
        "Confirm the Catian Island tour route and departure point with a local operator.",
      ],
      [
        "Take a guided boat trip to Catian Island.",
        "Verify the destination name, route, and access conditions with the operator before departure.",
      ],
      [
        "Explore the island and nearby coastal scenery as conditions permit.",
        "Follow local guidance for swimming and snorkeling.",
      ],
      [
        "Enjoy a flexible day for a local beach visit or time in El Nido.",
        "Confirm any optional boat trips and weather conditions in advance.",
      ],
      [
        "Check out and transfer to the airport or ferry terminal.",
        "Confirm departure time and transport arrangements with the resort.",
      ],
    ],
    inclusions: [
      "El Nido resort stay",
      "Guided island excursion",
      "Boat transfers",
      "Local permits where required",
    ],
    review: {
      id: "review-11",
      name: "Andrea",
      rating: 4,
      text: "A scenic island trip with a relaxed schedule and helpful local guidance.",
    },
  },
] as const;

/** Palawan fixtures used by the itinerary package list and detail screens. */
export const PACKAGE_SPOTS: TouristSpot[] = INITIAL_TOURIST_SPOTS;

export const PACKAGE_RESORTS: Resort[] = INITIAL_RESORTS;

type PackageDetails = Pick<
  ItineraryPackage,
  | "id"
  | "name"
  | "spotId"
  | "resortId"
  | "destination"
  | "duration"
  | "price"
  | "priceBasis"
  | "activities"
  | "inclusions"
  | "popular"
> & {
  scheduleSpotId: string;
};

function buildPackageDays(
  duration: string,
  activities: readonly string[],
  destination: string,
): ItineraryPackage["days"] {
  const dayCount = Number.parseInt(duration, 10);

  if (!Number.isInteger(dayCount) || dayCount < 1) {
    throw new Error(`Invalid itinerary duration: ${duration}`);
  }

  const dayActivities = Array.from({ length: dayCount }, () => [] as string[]);
  activities.forEach((activity, index) => {
    const dayIndex = Math.min(
      dayCount - 1,
      Math.floor((index * dayCount) / activities.length),
    );
    dayActivities[dayIndex].push(activity);
  });

  return dayActivities.map((activitiesForDay, dayIndex) => {
    const isArrivalDay = dayIndex === 0;
    const isDepartureDay = dayIndex === dayCount - 1;
    const notes = [
      ...(isArrivalDay
        ? [`Arrive in ${destination} and transfer to the resort for check-in.`]
        : []),
      ...activitiesForDay,
      ...(isDepartureDay
        ? ["Check out and transfer to your departure point."]
        : []),
    ];

    return {
      id: `day-${dayIndex + 1}`,
      title: isArrivalDay
        ? `Arrival in ${destination}`
        : isDepartureDay
          ? "Departure"
          : activitiesForDay[0] ?? "Flexible day",
      notes:
        notes.length > 0
          ? notes
          : ["Free time to explore or relax at your destination."],
    };
  });
}

const packageDetails: PackageDetails[] = [
  {
    id: "itinerary-01",
    name: "El Nido Island Hopping Adventure",
    spotId: "spot-2",
    resortId: "resort-1",
    scheduleSpotId: "spot-2",
    destination: "El Nido",
    duration: "3 Days / 2 Nights",
    price: 8500,
    priceBasis: "person",
    activities: ["Big Lagoon", "Secret Lagoon", "Shimizu Island", "Snorkeling"],
    inclusions: ["Hotel accommodation", "Boat tour", "Lunch", "Tour guide"],
    popular: true,
  },
  {
    id: "itinerary-02",
    name: "El Nido Beach Escape",
    spotId: "spot-3",
    resortId: "resort-1",
    scheduleSpotId: "spot-3",
    destination: "El Nido",
    duration: "2 Days / 1 Night",
    price: 5500,
    priceBasis: "person",
    activities: [
      "Nacpan Beach",
      "Las Cabanas Beach",
      "Swimming",
      "Sunset viewing",
    ],
    inclusions: ["Resort accommodation", "Breakfast", "Local transfers"],
    popular: false,
  },
  {
    id: "itinerary-03",
    name: "El Nido Adventure and Kayaking Package",
    spotId: "spot-2",
    resortId: "resort-1",
    scheduleSpotId: "spot-2",
    destination: "El Nido",
    duration: "3 Days / 2 Nights",
    price: 9000,
    priceBasis: "person",
    activities: [
      "Lagoon kayaking",
      "Snorkeling",
      "Island exploration",
      "Beach activities",
    ],
    inclusions: [
      "Hotel accommodation",
      "Kayak rental",
      "Boat tour",
      "Meals",
    ],
    popular: false,
  },
  {
    id: "itinerary-04",
    name: "El Nido Romantic Getaway",
    spotId: "spot-7",
    resortId: "resort-1",
    scheduleSpotId: "spot-2",
    destination: "El Nido",
    duration: "3 Days / 2 Nights",
    price: 15000,
    priceBasis: "couple",
    activities: [
      "Private beach experience",
      "Sunset cruise",
      "Romantic dinner",
    ],
    inclusions: [
      "Resort accommodation",
      "Breakfast",
      "Romantic dinner",
      "Transfers",
    ],
    popular: false,
  },
  {
    id: "itinerary-05",
    name: "Coron Island Hopping Package",
    spotId: "spot-8",
    resortId: "resort-2",
    scheduleSpotId: "spot-1",
    destination: "Coron",
    duration: "3 Days / 2 Nights",
    price: 8000,
    priceBasis: "person",
    activities: [
      "Kayangan Lake",
      "Twin Lagoon",
      "Barracuda Lake",
      "Snorkeling",
    ],
    inclusions: ["Hotel accommodation", "Boat tour", "Lunch", "Guide"],
    popular: true,
  },
  {
    id: "itinerary-06",
    name: "Coron Diving and Snorkeling Adventure",
    spotId: "spot-6",
    resortId: "resort-2",
    scheduleSpotId: "spot-6",
    destination: "Coron",
    duration: "4 Days / 3 Nights",
    price: 12500,
    priceBasis: "person",
    activities: [
      "Coral reef snorkeling",
      "Diving experience",
      "Shipwreck exploration",
    ],
    inclusions: [
      "Accommodation",
      "Guided water activities",
      "Selected equipment rental",
    ],
    popular: false,
  },
  {
    id: "itinerary-07",
    name: "Coron Relaxation and Nature Escape",
    spotId: "spot-1",
    resortId: "resort-2",
    scheduleSpotId: "spot-1",
    destination: "Coron",
    duration: "2 Days / 1 Night",
    price: 6000,
    priceBasis: "person",
    activities: ["Maquinit Hot Springs", "Mt. Tapyas viewpoint", "Town tour"],
    inclusions: [
      "Hotel accommodation",
      "Breakfast",
      "Local transportation",
    ],
    popular: false,
  },
  {
    id: "itinerary-08",
    name: "Coron Family Vacation Package",
    spotId: "spot-8",
    resortId: "resort-2",
    scheduleSpotId: "spot-1",
    destination: "Coron",
    duration: "4 Days / 3 Nights",
    price: 18000,
    priceBasis: "family of 4",
    activities: [
      "Island hopping",
      "Swimming",
      "Sightseeing",
      "Family beach activities",
    ],
    inclusions: ["Family room", "Breakfast", "Boat tour", "Transfers"],
    popular: false,
  },
  {
    id: "itinerary-09",
    name: "Underground River Exploration",
    spotId: "spot-4",
    resortId: "resort-4",
    scheduleSpotId: "spot-4",
    destination: "Puerto Princesa",
    duration: "2 Days / 1 Night",
    price: 4500,
    priceBasis: "person",
    activities: [
      "Underground River tour",
      "Sabang Beach",
      "Nature sightseeing",
    ],
    inclusions: [
      "Hotel accommodation",
      "Tour transportation",
      "Guide",
      "Lunch",
    ],
    popular: false,
  },
  {
    id: "itinerary-10",
    name: "Honda Bay Island Hopping",
    spotId: "spot-4",
    resortId: "resort-4",
    scheduleSpotId: "spot-4",
    destination: "Puerto Princesa",
    duration: "3 Days / 2 Nights",
    price: 6500,
    priceBasis: "person",
    activities: ["Cowrie Island", "Starfish Island", "Snorkeling", "Swimming"],
    inclusions: ["Hotel accommodation", "Boat rental", "Lunch", "Tour guide"],
    popular: false,
  },
  {
    id: "itinerary-11",
    name: "Puerto Princesa City and Firefly Tour",
    spotId: "spot-4",
    resortId: "resort-4",
    scheduleSpotId: "spot-4",
    destination: "Puerto Princesa",
    duration: "2 Days / 1 Night",
    price: 5000,
    priceBasis: "person",
    activities: [
      "City sightseeing",
      "Firefly watching",
      "Local food experience",
    ],
    inclusions: [
      "Hotel accommodation",
      "Selected meals",
      "Tour transportation",
    ],
    popular: false,
  },
  {
    id: "itinerary-12",
    name: "Port Barton Island Adventure",
    spotId: "spot-5",
    resortId: "resort-3",
    scheduleSpotId: "spot-5",
    destination: "San Vicente",
    duration: "3 Days / 2 Nights",
    price: 7000,
    priceBasis: "person",
    activities: [
      "Island hopping",
      "Snorkeling",
      "Turtle watching (subject to sightings)",
      "Beach exploration",
    ],
    inclusions: ["Resort accommodation", "Boat tour", "Lunch", "Guide"],
    popular: false,
  },
  {
    id: "itinerary-13",
    name: "San Vicente Beach Relaxation Package",
    spotId: "spot-5",
    resortId: "resort-3",
    scheduleSpotId: "spot-5",
    destination: "San Vicente",
    duration: "3 Days / 2 Nights",
    price: 7500,
    priceBasis: "person",
    activities: [
      "Long Beach exploration",
      "Swimming",
      "Sunset viewing",
    ],
    inclusions: [
      "Beach resort accommodation",
      "Breakfast",
      "Transfers",
    ],
    popular: false,
  },
  {
    id: "itinerary-14",
    name: "Palawan Honeymoon and Luxury Escape",
    spotId: "spot-7",
    resortId: "resort-1",
    scheduleSpotId: "spot-2",
    destination: "Palawan",
    duration: "5 Days / 4 Nights",
    price: 28000,
    priceBasis: "couple",
    activities: [
      "Island hopping",
      "Private resort relaxation",
      "Sunset cruise",
      "Romantic dinner",
    ],
    inclusions: [
      "Premium resort accommodation",
      "Breakfast",
      "Selected tours",
      "Transfers",
    ],
    popular: false,
  },
  {
    id: "itinerary-15",
    name: "Ultimate Palawan Discovery Tour",
    spotId: "spot-4",
    resortId: "resort-4",
    scheduleSpotId: "spot-4",
    destination: "Palawan",
    duration: "6 Days / 5 Nights",
    price: 25000,
    priceBasis: "person",
    activities: [
      "Puerto Princesa Underground River",
      "El Nido island hopping",
      "Beach exploration",
    ],
    inclusions: [
      "Hotel accommodation",
      "Selected tours",
      "Transfers",
      "Selected meals",
    ],
    popular: false,
  },
];

type PackageSpec = {
  spotId: string;
  resortId: string;
  startDate: string;
  /** Matches the chip names on the Itineraries screen. Defaults to "Palawan". */
  destination?: string;
  titles: readonly string[];
  dayNotes: readonly (readonly string[])[];
  inclusions: readonly string[];
  review: { id: string; name: string; rating: number; text: string };
};

function buildItineraryPackage(
  spec: PackageSpec,
): Omit<
  ItineraryPackage,
  "name" | "duration" | "price" | "priceBasis" | "activities" | "popular"
> {
  const spot = PACKAGE_SPOTS.find((item) => item.id === spec.spotId);
  const resort = PACKAGE_RESORTS.find((item) => item.id === spec.resortId);

  if (!spot || !resort) {
    throw new Error(`Missing mock data for itinerary ${spec.spotId}`);
  }

  if (spec.titles.length !== spec.dayNotes.length) {
    throw new Error(`Missing day details for itinerary ${spec.spotId}`);
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
      notes: [...spec.dayNotes[index]],
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
  ...packageDetails.map((details) => {
    const schedule = packageSpecs.find(
      (spec) => spec.spotId === details.scheduleSpotId,
    );

    if (!schedule) {
      throw new Error(
        `Missing schedule template for itinerary ${details.id}`,
      );
    }

    const packageData = buildItineraryPackage({
      ...schedule,
      spotId: details.spotId,
      resortId: details.resortId,
      destination: details.destination,
    });

    return {
      ...packageData,
      id: details.id,
      name: details.name,
      duration: details.duration,
      price: details.price,
      priceBasis: details.priceBasis,
      activities: [...details.activities],
      days: buildPackageDays(
        details.duration,
        details.activities,
        details.destination ?? "Palawan",
      ),
      inclusions: [...details.inclusions],
      popular: details.popular,
    };
  }),
];

export function getItineraryPackageSpot(
  packageId: string | undefined,
): TouristSpot | undefined {
  const itineraryPackage = INITIAL_ITINERARY_PACKAGES.find(
    (item) => item.id === packageId,
  );

  return itineraryPackage
    ? PACKAGE_SPOTS.find((spot) => spot.id === itineraryPackage.spotId)
    : undefined;
}
