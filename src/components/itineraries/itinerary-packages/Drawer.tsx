import { DAY_DESCRIPTIONS, type Dates } from "@/data/mockData";
import { colors } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import type { ReactNode } from "react";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

export type DayOfWeek = {
  id: string;
  name: string;
};

type Props = Readonly<{
  dates: (typeof Dates)[number];
  children?: (day: DayOfWeek, index: number) => ReactNode;
  className?: string;
}>;

export default function Drawer({
  dates,
  children,
  className = "",
}: Props) {
  const [openDay, setOpenDay] = useState<string | null>(null);

  const days: DayOfWeek[] = dates.daysOfWeek.map(
    (name, index) => ({
      id: String(index),
      name,
    }),
  );

  const toggleDay = (dayId: string) => {
    setOpenDay((current) =>
      current === dayId ? null : dayId,
    );
  };

  return (
    <View className={className}>
      {days.map((day, index) => {
        const isOpen = openDay === day.id;

        const description =
          DAY_DESCRIPTIONS[index] ?? "Free day";

        const date =
          index === 0
            ? dates.dateArrival
            : index === days.length - 1
              ? dates.dateDeparture
              : null;

        return (
          <View
            key={day.id}
            className="mx-3 mb-3"
          >
            <View
              className={`rounded-lg bg-slate-100 px-4 py-3 ${
                isOpen ? "pb-4" : ""
              }`}
            >
              <Pressable
                onPress={() => toggleDay(day.id)}
                accessibilityRole="button"
                accessibilityState={{
                  expanded: isOpen,
                }}
                accessibilityLabel={`${day.name}, ${description}${
                  date ? `, ${date}` : ""
                }${
                  isOpen
                    ? ", expanded"
                    : ", collapsed"
                }`}
                className="h-24 flex-row items-center justify-between active:opacity-70"
              >
                <View className="flex-1 pr-3">
                  <Text
                    className="font-poppins-semibold text-[18px] text-textMain"
                    numberOfLines={2}
                  >
                    {day.name}
                  </Text>

                  <Text
                    className="mt-0.5 font-poppins-semibold text-[14px] text-textMain"
                    numberOfLines={2}
                  >
                    {description}
                  </Text>

                  {date ? (
                    <Text className="mt-1 font-poppins text-[12px] text-textMuted">
                      {date}
                    </Text>
                  ) : null}
                </View>

                <View
                  className={`h-9 w-9 items-center justify-center rounded-full border ${
                    isOpen
                      ? "border-primary bg-primary"
                      : "border-white bg-white"
                  }`}
                >
                  <Ionicons
                    name={
                      isOpen
                        ? "chevron-up"
                        : "chevron-down"
                    }
                    size={18}
                    color={
                      isOpen
                        ? colors.white
                        : colors.primary
                    }
                  />
                </View>
              </Pressable>

              {isOpen && children ? (
                <View className="mt-3 border-t border-border pt-3">
                  {children(day, index)}
                </View>
              ) : null}
            </View>
          </View>
        );
      })}
    </View>
  );
}
