import { useAuth } from "@/context/auth";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PrimaryButton from "../../components/common/PrimaryButton";
import type { Resort } from "../../data/types";
import { formatCurrency } from "../../lib/formatters";
import { startConversation } from "../../services/chat";
import { describeApiError, fetchResort } from "../../services/toura";
import { colors } from "../../styles/global";

export default function ResortDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useAuth();
  const router = useRouter();
  const [resort, setResort] = useState<Resort | null>(null);
  const [loading, setLoading] = useState(true);
  const [messaging, setMessaging] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let active = true;

      const load = async () => {
        if (typeof id !== "string") return;

        setLoading(true);
        const data = await fetchResort(id);

        if (active) {
          setResort(data);
          setLoading(false);
        }
      };

      load();

      return () => {
        active = false;
      };
    }, [id]),
  );

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  if (!resort) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-[18px] font-bold text-ink">
          Resort not found.
        </Text>
      </View>
    );
  }

  const canMessage = user?.role === "traveler" && user?.id !== resort.ownerId;

  const handleMessageOwner = async () => {
    if (messaging) return;
    setMessaging(true);
    try {
      const conversation = await startConversation({ resortId: resort.id });
      router.push({
        pathname: "/chat/[id]",
        params: { id: conversation.id },
      });
    } catch (e) {
      Alert.alert("Couldn't open chat", describeApiError(e));
    } finally {
      setMessaging(false);
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-white px-0 pt-0"
      contentContainerClassName="pb-8">
      <Image
        source={{ uri: resort.coverImage }}
        className="h-[260px] w-full bg-coral-100"
      />

      <View className="px-[18px] pt-[22px]">
        <Text className="text-[12px] font-bold uppercase tracking-normal text-coral-500">
          {resort.municipality}
        </Text>
        <Text className="mt-1.5 text-[28px] font-extrabold text-ink">
          {resort.name}
        </Text>
        <Text className="mt-2 text-[15px] leading-[22px] text-ink-600">
          {resort.tagline}
        </Text>

        <View className="mt-3 flex-row items-center">
          <Text className="text-[15px] font-extrabold text-coral-400">
            ★ {resort.rating}
          </Text>
          <Text className="ml-2 text-[13px] text-ink-500">
            ({resort.reviewCount} reviews)
          </Text>
        </View>

        <Text className="mt-3.5 text-[15px] leading-6 text-ink-600">
          {resort.description}
        </Text>
      </View>

      {resort.amenities.length > 0 && (
        <View className="px-[18px] pt-[22px]">
          <Text className="mb-3 text-[20px] font-extrabold text-ink">
            Amenities
          </Text>
          <View className="flex-row flex-wrap">
            {resort.amenities.map((item) => (
              <Text
                key={item}
                className="mb-2 mr-2 rounded-full border border-coral-200 bg-coral-50 px-3 py-2 text-[12px] font-semibold text-coral-700">
                {item}
              </Text>
            ))}
          </View>
        </View>
      )}

      <View className="px-[18px] pt-[22px]">
        <Text className="mb-3 text-[20px] font-extrabold text-ink">
          Available stays
        </Text>
        {resort.accommodations.length === 0 ? (
          <Text className="text-[13px] text-ink-500">
            No rooms listed for this resort yet.
          </Text>
        ) : (
          resort.accommodations.map((room) => (
            <View
              key={room.id}
              className="mb-4 overflow-hidden rounded-[18px] border border-coral-100 bg-white shadow-sm shadow-black/[0.06]">
              <Image
                source={{ uri: room.image }}
                className="h-[170px] w-full bg-coral-100"
              />
              <View className="p-[14px]">
                <Text className="text-[18px] font-extrabold text-ink">
                  {room.title}
                </Text>
                <Text className="mt-2 text-[13px] leading-5 text-ink-600">
                  {room.description}
                </Text>
                <Text className="mt-2 text-[12px] text-ink-500">
                  {room.capacity} guests • {room.bedType} • {room.size}
                </Text>
                <View className="mt-3 flex-row items-baseline">
                  <Text className="text-[22px] font-extrabold text-coral-600">
                    {formatCurrency(room.pricePerNight)}
                  </Text>
                  <Text className="text-[12px] text-ink-500">/ night</Text>
                </View>
              </View>
            </View>
          ))
        )}
      </View>

      {resort.offers.length > 0 && (
        <View className="px-[18px] pt-[22px]">
          <Text className="mb-3 text-[20px] font-extrabold text-ink">
            Special offers
          </Text>
          {resort.offers.map((offer) => (
            <View
              key={offer.id}
              className="mb-3.5 rounded-[16px] border border-coral-200 bg-coral-50 p-[14px]">
              <Text className="text-[11px] font-extrabold uppercase text-coral-500">
                {offer.tag}
              </Text>
              <Text className="mt-2 text-[18px] font-extrabold text-ink">
                {offer.title}
              </Text>
              <Text className="mt-2 text-[13px] leading-5 text-ink-600">
                {offer.description}
              </Text>
              <Text className="mt-2.5 text-[14px] font-extrabold italic text-coral-600">
                {offer.discountRate}
              </Text>
            </View>
          ))}
        </View>
      )}

      <View className="mx-[18px] mt-[18px] rounded-[18px] border border-coral-100 bg-white p-4 shadow-sm shadow-black/[0.06]">
        <Text className="mb-3 text-[18px] font-extrabold text-ink">
          From {formatCurrency(resort.basePrice)} / night
        </Text>
        <PrimaryButton label="Book this stay" />

        {canMessage ? (
          <Pressable
            onPress={handleMessageOwner}
            disabled={messaging}
            className="mt-3 flex-row items-center justify-center gap-2 rounded-[14px] border border-coral-200 bg-white py-[14px]">
            {messaging ? (
              <ActivityIndicator color={colors.primary} />
            ) : (
              <>
                <Ionicons
                  name="chatbubble-outline"
                  size={17}
                  color={colors.primary}
                />
                <Text className="text-[15px] font-bold text-coral-600">
                  Message owner
                </Text>
              </>
            )}
          </Pressable>
        ) : null}
      </View>
    </ScrollView>
  );
}
