import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, {
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
    Pressable,
    Text,
    TextInput,
    View,
} from "react-native";

import type { Guest } from "@/data/types";

type GuestCardProps = {
  guest: Guest;
  guestNumber: number;
  onChange: (
    field: keyof Omit<Guest, "id">,
    value: string | Date | null,
  ) => void;
};

export default function GuestCard({
  guest,
  guestNumber,
  onChange,
}: GuestCardProps) {
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const formatDate = (date: Date | null): string => {
    if (!date) return "";

    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  };

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ) => {
    setShowDatePicker(false);
    setFocusedInput(null);

    // Android can fire this when the user cancels.
    if (event.type === "dismissed") {
      return;
    }

    if (selectedDate) {
      onChange("dateOfBirth", selectedDate);
    }
  };

  return (
    <View className="mb-5 rounded-xl border border-slate-200">
      {/* Guest Header */}
      <View className="flex-row p-4">
        <Text className="mr-4 font-poppins-semibold text-xl">
          Guest {guestNumber}
        </Text>

        {guestNumber === 1 && (
          <Text className="w-[110px] rounded-xl border border-slate-50 bg-slate-100 pl-1 font-poppins text-primary">
            Primary Guest
          </Text>
        )}
      </View>

      {/* Guest Details */}
      <View className="px-4 pb-4">
        {/* First Name */}
        <View className="mb-5">
          <Text className="mb-2 font-poppins-semibold">
            First name
          </Text>

          <TextInput
            value={guest.firstName}
            onChangeText={(value) => onChange("firstName", value)}
            onFocus={() => setFocusedInput("firstName")}
            onBlur={() => setFocusedInput(null)}
            placeholder="Enter first name"
            placeholderTextColor="#94a3b8"
            className={`rounded-xl px-4 py-3 font-poppins ${
              focusedInput === "firstName"
                ? "border border-primary"
                : "border border-slate-200"
            }`}
            autoCapitalize="words"
            autoCorrect={false}
          />
        </View>

        {/* Last Name */}
        <View className="mb-5">
          <Text className="mb-2 font-poppins-semibold">
            Last name
          </Text>

          <TextInput
            value={guest.lastName}
            onChangeText={(value) => onChange("lastName", value)}
            onFocus={() => setFocusedInput("lastName")}
            onBlur={() => setFocusedInput(null)}
            placeholder="Enter last name"
            placeholderTextColor="#94a3b8"
            className={`rounded-xl px-4 py-3 font-poppins ${
              focusedInput === "lastName"
                ? "border border-primary"
                : "border border-slate-200"
            }`}
            autoCapitalize="words"
            autoCorrect={false}
          />
        </View>

        {/* Date of Birth */}
        <View className="mb-5">
          <Text className="mb-2 font-poppins-semibold">
            Date of birth
          </Text>

          <Pressable
            onPress={() => {
              setFocusedInput("dateOfBirth");
              setShowDatePicker(true);
            }}
            className={`flex-row items-center rounded-xl px-4 py-3 ${
              focusedInput === "dateOfBirth"
                ? "border border-primary"
                : "border border-slate-200"
            }`}
          >
            <Ionicons
              name="calendar-outline"
              size={20}
              color={
                focusedInput === "dateOfBirth"
                  ? "#FFA69B"
                  : "#94a3b8"
              }
            />

            <Text
              className={`ml-3 flex-1 font-poppins ${
                guest.dateOfBirth
                  ? "text-slate-900"
                  : "text-slate-400"
              }`}
            >
              {guest.dateOfBirth
                ? formatDate(guest.dateOfBirth)
                : "Select date of birth"}
            </Text>

            <Ionicons
              name="chevron-down"
              size={20}
              color={
                focusedInput === "dateOfBirth"
                  ? "#FFA69B"
                  : "#94a3b8"
              }
            />
          </Pressable>

          {showDatePicker && (
            <DateTimePicker
              value={guest.dateOfBirth ?? new Date()}
              mode="date"
              display="default"
              maximumDate={new Date()}
              onChange={handleDateChange}
            />
          )}
        </View>

        {/* Contact Information */}
        <View className="pt-2">
          <Text className="mb-4 font-poppins-semibold text-lg">
            Contact Information
          </Text>

          {/* Phone Number */}
          <View className="mb-5">
            <Text className="mb-2 font-poppins-semibold">
              Phone number
            </Text>

            <View
              className={`flex-row items-center rounded-xl px-4 py-3 ${
                focusedInput === "phone"
                  ? "border border-primary"
                  : "border border-slate-200"
              }`}
            >
              <Ionicons
                name="call-outline"
                size={20}
                color={
                  focusedInput === "phone"
                    ? "#FFA69B"
                    : "#94a3b8"
                }
              />

              <TextInput
                value={guest.phone}
                onChangeText={(value) => onChange("phone", value)}
                onFocus={() => setFocusedInput("phone")}
                onBlur={() => setFocusedInput(null)}
                placeholder="Enter phone number"
                placeholderTextColor="#94a3b8"
                keyboardType="phone-pad"
                className="ml-3 flex-1 p-0 font-poppins"
              />
            </View>
          </View>

          {/* Email */}
          <View>
            <Text className="mb-2 font-poppins-semibold">
              Email
            </Text>

            <View
              className={`flex-row items-center rounded-xl px-4 py-3 ${
                focusedInput === "email"
                  ? "border border-primary"
                  : "border border-slate-200"
              }`}
            >
              <Ionicons
                name="mail-outline"
                size={20}
                color={
                  focusedInput === "email"
                    ? "#FFA69B"
                    : "#94a3b8"
                }
              />

              <TextInput
                value={guest.email}
                onChangeText={(value) => onChange("email", value)}
                onFocus={() => setFocusedInput("email")}
                onBlur={() => setFocusedInput(null)}
                placeholder="Enter email address"
                placeholderTextColor="#94a3b8"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                className="ml-3 flex-1 p-0 font-poppins"
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}