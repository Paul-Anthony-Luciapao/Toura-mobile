import { colors } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";

export default function AvailabilityCard() {
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const inputBorder = (inputName: string) =>
    focusedInput === inputName ? "border-primary" : "border-slate-200";

  return (
    <View className="border border-slate-200 rounded-xl bg-white m-4 px-4 py-4 shadow">
      {/* Arrival */}
      <View className="flex-row items-center pl-2 mb-3">
        <Ionicons name="airplane-outline" size={24} />
        <Text className="font-poppins-md text-xl ml-4">Arrival</Text>
      </View>

      <Text className="mb-1">Date</Text>

      <View
        className={`flex-row items-center rounded-xl border pl-4 mb-4 ${inputBorder("arrivalDate")}`}
      >
        <Ionicons name="calendar-outline" size={24} color={colors.primary} />
        <TextInput
          placeholder="DD/MM/YYYY"
          placeholderTextColor="black"
          className="ml-3 flex-1"
          onFocus={() => setFocusedInput("arrivalDate")}
          onBlur={() => setFocusedInput(null)}
        />
      </View>

      <Text className="mb-1">Time</Text>

      <View
        className={`flex-row items-center rounded-xl border pl-4 mb-4 ${inputBorder("arrivalTime")}`}
      >
        <Ionicons name="time-outline" size={24} color={colors.primary} />
        <TextInput
          placeholder="UTC 00:00"
          placeholderTextColor="black"
          className="ml-3 flex-1"
          onFocus={() => setFocusedInput("arrivalTime")}
          onBlur={() => setFocusedInput(null)}
        />
      </View>

      {/* Departure */}
      <View className="flex-row pb-4">
        <Ionicons name="airplane-outline" size={24} />
        <Text className="font-poppins-md text-xl ml-4">Departure</Text>
      </View>

      <Text className="mb-1">Date</Text>

      <View
        className={`flex-row items-center rounded-xl border pl-4 mb-4 ${inputBorder("departureDate")}`}
      >
        <Ionicons name="calendar-outline" size={24} color={colors.primary} />
        <TextInput
          placeholder="DD/MM/YYYY"
          placeholderTextColor="black"
          className="ml-3 flex-1"
          onFocus={() => setFocusedInput("departureDate")}
          onBlur={() => setFocusedInput(null)}
        />
      </View>

      <Text className="mb-1">Time</Text>

      <View
        className={`flex-row items-center rounded-xl border pl-4 mb-4 ${inputBorder("departureTime")}`}
      >
        <Ionicons name="time-outline" size={24} color={colors.primary} />
        <TextInput
          placeholder="UTC 00:00"
          placeholderTextColor="black"
          className="ml-3 flex-1"
          onFocus={() => setFocusedInput("departureTime")}
          onBlur={() => setFocusedInput(null)}
        />
      </View>
    </View>
  );
}
