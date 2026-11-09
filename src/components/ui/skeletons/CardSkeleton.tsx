import React from "react";
import { View } from "react-native";
import Skeleton from "@/components/ui/Skeleton";

export default function CardSkeleton() {
  return (
    <View className="mr-4 w-[280px] overflow-hidden rounded-[18px] border border-coral-100 bg-white shadow-sm shadow-black/[0.06]">
      <Skeleton width="100%" height={190} radius={0} />

      <View className="p-[14px]">
        <View className="flex-row justify-between">
          <Skeleton width="35%" height={12} />
          <Skeleton width="20%" height={12} />
        </View>

        <Skeleton className="mt-3" width="70%" height={18} />
        <Skeleton className="mt-2" width="100%" height={36} />

        <View className="mt-3 flex-row justify-between">
          <Skeleton width="28%" height={18} />
          <Skeleton width="30%" height={12} />
        </View>
        <Skeleton className="mt-1" width="18%" height={11} />
      </View>
    </View>
  );
}
