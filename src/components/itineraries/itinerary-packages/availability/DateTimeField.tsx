import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

type Props = Readonly<{
  accessibilityLabel: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  trailingIcon: React.ComponentProps<typeof Ionicons>["name"];
  value: string;
  onPress: () => void;
}>;

export default function DateTimeField({
  accessibilityLabel,
  icon,
  trailingIcon,
  value,
  onPress,
}: Props) {
  return (
    <View className="mt-3">
      <Text className="font-poppins text-[10px] text-textMuted">
        {accessibilityLabel.toUpperCase()}
      </Text>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Select ${accessibilityLabel.toLowerCase()}`}
        onPress={onPress}
        className="h-12 flex-row items-center rounded-xl border border-slate-200 bg-white px-3 active:opacity-70"
      >
        <View className="w-40 flex-row px-4">
          <Ionicons
            className="absolute left-0"
            name={icon}
            size={19}
            color="#64748B"
          />

          <Text className="ml-4 mt-0.5 font-poppins-medium text-[12px] text-textMain">
            {value}
          </Text>
        </View>

        <Ionicons
          className="absolute right-2"
          name={trailingIcon}
          size={19}
          color="#64748B"
        />
      </Pressable>
    </View>
  );
}
