import { Pressable, Text } from "react-native";

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
      className={
        variant === "secondary"
          ? "items-center justify-center rounded-[14px] bg-coral-100 px-[18px] py-[14px]"
          : "items-center justify-center rounded-[14px] bg-coral-400 px-[18px] py-[14px]"
      }
      onPress={onPress}>
      <Text
        className={
          variant === "secondary"
            ? "text-[15px] font-bold text-ink"
            : "text-[15px] font-bold text-white"
        }>
        {label}
      </Text>
    </Pressable>
  );
}
