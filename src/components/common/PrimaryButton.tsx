import { colors } from "@/styles/global";
import { Pressable, StyleSheet, Text } from "react-native";

type Props = Readonly<{
  label: string;
  onPress?: () => void;
  variant?: "primary" | "secondary";
}>;

export default function PrimaryButton({
  label,
  onPress,
  variant = "primary",
}: Props) {
  return (
    <Pressable
      style={[styles.button, variant === "secondary" && styles.secondaryButton]}
      onPress={onPress}>
      <Text
        style={[
          styles.label,
          variant === "secondary" && styles.secondaryLabel,
        ]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButton: {
    backgroundColor: colors.surfaceMuted,
  },
  label: {
    color: colors.surface,
    fontSize: 15,
    fontWeight: "700",
  },
  secondaryLabel: {
    color: colors.text,
  },
});
