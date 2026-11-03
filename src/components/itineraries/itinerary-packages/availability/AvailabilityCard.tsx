import type { TimePickerSettings } from "@/data/types";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import DateInput from "./DateInput";
import TimeInput from "./TimeInput";

type Props = Readonly<{
  arrivalDate: Date;
  arrivalTime: Date;
  departureDate: Date;
  departureTime: Date;
  timePickerSettings: TimePickerSettings;
  onArrivalDateChange: (value: Date) => void;
  onArrivalTimeChange: (value: Date) => void;
  onDepartureDateChange: (value: Date) => void;
  onDepartureTimeChange: (value: Date) => void;
}>;

export default function AvailabilityCard({
  arrivalDate,
  arrivalTime,
  departureDate,
  departureTime,
  timePickerSettings,
  onArrivalDateChange,
  onArrivalTimeChange,
  onDepartureDateChange,
  onDepartureTimeChange,
}: Props) {
  return (
    <ScrollView className="m-4 rounded-xl border border-slate-200 bg-white px-4 py-4 shadow">
      <View className="mb-3 flex-row items-center pl-2">
        <Ionicons name="airplane-outline" size={24} />
        <Text className="ml-4 font-poppins-md text-xl">Arrival</Text>
      </View>

      <Text className="mb-1">Date</Text>
      <DateInput value={arrivalDate} onChange={onArrivalDateChange} />

      <Text className="mb-1 mt-3">Time</Text>
      <TimeInput
        value={arrivalTime}
        settings={timePickerSettings}
        onChange={onArrivalTimeChange}
      />

      <View className="my-4 border-t border-slate-200" />

      <View className="mb-3 flex-row items-center pl-2">
        <Ionicons name="airplane-outline" size={24} />
        <Text className="ml-4 font-poppins-md text-xl">Departure</Text>
      </View>

      <Text className="mb-1">Date</Text>
      <DateInput value={departureDate} onChange={onDepartureDateChange} />

      <Text className="mb-1 mt-3">Time</Text>
      <TimeInput
        value={departureTime}
        settings={timePickerSettings}
        onChange={onDepartureTimeChange}
      />
    </ScrollView>
  );
}
