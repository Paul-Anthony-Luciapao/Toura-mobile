import { StyleSheet } from "react-native";

export const colors = {
  background: "#ffffff",
  surface: "#ffffff",
  surfaceSoft: "#eaf5f2", // light mint - icon circles, search header bg
  surfaceMuted: "#e2e8f0",
  primary: "#0f766e", // teal - logo, active tab, links, star, price accents
  primaryDark: "#115e59",
  textSecondary: "#a0a0b0",
  text: "#0f172a", // headings, prices
  textSoft: "#334155",
  textMuted: "#64748b", // card subtext, guest count
  border: "#e2e8f0",
  warning: "#f59e0b",
  warningSoft: "#fff7ed",
  accent: "#c2410c",

  // hero-specific
  heroOverlayTop: "rgba(15, 94, 140, 0.55)",
  heroOverlayBottom: "rgba(11, 46, 74, 0.75)",
  white: "#ffffff",
};

export const globalStyles = StyleSheet.create({
  // Use for screens with full-bleed content at the top (hero images, etc.)
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  // Use for sections that need the standard horizontal margin (everything below the hero)
  content: {
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.text,
    marginTop: 30,
    marginBottom: 16,
  },
  empty: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  headerSearch: {
    // for the search-bar style header seen on inner screens (light mint bg, back button, search, bell)
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.surfaceSoft,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    gap: 12,
  },
});
