import { safeBack } from "@/lib/navigation";
import { carRentalProviders } from "@/data/carRentals";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, Linking, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CarRentalDetailScreen() {
  const { id: rawId } = useLocalSearchParams<{ id?: string | string[] }>();
  const id = Array.isArray(rawId) ? rawId[0] : rawId;
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const provider = carRentalProviders.find((item) => item.id === id);

  const callProvider = async () => {
    if (!provider) return;
    const phoneNumber = provider.phone.replace(/[\s()-]/g, "");
    await Linking.openURL(`tel:${phoneNumber}`);
  };

  const openMap = async () => {
    if (!provider) return;
    const query = encodeURIComponent(`${provider.name}, ${provider.location}`);
    await Linking.openURL(
      `https://www.google.com/maps/search/?api=1&query=${query}`,
    );
  };

  if (!provider) {
    return (
      <View
        className="flex-1 items-center justify-center bg-white px-8"
        style={{ paddingTop: insets.top }}
      >
        <Ionicons name="car-outline" size={38} color="#D97264" />
        <Text className="mt-3 text-center font-poppins-semibold text-[17px] text-slate-900">
          Rental details unavailable
        </Text>
        <Text className="mt-2 text-center font-poppins text-[13px] text-slate-500">
          This provider could not be found.
        </Text>
        <Pressable
          onPress={() => safeBack()}
          className="mt-4 rounded-full bg-[#4F9B8F] px-4 py-2"
        >
          <Text className="font-poppins-medium text-[13px] text-white">
            Go back
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white" contentContainerClassName="pb-10">
      <View className="relative">
        <Image
          source={provider.image}
          resizeMode="cover"
          accessibilityLabel={`${provider.name} rental vehicle`}
          className="h-[250px] w-full bg-[#EAF5F2]"
        />
        <Pressable
          onPress={() => safeBack()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          className="absolute left-5 h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow-sm"
          style={{ top: insets.top + 8 }}
        >
          <Ionicons name="chevron-back" size={21} color="#0f172a" />
        </Pressable>
      </View>

      <View className="px-5 pt-5">
        <View className="flex-row items-start justify-between gap-3">
          <View className="flex-1">
            <Text className="font-poppins-medium text-[12px] uppercase tracking-wide text-[#4F9B8F]">
              {provider.location}
            </Text>
            <Text className="mt-1 font-poppins-semibold text-[24px] leading-8 text-[#111729]">
              {provider.name}
            </Text>
          </View>
          {provider.rating !== undefined ? (
            <View className="flex-row items-center rounded-full bg-amber-50 px-3 py-2">
              <Ionicons name="star" size={14} color="#E3A326" />
              <Text className="ml-1 font-poppins-semibold text-[13px] text-slate-800">
                {provider.rating.toFixed(1)}
              </Text>
            </View>
          ) : null}
        </View>

        <View className="mt-5 flex-row flex-wrap gap-2">
          {provider.categories.map((category) => (
            <View
              key={category}
              className="rounded-full bg-coral-50 px-3 py-2"
            >
              <Text className="font-poppins-medium text-[12px] text-coral-600">
                {category}
              </Text>
            </View>
          ))}
        </View>

        {provider.fleet.length ? (
          <View className="mt-6 border-t border-slate-100 pt-4">
            <Text className="font-poppins-semibold text-[17px] text-slate-900">
              Available vehicles
            </Text>
            <View className="mt-3 flex-row flex-wrap gap-2">
              {provider.fleet.map((vehicle) => (
                <View
                  key={vehicle}
                  className="flex-row items-center rounded-xl border border-slate-100 px-3 py-2.5"
                >
                  <Ionicons name="car-outline" size={16} color="#4F9B8F" />
                  <Text className="ml-2 font-poppins text-[12px] text-slate-700">
                    {vehicle}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ) : null}

        {provider.services.length ? (
          <View className="mt-5">
            <Text className="font-poppins-semibold text-[17px] text-slate-900">
              Rental services
            </Text>
            {provider.services.map((service) => (
              <View key={service} className="mt-3 flex-row items-start">
                <Ionicons
                  name="checkmark-circle-outline"
                  size={17}
                  color="#4F9B8F"
                />
                <Text className="ml-2 flex-1 font-poppins text-[13px] leading-5 text-slate-600">
                  {service}
                </Text>
              </View>
            ))}
          </View>
        ) : null}

        <View className="mt-5 rounded-2xl border border-slate-100 p-4">
          <View className="flex-row items-start">
            <Ionicons name="location-outline" size={20} color="#D97264" />
            <View className="ml-3 flex-1">
              <Text className="font-poppins-semibold text-[14px] text-slate-900">
                Location and delivery
              </Text>
              <Text className="mt-1 font-poppins text-[13px] leading-5 text-slate-600">
                {provider.location}
              </Text>
            </View>
          </View>
          <Pressable
            onPress={() => void openMap()}
            accessibilityRole="link"
            className="mt-4 flex-row items-center justify-center rounded-xl border border-slate-200 py-3"
          >
            <Ionicons name="map-outline" size={17} color="#4F9B8F" />
            <Text className="ml-2 font-poppins-medium text-[13px] text-[#4F9B8F]">
              Search location in Maps
            </Text>
          </Pressable>
        </View>

        {provider.websiteName ? (
          <View className="mt-5 flex-row items-center rounded-2xl border border-slate-100 p-4">
            <Ionicons name="globe-outline" size={19} color="#4F9B8F" />
            <View className="ml-3 flex-1">
              <Text className="font-poppins-semibold text-[14px] text-slate-900">
                Website
              </Text>
              <Text className="mt-1 font-poppins text-[13px] text-slate-600">
                {provider.websiteName}
              </Text>
            </View>
          </View>
        ) : null}

        <Pressable
          onPress={() => void callProvider()}
          accessibilityRole="link"
          className="mt-5 flex-row items-center justify-center rounded-xl bg-[#4F9B8F] py-3.5 active:opacity-80"
        >
          <Ionicons name="call-outline" size={18} color="white" />
          <Text className="ml-2 font-poppins-medium text-[14px] text-white">
            Call {provider.phone}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
