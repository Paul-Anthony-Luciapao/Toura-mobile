import React from "react";
import { ScrollView, View } from "react-native";
import Skeleton from "@/components/ui/Skeleton";

export default function ItineraryDetailSkeleton() {
  return (
    <View className="flex-1 bg-background">
      <View className="flex-row items-center justify-center border-b border-slate-100 px-5 py-4">
        <View className="absolute left-5 h-9 w-9 items-center justify-center rounded-full bg-white">
          <Skeleton width={9} height={9} radius={999} />
        </View>
        <Skeleton width="20%" height={18} radius={999} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>
        <View className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <Skeleton width="100%" height={48} radius={0} className="bg-teal-50" />

          <View className="p-4">
            <View className="flex-row items-start justify-between gap-3">
              <View className="flex-1">
                <Skeleton width="60%" height={18} radius={999} />
                <Skeleton width="80%" height={14} className="mt-1" />
              </View>
              <View className="rounded-full px-3 py-1 bg-teal-50">
                <Skeleton width={60} height={14} radius={999} />
              </View>
            </View>

            <View className="mt-4 flex-row items-start rounded-xl bg-amber-50 p-3">
              <Skeleton width={19} height={19} radius={999} />
              <Skeleton width="60%" height={14} className="ml-2 mt-0.5" />
            </View>
          </View>
        </View>

        {/* Booking details */}
        <View className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
          <Skeleton width="25%" height={18} className="mb-3" />
          {[0, 1, 2, 3, 4].map((i) => (
            <View key={i} className="flex-row items-start py-2">
              <Skeleton width={19} height={19} radius={999} className="mr-3 mt-0.5" />
              <View className="flex-1">
                <Skeleton width="30%" height={10} className="text-xs" />
                <Skeleton width="70%" height={14} className="mt-0.5" />
              </View>
            </View>
          ))}
        </View>

        {/* Day-by-day itinerary */}
        <View className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
          <Skeleton width="25%" height={18} className="mb-3" />
          {[0, 1, 2].map((i) => (
            <View
              key={i}
              className={`flex-row ${i < 2 ? "border-b border-slate-100" : ""} py-3`}
            >
              <View className="mr-3 h-8 w-8 items-center justify-center rounded-full bg-teal-50">
                <Skeleton width={20} height={20} radius={999} />
              </View>
              <View className="flex-1">
                <Skeleton width="50%" height={14} radius={999} />
                <Skeleton width="80%" height={12} className="mt-1" />
                <Skeleton width="60%" height={12} className="mt-1" />
              </View>
            </View>
          ))}
        </View>

        {/* Inclusions */}
        <View className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
          <Skeleton width="20%" height={18} className="mb-3" />
          {[0, 1, 2].map((i) => (
            <View key={i} className="mb-2 flex-row items-center">
              <Skeleton width={18} height={18} radius={999} className="mt-0.5" />
              <Skeleton width="50%" height={14} className="ml-2" />
            </View>
          ))}
        </View>

        {/* Guests */}
        <View className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
          <Skeleton width="15%" height={18} className="mb-3" />
          {[0, 1, 2].map((i) => (
            <View
              key={i}
              className={`py-3 ${i < 2 ? "border-b border-slate-100" : ""}`}
            >
              <Skeleton width="40%" height={14} radius={999} />
              <Skeleton width="30%" height={12} className="mt-1" />
              <Skeleton width="50%" height={12} className="mt-1" />
            </View>
          ))}
        </View>

        {/* Delete button */}
        <View className="mt-5 flex-row items-center justify-center rounded-xl border border-red-300 bg-white py-4">
          <Skeleton width={19} height={19} radius={999} />
          <Skeleton width="30%" height={15} className="ml-2" />
        </View>
      </ScrollView>
    </View>
  );
}
