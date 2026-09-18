import { StyleSheet } from "react-native";

export const colors = {
  background: "#f8fafc",
  surface: "#ffffff",
  surfaceSoft: "#dff6f2",
  surfaceMuted: "#e2e8f0",
  primary: "#0f766e",
  primaryDark: "#115e59",
  textSecondary: "#a0a0b0",
  text: "#0f172a",
  textSoft: "#334155",
  textMuted: "#64748b",
  border: "#e2e8f0",
  warning: "#f59e0b",
  warningSoft: "#fff7ed",
  accent: "#c2410c",
};

export const globalStyles = StyleSheet.create({
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
  },
});
