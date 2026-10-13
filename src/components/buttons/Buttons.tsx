import type { ButtonProps } from "@/data/types";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text } from "react-native";

export default function Button({
  title,
  onPress,
  width = "w-full",
  height = "py-[14px]",
  backgroundColor = "bg-primary",
  textColor = "text-white",
  textSize = "text-[15px]",
  className = "",
  textClassName = "",
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
      className={`
        ${width}
        ${height}
        ${backgroundColor}
        items-center
        justify-center
        rounded-[14px]
        px-[18px]
        active:opacity-80
        ${className}
      `}
    >
      <Text
        className={`
          font-poppins-semibold
          ${textSize}
          ${textColor}
          ${textClassName}
        `}
      >
        {title}
      </Text>
    </Pressable>
  );
}

type SeeMoreButtonProps = Readonly<{
  onPress?: () => void;
}>;

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
