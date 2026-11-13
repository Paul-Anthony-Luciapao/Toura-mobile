import type { Activity, Destination } from "@/types/activities";

export const palawanDestinations: Destination[] = [
  {
    id: "el-nido",
    name: "El Nido",
    subtitle: "Island adventures & lagoons",
    location: "Palawan, Philippines",
    description:
      "Explore limestone islands, clear lagoons, hidden beaches, and guided outdoor adventures around Bacuit Bay.",
    activities: [
      {
        id: "el-nido-tour-a",
        name: "Island Hopping Tour A",
        description:
          "Explore El Nido's iconic lagoons, limestone scenery, and swimming beaches around Bacuit Bay.",
        category: "Island Hopping",
        highlights: [
          "Big Lagoon",
          "Secret Lagoon",
          "Shimizu Island",
          "Payong-Payong Beach",
          "Seven Commandos Beach",
        ],
      },
      {
        id: "el-nido-tour-b",
        name: "Island Hopping Tour B",
        description:
          "Visit islands, a natural sandbar, and caves on this Bacuit Bay route.",
        category: "Island Hopping",
        highlights: [
          "Snake Island",
          "Entalula Island",
          "Cudugnon Cave",
          "Cathedral Cave",
          "Pinagbuyutan Island",
        ],
      },
      {
        id: "el-nido-tour-c",
        name: "Island Hopping Tour C",
        description:
          "Explore hidden beaches and snorkeling spots along El Nido's limestone coast.",
        category: "Island Hopping",
        highlights: [
          "Hidden Beach",
          "Secret Beach",
          "Matinloc Shrine",
          "Talisay Beach",
          "Helicopter Island",
        ],
      },
      {
        id: "el-nido-tour-d",
        name: "Island Hopping Tour D",
        description:
          "Enjoy quieter lagoons and beaches around Cadlao Island and Bacuit Bay.",
        category: "Island Hopping",
        highlights: [
          "Small Lagoon",
          "Cadlao Lagoon",
          "Paradise Beach",
          "Pasandigan Cove",
          "Nat-Nat Beach",
        ],
      },
      {
        id: "big-lagoon",
        name: "Big Lagoon",
        description:
          "Explore the stunning turquoise waters surrounded by towering limestone cliffs at Miniloc Island.",
      },
      {
        id: "small-lagoon",
        name: "Small Lagoon",
        description:
          "Discover a beautiful hidden lagoon and enjoy kayaking through its crystal-clear waters.",
      },
      {
        id: "secret-beach",
        name: "Secret Beach",
        description:
          "Visit a secluded beach hidden behind limestone cliffs and accessible through a small opening.",
      },
      {
        id: "kayaking",
        name: "Kayaking",
        description:
          "Paddle through turquoise lagoons and discover breathtaking limestone formations.",
      },
      {
        id: "snorkeling",
        name: "Snorkeling",
        description:
          "Discover colorful coral reefs and tropical marine life beneath the clear waters.",
      },
      {
        id: "nacpan-beach",
        name: "Nacpan Beach",
        description:
          "Swim, relax on golden sand, and enjoy a beautiful tropical sunset.",
      },
      {
        id: "taraw-cliff",
        name: "Taraw Cliff",
        description:
          "Experience a guided climb or via ferrata adventure for spectacular panoramic views.",
      },
    ],
  },

  {
    id: "coron",
    name: "Coron",
    subtitle: "Lakes, beaches & underwater adventures",
    location: "Palawan, Philippines",
    description:
      "Discover freshwater lakes, island beaches, World War II shipwrecks, and relaxing hot springs.",
    activities: [
      {
        id: "coron-tour-a",
        name: "Coron Island Hopping Tour A",
        description:
          "A common operator route featuring Kayangan Lake, reef stops, and beaches. Exact stops vary by tour operator.",
        category: "Island Hopping",
        highlights: ["Kayangan Lake", "Quin Reef", "CYC Beach", "Coral gardens"],
        tips: ["Coron tour letters are not standardized. Confirm the exact itinerary and stops with your operator."],
      },
      {
        id: "coron-tour-b",
        name: "Coron Island Hopping Tour B",
        description:
          "A common operator route focused on lagoons, a lake, reef snorkeling, and a shipwreck. Exact stops vary by tour operator.",
        category: "Island Hopping",
        highlights: ["Barracuda Lake", "Twin Lagoon", "Skeleton Wreck", "Banol Beach"],
        tips: ["Coron tour letters are not standardized. Confirm the exact itinerary and stops with your operator."],
      },
      {
        id: "coron-tour-c",
        name: "Coron Island Hopping Tour C",
        description:
          "A common operator route to the southern white-sand islands. Stops and route names vary between operators.",
        category: "Island Hopping",
        highlights: ["Malcapuya Island", "Banana Island", "Bulog Dos", "Ditaytayan Island"],
        tips: ["Coron tour letters are not standardized. Confirm the exact itinerary and stops with your operator."],
      },
      {
        id: "kayangan-lake",
        name: "Kayangan Lake",
        description:
          "Swim in incredibly clear freshwater surrounded by dramatic limestone cliffs.",
      },
      {
        id: "twin-lagoon",
        name: "Twin Lagoon",
        description:
          "Experience two breathtaking lagoons connected by a natural passage between limestone formations.",
      },
      {
        id: "skeleton-wreck",
        name: "Skeleton Wreck",
        description:
          "Snorkel around a historic World War II shipwreck and explore its underwater surroundings.",
      },
      {
        id: "malcapuya-island",
        name: "Malcapuya Island",
        description:
          "Enjoy beautiful white sand beaches and crystal-clear blue waters.",
      },
      {
        id: "scuba-diving",
        name: "Scuba Diving",
        description:
          "Explore Coron's famous underwater shipwrecks and fascinating marine ecosystems.",
      },
      {
        id: "maquinit-hot-springs",
        name: "Maquinit Hot Springs",
        description:
          "Relax in natural saltwater hot springs surrounded by tropical scenery.",
      },
    ],
  },

  {
    id: "puerto-princesa",
    name: "Puerto Princesa",
    subtitle: "Nature & outdoor activities",
    location: "Palawan, Philippines",
    description:
      "Visit the underground river, explore Honda Bay, and experience caves, mangroves, and nighttime wildlife tours.",
    activities: [
      {
        id: "honda-bay-island-route",
        name: "Honda Bay Island Hopping",
        description:
          "Choose island and reef stops for a day of swimming, snorkeling, and relaxing on the beach. Routes depend on the boat and operator.",
        category: "Island Hopping",
        highlights: ["Cowrie Island", "Luli Island", "Pambato Reef", "Starfish Island"],
        tips: ["Honda Bay routes are chosen by island stops rather than a standard Tour A/B/C system. Confirm which islands are included."],
      },
      {
        id: "underground-river",
        name: "Underground River Tour",
        description:
          "Explore the famous Puerto Princesa Underground River, a UNESCO World Heritage Site.",
      },
      {
        id: "honda-bay",
        name: "Honda Bay Island Hopping",
        description:
          "Visit beautiful islands such as Cowrie Island and Luli Island.",
      },
      {
        id: "ugong-rock",
        name: "Ugong Rock Adventures",
        description:
          "Experience exciting spelunking and ziplining adventures through limestone formations.",
      },
      {
        id: "firefly-watching",
        name: "Firefly Watching",
        description:
          "Enjoy a magical nighttime river experience surrounded by glowing fireflies.",
      },
      {
        id: "mangrove-paddle-boating",
        name: "Mangrove Paddle Boating",
        description:
          "Explore peaceful mangrove forests while paddling through calm waterways.",
      },
    ],
  },

  {
    id: "port-barton",
    name: "Port Barton & San Vicente",
    subtitle: "Relaxing adventures",
    location: "Palawan, Philippines",
    description:
      "Enjoy a quieter coastal escape with island hopping, snorkeling, long beaches, and calm-water paddling.",
    activities: [
      {
        id: "port-barton-tour-a",
        name: "Port Barton Island Hopping Tour A",
        description:
          "A commonly listed Port Barton route for snorkeling reefs, watching turtles, and visiting islands and a sandbar.",
        category: "Island Hopping",
        highlights: ["Twin Reef", "Wide Reef", "Turtle watching", "Exotic Island", "Inaladelan Island", "Sandbar"],
        tips: ["Port Barton tour labels and stops can vary by operator. Check the final route before booking."],
      },
      {
        id: "port-barton-tour-b",
        name: "Port Barton Island Hopping Tour B",
        description:
          "A commonly listed route combining reef snorkeling with island and village stops.",
        category: "Island Hopping",
        highlights: ["Aquarium Reef", "Marine Sanctuary", "Paradise Island", "Exotic Island", "Starfish Island"],
        tips: ["Port Barton tour labels and stops can vary by operator. Check the final route before booking."],
      },
      {
        id: "port-barton-tour-c",
        name: "Port Barton Island Hopping Tour C",
        description:
          "A commonly listed route to reefs and smaller islands around Port Barton.",
        category: "Island Hopping",
        highlights: ["Fantastic Reef", "Paradise Island", "Mantay Island", "Ausan Island"],
        tips: ["Port Barton tour labels and stops can vary by operator. Check the final route before booking."],
      },
      {
        id: "port-barton-tour-d",
        name: "Port Barton Island Hopping Tour D",
        description:
          "A commonly listed route featuring island, reef, beach, and waterfall stops.",
        category: "Island Hopping",
        highlights: ["Inaladelan Island", "Reef 1", "Lagoon Reef", "Bigaho Falls", "Pamuayan Beach"],
        tips: ["Port Barton tour labels and stops can vary by operator. Check the final route before booking."],
      },
      {
        id: "turtle-watching",
        name: "Turtle Watching & Snorkeling",
        description:
          "Discover sea turtles and colorful marine life while snorkeling in clear waters.",
      },
      {
        id: "island-hopping",
        name: "Island Hopping",
        description:
          "Explore beautiful islands, secluded beaches, and stunning sandbars.",
      },
      {
        id: "beach-camping",
        name: "Beach Camping",
        description:
          "Spend a relaxing night camping beside the beach under the stars.",
      },
      {
        id: "sunset-watching",
        name: "Sunset Watching",
        description:
          "Enjoy peaceful tropical sunsets along the beautiful coastline.",
      },
      {
        id: "paddleboarding",
        name: "Paddleboarding & Kayaking",
        description:
          "Explore calm coastal waters and hidden spots using a paddleboard or kayak.",
      },
      {
        id: "long-beach",
        name: "Long Beach",
        description:
          "Relax and enjoy the spectacular coastline of San Vicente's famous Long Beach.",
      },
    ],
  },
];

export const adventureActivities: Activity[] = [
  {
    id: "jet-skiing",
    name: "Jet Skiing",
    description:
      "Experience the thrill of riding a jet ski across Palawan's beautiful waters.",
  },
  {
    id: "scuba-diving",
    name: "Scuba Diving",
    description:
      "Explore underwater reefs, marine wildlife, and fascinating shipwrecks.",
  },
  {
    id: "freediving",
    name: "Freediving",
    description: "Discover the underwater world through breath-hold diving.",
  },
  {
    id: "cliff-jumping",
    name: "Cliff Jumping",
    description:
      "Experience an adrenaline rush by jumping from permitted and designated cliff-jumping locations.",
  },
  {
    id: "surfing",
    name: "Surfing",
    description: "Ride tropical waves and enjoy an exciting ocean adventure.",
  },
  {
    id: "parasailing",
    name: "Parasailing",
    description:
      "Fly above the ocean and enjoy spectacular aerial views of the islands.",
  },
  {
    id: "beach-camping",
    name: "Beach Camping",
    description:
      "Spend a night beside the ocean and enjoy the peaceful island atmosphere.",
  },
  {
    id: "sunset-cruise",
    name: "Sunset Cruises",
    description:
      "Enjoy a relaxing boat cruise while watching the sun set over the ocean.",
  },
  {
    id: "island-kayaking",
    name: "Island-to-Island Kayaking",
    description:
      "Paddle between beautiful islands and discover hidden coastal destinations.",
  },
];
