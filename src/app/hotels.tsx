import ResortCard from "@/components/home/ResortCard";
import type { Resort } from "@/data/types";
import { getErrorMessage } from "@/services/api";
import { fetchResorts } from "@/services/resorts";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HotelsScreen() {
  const insets = useSafeAreaInsets();
  const [resorts, setResorts] = useState<Resort[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadResorts = useCallback(async () => {
    setError(null);
    try {
      setResorts(await fetchResorts());
    } catch (e) {
      setError(getErrorMessage(e));
    }
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await loadResorts();
      setLoading(false);
    })();
  }, [loadResorts]);

  const renderContent = () => {
    if (loading) {
      return (
        <View className="mt-16 items-center">
          <ActivityIndicator color="#0f766e" />
        </View>
      );
    }
    if (error) {
      return (
        <View className="mt-16 items-center px-6">
          <Text className="text-center text-[13px] text-red-600">{error}</Text>
        </View>
      );
    }
    if (resorts.length === 0) {
      return (
        <View className="mt-16 items-center px-6">
          <Text className="text-center text-[13px] text-slate-500">
            No hotels available yet.
          </Text>
        </View>
      );
    }
    return (
      <View className="items-center gap-4 px-5">
        {resorts.map((resort) => (
          <ResortCard key={resort.id} resort={resort} />
        ))}
      </View>
    );
  };

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top + 8 }}>
      <View className="flex-row items-center gap-3 px-5 pb-4">
        <Pressable
          onPress={() => router.back()}
          hitSlop={12}
          className="h-9 w-9 items-center justify-center rounded-full border border-slate-200">
          <Ionicons name="chevron-back" size={20} color="#0f172a" />
        </Pressable>
        <Text className="font-['Poppins_600SemiBold'] text-[18px] text-slate-900">
          Popular Hotels in Palawan
        </Text>
      </View>

      <ScrollView contentContainerClassName="pb-10">
        {renderContent()}
      </ScrollView>
    </View>
  );
}
