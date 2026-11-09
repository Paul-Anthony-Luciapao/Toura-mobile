import React from "react";
import { View } from "react-native";
import Skeleton from "@/components/ui/Skeleton";

export default function ResortDetailSkeleton() {
  return (
    <View className="flex-1 bg-white">
      {/* Cover image */}
      <Skeleton width="100%" height={260} radius={0} className="bg-coral-100" />

      {/* Header info */}
      <View className="px-[18px] pt-[22px]">
        <Skeleton width="40%" height={12} className="mb-1.5" />
        <Skeleton width="60%" height={28} className="mt-1" />
        <Skeleton width="70%" height={15} className="mt-2" />

        <View className="mt-3 flex-row items-center">
          <Skeleton width="20%" height={15} radius={999} />
          <Skeleton width="30%" height={13} className="ml-2" />
        </View>

        {/* Description */}
        <Skeleton width="100%" height={14} className="mt-4" />
        <Skeleton width="60%" height={14} className="mt-1" />
        <Skeleton width="40%" height={14} className="mt-1" />

        {/* Rooms section */}
        <View className="mt-5">
          <Skeleton width="20%" height={20} className="mb-3" />
          {[0, 1].map((i) => (
            <View
              key={i}
              className="mb-4 overflow-hidden rounded-[18px] border border-coral-100 bg-white shadow-sm"
            >
              <Skeleton width="100%" height={170} radius={0} className="bg-coral-100" />
              <View className="p-[14px]">
                <Skeleton width="50%" height={18} />
                <Skeleton width="80%" height={13} className="mt-2" />
                <Skeleton width="70%" height={12} className="mt-2" />
                <View className="mt-3 flex-row items-baseline">
                  <Skeleton width="25%" height={22} radius={999} />
                  <Skeleton width="15%" height={12} className="ml-2" />
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Offers section */}
        <View className="mt-5 px-[18px]">
          <Skeleton width="25%" height={20} className="mb-3" />
          <View className="mb-3.5 rounded-[16px] border border-coral-200 bg-coral-50 p-[14px]">
            <Skeleton width="15%" height={11} className="mb-2" />
            <Skeleton width="40%" height={18} />
            <Skeleton width="60%" height={13} className="mt-2" />
            <Skeleton width="50%" height={12} className="mt-2" />
            <Skeleton width="20%" height={14} className="mt-2.5" />
          </View>
        </View>

        {/* Price + action bar */}
        <View className="mx-[18px] mt-[18px] rounded-[18px] border border-coral-100 bg-white p-4 shadow-sm">
          <Skeleton width="30%" height={18} className="mb-3" />
          <Skeleton width="40%" height={14} radius={999} className="mb-3" />
          <View className="mt-3 flex-row items-center justify-center gap-2 rounded-[14px] border border-coral-200 bg-white py-[14px]">
            <Skeleton width={17} height={17} radius={999} />
            <Skeleton width="40%" height={15} className="ml-2" />
          </View>
        </View>
      </View>
    </View>
  );
}
