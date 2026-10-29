import type { Guest } from "@/data/types";
import { colors } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    Text,
    TextInput,
    View,
} from "react-native";

type GuestField = keyof Omit<Guest, "id">;

type ReviewProps = {
  guests: Guest[];
  onUpdateGuest: (
    guestId: string,
    field: GuestField,
    value: string | Date | null,
  ) => void;
};

export default function Review({ guests, onUpdateGuest }: ReviewProps) {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedGuestId, setSelectedGuestId] = useState("");
  const [selectedField, setSelectedField] = useState<GuestField | null>(null);
  const [draftValue, setDraftValue] = useState("");

  const fieldLabels: Record<GuestField, string> = {
    firstName: "First Name",
    lastName: "Last Name",
    dateOfBirth: "Date of Birth",
    phone: "Phone",
    email: "Email",
  };

  const openDrawer = (guest: Guest, field: GuestField) => {
    const currentValue = guest[field];

    setSelectedGuestId(guest.id);
    setSelectedField(field);

    if (field === "dateOfBirth") {
      setDraftValue(currentValue ? formatDate(currentValue as Date) : "");
    } else {
      setDraftValue(String(currentValue ?? ""));
    }

    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    setSelectedField(null);
    setSelectedGuestId("");
    setDraftValue("");
  };

  const saveChanges = () => {
    if (!selectedField) return;

    const value = draftValue.trim();

    if (
      selectedField === "firstName" ||
      selectedField === "lastName" ||
      selectedField === "phone" ||
      selectedField === "email"
    ) {
      if (!value) {
        Alert.alert(
          "Required field",
          `Please enter ${fieldLabels[selectedField].toLowerCase()}.`,
        );
        return;
      }
    }

    if (selectedField === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(value)) {
        Alert.alert("Invalid email", "Please enter a valid email address.");
        return;
      }
    }

    if (selectedField === "dateOfBirth") {
      if (!value) {
        onUpdateGuest(selectedGuestId, "dateOfBirth", null);
        closeDrawer();
        return;
      }

      const parsedDate = parseDate(value);

      if (!parsedDate) {
        Alert.alert(
          "Invalid date",
          "Enter a valid date in MM/DD/YYYY format, such as 05/21/2000.",
        );
        return;
      }

      if (parsedDate > new Date()) {
        Alert.alert("Invalid date", "Date of birth cannot be in the future.");
        return;
      }

      onUpdateGuest(selectedGuestId, "dateOfBirth", parsedDate);

      closeDrawer();
      return;
    }

    onUpdateGuest(selectedGuestId, selectedField, value);
    closeDrawer();
  };

  return (
    <View className="px-5">
      <Text className="mt-6 font-poppins-semibold text-2xl text-textMain">
        Guest Information
      </Text>

      <Text className="mt-2 font-poppins text-slate-500">
        Review or edit each guest&apos;s details.
      </Text>

      {guests.map((guest, index) => (
        <View key={guest.id} className="mt-5 rounded-2xl bg-white p-5">
          <Text className="mb-5 font-poppins-semibold text-xl text-textMain">
            Guest {index + 1}
          </Text>

          <GuestDetail
            label="First Name"
            value={guest.firstName}
            onEdit={() => openDrawer(guest, "firstName")}
          />

          <GuestDetail
            label="Last Name"
            value={guest.lastName}
            onEdit={() => openDrawer(guest, "lastName")}
          />

          <GuestDetail
            label="Date of Birth"
            value={guest.dateOfBirth ? formatDate(guest.dateOfBirth) : ""}
            onEdit={() => openDrawer(guest, "dateOfBirth")}
          />

          <GuestDetail
            label="Phone"
            value={guest.phone}
            onEdit={() => openDrawer(guest, "phone")}
          />

          <GuestDetail
            label="Email"
            value={guest.email}
            onEdit={() => openDrawer(guest, "email")}
          />
        </View>
      ))}

      {guests.length === 0 && (
        <View className="mt-10 items-center">
          <Text className="font-poppins text-slate-500">
            No guest information found.
          </Text>
        </View>
      )}

      <Modal
        visible={drawerVisible}
        transparent
        animationType="slide"
        statusBarTranslucent
        onRequestClose={closeDrawer}
      >
        <View className="flex-1 justify-end">
          {/* Dark backdrop */}
          <Pressable
            className="absolute inset-0 bg-black/40"
            onPress={closeDrawer}
            accessibilityLabel="Close edit drawer"
          />

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            {/* Bottom drawer */}
            <View className="rounded-t-[28px] bg-white px-5 pb-8 pt-3">
              <View className="mb-5 items-center">
                <View className="h-1.5 w-12 rounded-full bg-slate-300" />
              </View>

              <View className="mb-6 flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="font-poppins-semibold text-xl text-textMain">
                    Edit{" "}
                    {selectedField ? fieldLabels[selectedField] : "Details"}
                  </Text>

                  <Text className="mt-1 font-poppins text-sm text-slate-500">
                    Update the guest information below.
                  </Text>
                </View>

                <Pressable
                  onPress={closeDrawer}
                  hitSlop={10}
                  accessibilityRole="button"
                  accessibilityLabel="Close drawer"
                  className="ml-3 h-10 w-10 items-center justify-center rounded-full bg-slate-100"
                >
                  <Ionicons name="close" size={22} color={colors.primary} />
                </Pressable>
              </View>

              <Text className="mb-2 font-poppins-medium text-sm text-textMain">
                {selectedField ? fieldLabels[selectedField] : ""}
              </Text>

              <TextInput
                value={draftValue}
                onChangeText={setDraftValue}
                placeholder={
                  selectedField === "dateOfBirth"
                    ? "MM/DD/YYYY"
                    : selectedField === "email"
                      ? "Enter email address"
                      : selectedField === "phone"
                        ? "Enter phone number"
                        : `Enter ${selectedField ? fieldLabels[selectedField].toLowerCase() : "value"}`
                }
                placeholderTextColor="#94A3B8"
                autoFocus
                keyboardType={
                  selectedField === "email"
                    ? "email-address"
                    : selectedField === "phone"
                      ? "phone-pad"
                      : selectedField === "dateOfBirth"
                        ? "numbers-and-punctuation"
                        : "default"
                }
                autoCapitalize={selectedField === "email" ? "none" : "words"}
                className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-4 font-poppins text-base text-textMain"
              />

              {selectedField === "dateOfBirth" && (
                <Text className="mt-2 font-poppins text-xs text-slate-500">
                  Use month/day/year, for example 05/21/2000.
                </Text>
              )}

              <View className="mt-6 flex-row gap-3">
                <Pressable
                  onPress={closeDrawer}
                  className="flex-1 items-center justify-center rounded-xl border border-slate-300 py-4"
                >
                  <Text className="font-poppins-semibold text-base text-textMain">
                    Cancel
                  </Text>
                </Pressable>

                <Pressable
                  onPress={saveChanges}
                  className="flex-1 flex-row items-center justify-center gap-2 rounded-xl bg-salmon-600 py-4"
                >
                  <Ionicons name="checkmark" size={20} color="#FFFFFF" />

                  <Text className="font-poppins-semibold text-base text-white">
                    Confirm
                  </Text>
                </Pressable>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </View>
  );
}

function GuestDetail({
  label,
  value,
  onEdit,
}: {
  label: string;
  value: string;
  onEdit: () => void;
}) {
  return (
    <View className="mb-4">
      <Text className="mb-2 font-poppins text-sm text-slate-500">{label}</Text>

      <View className="flex-row items-center rounded-xl border border-slate-300 bg-slate-50">
        <Text
          numberOfLines={1}
          className="flex-1 px-4 py-3 font-poppins text-base text-textMain"
        >
          {value || "Not provided"}
        </Text>

        <Pressable
          onPress={onEdit}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel={`Edit ${label}`}
          className="flex-row items-center gap-1 px-3 py-3"
        >
          <Ionicons name="pencil-outline" size={18} color={colors.primary} />

          <Text className="font-poppins-medium text-sm text-primary">Edit</Text>
        </Pressable>
      </View>
    </View>
  );
}

function formatDate(value: Date | string): string {
  const date = typeof value === "string" ? parseDate(value) : value;

  if (!date || Number.isNaN(date.getTime())) {
    return typeof value === "string" ? value : "";
  }

  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
}

function parseDate(value: string): Date | null {
  const match = value.trim().match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

  if (!match) return null;

  const month = Number(match[1]);
  const day = Number(match[2]);
  const year = Number(match[3]);

  if (year < 1 || month < 1 || month > 12 || day < 1 || day > 31) {
    return null;
  }

  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}
