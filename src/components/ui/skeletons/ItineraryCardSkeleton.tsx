import React from "react";
import { View } from "react-native";
import Skeleton from "@/components/ui/Skeleton";

export default function ItineraryCardSkeleton() {
  return (
    <View className="mb-4 rounded-2xl border border-slate-200 bg-white p-4">
      <View className="flex-row justify-between">
        <Skeleton width="58%" height={18} />
        <Skeleton width={58} height={24} radius={999} />
      </View>

      <Skeleton className="mt-1.5" width="38%" height={14} />

      <View className="mt-5 flex-row items-center">
        <Skeleton width={18} height={18} radius={9} />
        <Skeleton className="ml-2" width="70%" height={14} />
      </View>

      <View className="mt-3 flex-row items-center">
        <Skeleton width={18} height={18} radius={9} />
        <Skeleton className="ml-2" width="35%" height={14} />
      </View>

      <View className="mt-3 flex-row items-center">
        <Skeleton width={18} height={18} radius={9} />
        <Skeleton className="ml-2" width="55%" height={14} />
      </View>

      <View className="mt-4 flex-row justify-between border-t border-slate-100 pt-3">
        <Skeleton width="28%" height={16} />
        <Skeleton width={20} height={20} radius={10} />
      </View>
    </View>
  );
}
