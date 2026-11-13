export type ActivityDifficulty = "Easy" | "Moderate" | "Challenging";

export type ActivityCategory =
  | "Island Hopping"
  | "Water Activities"
  | "Beach Activities"
  | "Adventure"
  | "Nature"
  | "Diving"
  | "Relaxation";

export interface Activity {
  id: string;
  name: string;
  description: string;
  category?: ActivityCategory;
  difficulty?: ActivityDifficulty;
  estimatedDuration?: string;
  highlights?: string[];
  tips?: string[];
  bestFor?: string[];
}

export interface Destination {
  id: string;
  name: string;
  subtitle: string;
  location: string;
  description: string;
  activities: Activity[];
}

export interface DestinationCategory {
  id: string;
  title: string;
  subtitle: string;
  destinations: Destination[];
}
