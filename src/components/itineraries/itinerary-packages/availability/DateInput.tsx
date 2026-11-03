import React, { useState } from "react";
import { Modal, Pressable, View } from "react-native";
import { Calendar, type DateData } from "react-native-calendars";
import DateTimeField from "../../itinerary-packages/availability/DateTimeField";

type Props = Readonly<{
  value: Date;
  onChange: (date: Date) => void;
}>;

const formatLocalDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export default function DateInput({ value, onChange }: Props) {
  const [showPicker, setShowPicker] = useState(false);

  const formattedValue = value.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  const handleDateChange = (day: DateData) => {
    // Use local time to avoid UTC date shifting.
    const [year, month, date] = day.dateString.split("-").map(Number);

    const selectedDate = new Date(
      year,
      month - 1,
      date,
      value.getHours(),
      value.getMinutes(),
      value.getSeconds(),
      value.getMilliseconds(),
    );

    onChange(selectedDate);
    setShowPicker(false);
  };

  return (
    <>
      <DateTimeField
        accessibilityLabel="Date"
        icon="calendar-outline"
        trailingIcon="chevron-down-outline"
        value={formattedValue}
        onPress={() => setShowPicker(true)}
      />
      <Modal
        visible={showPicker}
        transparent
        animationType="fade"
        onRequestClose={() => setShowPicker(false)}>
        <View className="flex-1 items-center justify-center px-5">
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Close date picker"
            className="absolute inset-0 bg-black/40"
            onPress={() => setShowPicker(false)}
          />
          <View className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white p-2">
            <Calendar
              current={formatLocalDate(value)}
              onDayPress={handleDateChange}
              minDate={formatLocalDate(new Date())}
              markedDates={{
                [formatLocalDate(value)]: {
                  selected: true,
                  selectedColor: "#F97316",
                  selectedTextColor: "#FFFFFF",
                },
              }}
              theme={{
                todayTextColor: "#F97316",
                arrowColor: "#F97316",
                monthTextColor: "#F97316",
              }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}
