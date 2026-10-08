import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { Pressable, Text, View } from "react-native";

type IconName = ComponentProps<typeof Ionicons>["name"];

type Props = Readonly<{
  // TODO: Date, Duration and Filters are visual only for now.
  // Wire these handlers when the real behavior is defined, for example:
  //   - Date: open a date picker and filter packages by startDate
  //   - Duration: pick a number of days and filter by days.length
  //   - Filters: open a bottom sheet (price range, rating, inclusions)
  onDatePress?: () => void;
  onDurationPress?: () => void;
  onFiltersPress?: () => void;
}>;

function FilterButton({
  icon,
  label,
  showChevron = false,
  onPress,
}: Readonly<{
  icon: IconName;
  label: string;
  showChevron?: boolean;
  onPress?: () => void;
}>) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      className="h-[42px] flex-1 flex-row items-center justify-center rounded-[12px] border border-[#E7EAEA] bg-white shadow-sm shadow-black/5 active:opacity-80">
      <Ionicons name={icon} size={20} color="#111729" />

      <Text className="ml-2 font-poppins-medium text-[13px] text-[#111729]">
        {label}
      </Text>

      {showChevron ? (
        <Ionicons
          name="chevron-down"
          size={16}
          color="#111729"
          style={{ marginLeft: 8 }}
        />
      ) : null}
    </Pressable>
  );
}

export default function PackageFilterRow({
  onDatePress,
  onDurationPress,
  onFiltersPress,
}: Props) {
  return (
    <View className="flex-row gap-[11px] px-[14px]">
      <FilterButton
        icon="calendar-outline"
        label="Date"
        showChevron
        onPress={onDatePress}
      />
      <FilterButton
        icon="time-outline"
        label="Duration"
        showChevron
        onPress={onDurationPress}
      />
      <FilterButton
        icon="funnel-outline"
        label="Filters"
        onPress={onFiltersPress}
      />
    </View>
  );
}
