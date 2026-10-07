import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text } from "react-native";

type ButtonProps = Readonly<{
  onPress?: () => void;
  title: string;
}>;

export default function Button({
  title,
  onPress,
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
      className="w-[370px] items-center justify-center rounded-[14px] bg-primary px-[18px] py-[14px] active:opacity-80"
    >
      <Text className="font-poppins-semibold text-[15px] text-white">
        {title}
      </Text>
    </Pressable>
  );
}

type SeeMoreButtonProps = Readonly<{
  onPress?: () => void;
}>;

/**
 * Lightweight "See more" action — green label with a down-arrow on the
 * right, intentionally distinct from the solid primary Button.
 */
export function SeeMoreButton({ onPress }: SeeMoreButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="See more"
      className="flex-row items-center gap-1 active:opacity-70"
    >
      <Text className="font-poppins-semibold text-[15px] text-primary">
        See more
      </Text>
      <Ionicons name="chevron-down" size={18} color="#0f766e" />
    </Pressable>
  );
}
