import { LinearGradient } from "expo-linear-gradient";
import { Pressable, Text } from "react-native";

type Props = Readonly<{
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  className?: string;
}>;

export default function GradientButton({
  label,
  onPress,
  disabled = false,
  className = "",
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`overflow-hidden rounded-xl ${
        disabled ? "opacity-60" : "active:opacity-80"
      } ${className}`}>
      <LinearGradient
        colors={["#3f8a7c", "#a7ded8"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="h-12 items-center justify-center px-6">
        <Text className="font-['Poppins_500Medium'] text-[15px] text-white">
          {label}
        </Text>
      </LinearGradient>
    </Pressable>
  );
}
