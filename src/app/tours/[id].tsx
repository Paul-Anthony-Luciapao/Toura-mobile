import { colors } from "@/styles/global";
import {
  createTourBooking,
  fetchTourPackages,
} from "@/services/tourBookings";
import { getErrorMessage } from "@/services/api";
import type { TourPackage } from "@/types/tourPackage";
import DateTimePicker, {
  type DateTimePickerChangeEvent,
} from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const formatDate = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate(),
  ).padStart(2, "0")}`;

export default function TourBookingScreen() {
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  const tourId = Array.isArray(id) ? id[0] : id;
  const [packages, setPackages] = useState<TourPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tourDate, setTourDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  });
  const [adults, setAdults] = useState("1");
  const [children, setChildren] = useState("0");
  const [pickupLocation, setPickupLocation] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  useEffect(() => {
    let active = true;
    fetchTourPackages()
      .then((items) => {
        if (active) setPackages(items);
      })
      .catch(() => {
        if (active) {
          Alert.alert("Tours unavailable", "Could not load tour details. Please go back and try again.");
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const tour = useMemo(
    () => packages.find((item) => item.id === tourId),
    [packages, tourId],
  );

  const parsedAdults = /^\d+$/.test(adults) ? Number(adults) : 0;
  const parsedChildren = /^\d+$/.test(children) ? Number(children) : 0;
  const participantCount = parsedAdults + parsedChildren;

  const handleDateChange = (
    _event: DateTimePickerChangeEvent,
    selectedDate: Date,
  ) => {
    setTourDate(selectedDate);
    setShowDatePicker(false);
  };

  const submitBooking = async () => {
    if (!tour) return;
    if (participantCount < 1 || participantCount > 20) {
      Alert.alert("Invalid participants", "Enter 1 to 20 participants.");
      return;
    }

    setSubmitting(true);
    try {
      const booking = await createTourBooking({
        tour_package_id: tour.id,
        tour_date: formatDate(tourDate),
        number_of_adults: parsedAdults,
        number_of_children: parsedChildren,
        pickup_location: pickupLocation.trim() || null,
        special_requests: specialRequests.trim() || null,
      });

      router.push({
        pathname: "/tours/payment",
        params: {
          bookingId: String(booking.id),
          bookingReference: booking.booking_reference,
          amount: booking.total_amount,
          tourName: tour.name,
        },
      });
    } catch (error) {
      Alert.alert("Could not create tour booking", getErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator color={colors.primary} />
      </SafeAreaView>
    );
  }

  if (!tour) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-background px-6">
        <Text className="font-poppins-semibold text-textMain">Tour not found.</Text>
        <Pressable onPress={() => router.back()} className="mt-4 rounded-xl bg-primary px-5 py-3">
          <Text className="font-poppins-semibold text-white">Go back</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top", "bottom"]}>
      <View className="flex-row items-center gap-3 px-5 py-3">
        <Pressable onPress={() => router.back()} accessibilityRole="button" className="h-10 w-10 items-center justify-center rounded-full bg-white">
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Text className="flex-1 font-poppins-semibold text-lg text-textMain">Book this tour</Text>
      </View>
      <ScrollView contentContainerClassName="gap-4 px-5 pb-8" keyboardShouldPersistTaps="handled">
        <View className="rounded-2xl bg-white p-4">
          <Text className="font-poppins-semibold text-lg text-textMain">{tour.name}</Text>
          <Text className="mt-1 font-poppins text-sm text-slate-500">{tour.municipality} · {tour.duration}</Text>
          <Text className="mt-3 font-poppins text-slate-600">{tour.description}</Text>
          <Text className="mt-3 font-poppins-semibold text-primary">₱{tour.price.toLocaleString("en-PH")} per person</Text>
        </View>

        <View className="gap-4 rounded-2xl bg-white p-4">
          <Text className="font-poppins-semibold text-textMain">Tour details</Text>
          <View>
            <Text className="mb-2 font-poppins-medium text-sm text-textMain">Tour date</Text>
            <Pressable onPress={() => setShowDatePicker((visible) => !visible)} className="rounded-xl border border-slate-200 px-4 py-3">
              <Text className="font-poppins text-textMain">{formatDate(tourDate)}</Text>
            </Pressable>
            {showDatePicker && (
              <DateTimePicker
                value={tourDate}
                mode="date"
                minimumDate={new Date()}
                onValueChange={handleDateChange}
                onDismiss={() => setShowDatePicker(false)}
              />
            )}
          </View>
          <NumberField label="Adults" value={adults} onChange={setAdults} />
          <NumberField label="Children" value={children} onChange={setChildren} />
          <TextField label="Pickup location (optional)" value={pickupLocation} onChange={setPickupLocation} placeholder="Hotel or meeting point" />
          <TextField label="Special requests (optional)" value={specialRequests} onChange={setSpecialRequests} placeholder="Let the operator know" multiline />
        </View>

        <View className="rounded-2xl bg-white p-4">
          <Text className="font-poppins-medium text-slate-600">Estimated total</Text>
          <Text className="mt-1 font-poppins-semibold text-xl text-textMain">
            ₱{(tour.price * participantCount).toLocaleString("en-PH")}
          </Text>
          <Text className="mt-1 font-poppins text-xs text-slate-500">
            Final total is calculated by the server. Children use the listed per-person rate.
          </Text>
        </View>
      </ScrollView>
      <View className="border-t border-slate-100 bg-white px-5 py-3">
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ disabled: submitting }}
          disabled={submitting}
          onPress={() => void submitBooking()}
          className={`items-center rounded-xl bg-salmon-600 py-4 ${submitting ? "opacity-60" : ""}`}
        >
          <Text className="font-poppins-semibold text-white">{submitting ? "Creating booking..." : "Continue to payment"}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function NumberField({
  label,
  value,
  onChange,
}: Readonly<{ label: string; value: string; onChange: (value: string) => void }>) {
  return (
    <View>
      <Text className="mb-2 font-poppins-medium text-sm text-textMain">{label}</Text>
      <TextInput
        value={value}
        onChangeText={(text) => onChange(text.replace(/[^\d]/g, ""))}
        keyboardType="number-pad"
        className="rounded-xl border border-slate-200 px-4 py-3 font-poppins text-textMain"
      />
    </View>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
  multiline = false,
}: Readonly<{
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  multiline?: boolean;
}>) {
  return (
    <View>
      <Text className="mb-2 font-poppins-medium text-sm text-textMain">{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        multiline={multiline}
        textAlignVertical={multiline ? "top" : "center"}
        className={`rounded-xl border border-slate-200 px-4 py-3 font-poppins text-textMain ${multiline ? "min-h-24" : ""}`}
      />
    </View>
  );
}
