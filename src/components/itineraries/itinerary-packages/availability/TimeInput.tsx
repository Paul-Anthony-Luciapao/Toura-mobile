import type { TimePickerSettings } from "@/data/types";
import DateTimePicker, {
    type DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import DateTimeField from "./DateTimeField";

type Props = Readonly<{
  value: Date;
  settings: TimePickerSettings;
  onChange: (time: Date) => void;
}>;

export default function TimeInput({ value, settings, onChange }: Props) {
  const [showPicker, setShowPicker] = useState(false);
  const [draftTime, setDraftTime] = useState(value);

  const handleTimeChange = (
    event: DateTimePickerEvent,
    selectedTime?: Date,
  ) => {
    if (event.type === "set" && selectedTime) {
      setDraftTime(selectedTime);
    }
  };

  const closePicker = () => {
    setShowPicker(false);
    setDraftTime(value);
  };

  const confirmTime = () => {
    onChange(draftTime);
    setShowPicker(false);
  };

  return (
    <>
      <DateTimeField
        accessibilityLabel="Time"
        icon="time-outline"
        trailingIcon="time-outline"
        value={value.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        })}
        onPress={() => {
          setDraftTime(value);
          setShowPicker(true);
        }}
      />
      <Modal
        visible={showPicker}
        transparent
        animationType="fade"
        onRequestClose={closePicker}
      >
        <View className="flex-1 items-center justify-center px-5">
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Close time picker"
            className="absolute inset-0 bg-black/40"
            onPress={closePicker}
          />
          <View className="w-full max-w-md items-center overflow-hidden rounded-2xl border border-slate-200 bg-white p-4">
            <DateTimePicker
              value={draftTime}
              mode="time"
              display="spinner"
              is24Hour={settings.hourCycle === 24}
              minuteInterval={settings.minuteInterval}
              onChange={handleTimeChange}
            />
            <View className="mt-2 w-full flex-row justify-end gap-3">
              <Pressable
                accessibilityRole="button"
                onPress={closePicker}
                className="rounded-lg px-4 py-2 active:opacity-70"
              >
                <Text className="font-poppins-medium text-sm text-textMuted">
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                onPress={confirmTime}
                className="rounded-lg bg-primary px-4 py-2 active:opacity-70"
              >
                <Text className="font-poppins-medium text-sm text-white">
                  Done
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
