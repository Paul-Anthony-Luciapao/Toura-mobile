import type { Guest } from "@/data/types";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, {
  type DateTimePickerChangeEvent,
} from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

type GuestCardProps = {
  guest: Guest;
  guestNumber: number;
  onChange: (
    field: keyof Omit<Guest, "id">,
    value: string | Date | null,
  ) => void;
  onRemove?: () => void;
};

export default function GuestCard({
  guest,
  guestNumber,
  onChange,
  onRemove,
}: GuestCardProps) {
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [draftDate, setDraftDate] = useState(
    () => guest.dateOfBirth ?? new Date(),
  );

  const formatDate = (date: Date | null): string => {
    if (!date) return "";

    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  };

  const openDatePicker = () => {
    setDraftDate(guest.dateOfBirth ?? new Date());
    setFocusedInput("dateOfBirth");
    setShowDatePicker(true);
  };

  const closeDatePicker = () => {
    setShowDatePicker(false);
    setFocusedInput(null);
  };

  const handleAndroidDateChange = (
    _event: DateTimePickerChangeEvent,
    selectedDate: Date,
  ) => {
    setShowDatePicker(false);
    setFocusedInput(null);

    onChange("dateOfBirth", selectedDate);
  };

  const handleIOSDateChange = (
    _event: DateTimePickerChangeEvent,
    selectedDate: Date,
  ) => {
    setDraftDate(selectedDate);
  };

  const confirmIOSDate = () => {
    onChange("dateOfBirth", draftDate);
    closeDatePicker();
  };

  return (
    <View className="mb-5 rounded-xl border border-slate-200">
      <View className="flex-row items-center justify-between p-4">
        <View className="flex-row items-center">
          <Text className="mr-4 font-poppins-semibold text-xl">
            Guest {guestNumber}
          </Text>

          {guestNumber === 1 && (
            <Text className="w-[110px] rounded-xl border border-slate-50 bg-slate-100 pl-1 font-poppins text-primary">
              Primary Guest
            </Text>
          )}
        </View>

        {guestNumber > 1 && onRemove && (
          <Pressable
            onPress={onRemove}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel={`Remove guest ${guestNumber}`}
            className="flex-row items-center rounded-lg px-2 py-1">
            <Ionicons name="trash-outline" size={18} color="#ef4444" />
            <Text className="ml-1 font-poppins text-red-500">Remove</Text>
          </Pressable>
        )}
      </View>

      <View className="px-4 pb-4">
        <View className="mb-5">
          <Text className="mb-2 font-poppins-semibold">First name</Text>

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

        <View className="mb-5">
          <Text className="mb-2 font-poppins-semibold">Last name</Text>

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

        <View className="mb-5">
          <Text className="mb-2 font-poppins-semibold">Date of birth</Text>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Select date of birth"
            onPress={openDatePicker}
            className={`flex-row items-center rounded-xl px-4 py-3 ${
              focusedInput === "dateOfBirth"
                ? "border border-primary"
                : "border border-slate-200"
            }`}>
            <Ionicons
              name="calendar-outline"
              size={20}
              color={focusedInput === "dateOfBirth" ? "#FFA69B" : "#94a3b8"}
            />

            <Text
              className={`ml-3 flex-1 font-poppins ${
                guest.dateOfBirth ? "text-slate-900" : "text-slate-400"
              }`}>
              {guest.dateOfBirth
                ? formatDate(guest.dateOfBirth)
                : "Select date of birth"}
            </Text>

            <Ionicons
              name="chevron-down"
              size={20}
              color={focusedInput === "dateOfBirth" ? "#FFA69B" : "#94a3b8"}
            />
          </Pressable>

          {showDatePicker && Platform.OS === "android" && (
            <DateTimePicker
              value={guest.dateOfBirth ?? new Date()}
              mode="date"
              display="default"
              maximumDate={new Date()}
              onValueChange={handleAndroidDateChange}
              onDismiss={() => {
                setShowDatePicker(false);
                setFocusedInput(null);
              }}
            />
          )}

          {Platform.OS === "ios" && (
            <Modal
              visible={showDatePicker}
              transparent
              animationType="fade"
              onRequestClose={closeDatePicker}>
              <View className="flex-1 items-center justify-center px-5">
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Close date picker"
                  className="absolute inset-0 bg-black/40"
                  onPress={closeDatePicker}
                />

                <View className="w-full max-w-md items-center rounded-2xl bg-white p-4">
                  <DateTimePicker
                    value={draftDate}
                    mode="date"
                    display="spinner"
                    maximumDate={new Date()}
                    onValueChange={handleIOSDateChange}
                  />

                  <View className="mt-2 w-full flex-row justify-end gap-3">
                    <Pressable
                      accessibilityRole="button"
                      onPress={closeDatePicker}
                      className="rounded-lg px-4 py-2">
                      <Text className="font-poppins-medium text-sm text-textMuted">
                        Cancel
                      </Text>
                    </Pressable>

                    <Pressable
                      accessibilityRole="button"
                      onPress={confirmIOSDate}
                      className="rounded-lg bg-primary px-4 py-2">
                      <Text className="font-poppins-medium text-sm text-white">
                        Done
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </Modal>
          )}
        </View>

        <View className="pt-2">
          <Text className="mb-4 font-poppins-semibold text-lg">
            Contact Information
          </Text>

          <View className="mb-5">
            <Text className="mb-2 font-poppins-semibold">Phone number</Text>

            <View
              className={`flex-row items-center rounded-xl px-4 py-3 ${
                focusedInput === "phone"
                  ? "border border-primary"
                  : "border border-slate-200"
              }`}>
              <Ionicons
                name="call-outline"
                size={20}
                color={focusedInput === "phone" ? "#FFA69B" : "#94a3b8"}
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

          <View>
            <Text className="mb-2 font-poppins-semibold">Email</Text>

            <View
              className={`flex-row items-center rounded-xl px-4 py-3 ${
                focusedInput === "email"
                  ? "border border-primary"
                  : "border border-slate-200"
              }`}>
              <Ionicons
                name="mail-outline"
                size={20}
                color={focusedInput === "email" ? "#FFA69B" : "#94a3b8"}
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
