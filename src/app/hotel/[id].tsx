import Skeleton from "@/components/ui/Skeleton";
import { getErrorMessage } from "@/services/api";
import { fetchHotel } from "@/services/hotels";
import type { Hotel } from "@/types/hotel";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  Image,
  Linking,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HotelDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadHotel = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      setHotel(await fetchHotel(id));
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    void loadHotel();
  }, [loadHotel]);

  const openMap = async () => {
    if (!hotel) return;
    const query = encodeURIComponent(
      [hotel.name, hotel.address, hotel.municipality, "Palawan"].filter(Boolean).join(", "),
    );
    await Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${query}`);
  };

  const callHotel = async () => {
    if (hotel?.phone) await Linking.openURL(`tel:${hotel.phone}`);
  };

  if (loading) {
    return (
      <View className="flex-1 bg-white" style={{ paddingTop: insets.top + 12 }}>
        <View className="px-5">
          <Skeleton width="100%" height={250} radius={16} />
          <Skeleton width="35%" height={14} className="mt-6" />
          <Skeleton width="75%" height={28} className="mt-3" />
          <Skeleton width="100%" height={14} className="mt-5" />
          <Skeleton width="90%" height={14} className="mt-2" />
        </View>
      </View>
    );
  }

  if (!hotel) {
    return (
      <View
        className="flex-1 items-center justify-center bg-white px-8"
        style={{ paddingTop: insets.top }}
      >
        <Ionicons name="bed-outline" size={36} color="#D97264" />
        <Text className="mt-3 text-center font-poppins-semibold text-[17px] text-slate-900">
          Hotel details unavailable
        </Text>
        <Text className="mt-2 text-center font-poppins text-[13px] text-slate-500">
          {error ?? "This hotel could not be found."}
        </Text>
        {error ? (
          <Pressable onPress={() => void loadHotel()} className="mt-4 rounded-full border border-slate-200 px-4 py-2">
            <Text className="font-poppins-medium text-[13px] text-slate-700">Try again</Text>
          </Pressable>
        ) : null}
        <Pressable onPress={() => router.back()} className="mt-3 rounded-full bg-[#4F9B8F] px-4 py-2">
          <Text className="font-poppins-medium text-[13px] text-white">Go back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white" contentContainerClassName="pb-10">
      <View className="relative">
        <Image
          source={hotel.image}
          resizeMode="cover"
          accessibilityLabel={`${hotel.name} hotel photo`}
          className="h-[270px] w-full bg-slate-100"
        />
        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          className="absolute left-5 h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow-sm"
          style={{ top: insets.top + 8 }}
        >
          <Ionicons name="chevron-back" size={21} color="#0f172a" />
        </Pressable>
      </View>

      <View className="px-5 pt-5">
        <Text className="font-poppins-medium text-[12px] uppercase tracking-wide text-[#4F9B8F]">
          {hotel.municipality}, Palawan
        </Text>
        <Text className="mt-1 font-poppins-semibold text-[25px] leading-8 text-[#111729]">
          {hotel.name}
        </Text>

        <View className="mt-5 border-t border-slate-100 pt-4">
          <Text className="font-poppins-semibold text-[17px] text-slate-900">
            About this hotel
          </Text>
          <Text className="mt-2 font-poppins text-[14px] leading-[22px] text-slate-600">
            {hotel.description}
          </Text>
        </View>

        <View className="mt-5 rounded-2xl border border-slate-100 p-4">
          <View className="flex-row items-start">
            <Ionicons name="location-outline" size={20} color="#D97264" />
            <View className="ml-3 flex-1">
              <Text className="font-poppins-semibold text-[14px] text-slate-900">Location</Text>
              <Text className="mt-1 font-poppins text-[13px] leading-5 text-slate-600">
                {hotel.address || hotel.municipality + ", Palawan"}
              </Text>
            </View>
          </View>
          <Pressable
            onPress={() => void openMap()}
            accessibilityRole="link"
            className="mt-4 flex-row items-center justify-center rounded-xl bg-[#4F9B8F] py-3"
          >
            <Ionicons name="map-outline" size={17} color="white" />
            <Text className="ml-2 font-poppins-medium text-[13px] text-white">Open in Maps</Text>
          </Pressable>
        </View>

        {hotel.amenities?.length ? (
          <View className="mt-5">
            <Text className="font-poppins-semibold text-[17px] text-slate-900">Amenities</Text>
            <View className="mt-3 flex-row flex-wrap gap-2">
              {hotel.amenities.map((amenity) => (
                <View key={amenity} className="rounded-full border border-slate-200 px-3 py-2">
                  <Text className="font-poppins text-[12px] text-slate-700">{amenity}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : null}

        {hotel.phone ? (
          <Pressable
            onPress={() => void callHotel()}
            accessibilityRole="link"
            className="mt-5 flex-row items-center rounded-2xl border border-slate-100 p-4"
          >
            <Ionicons name="call-outline" size={19} color="#4F9B8F" />
            <View className="ml-3">
              <Text className="font-poppins-semibold text-[14px] text-slate-900">Contact hotel</Text>
              <Text className="mt-1 font-poppins text-[13px] text-slate-600">{hotel.phone}</Text>
            </View>
          </Pressable>
        ) : null}
      </View>
    </ScrollView>
  );
}
