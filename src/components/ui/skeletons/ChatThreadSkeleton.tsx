import React from "react";
import { View } from "react-native";
import Skeleton from "@/components/ui/Skeleton";

export default function ChatThreadSkeleton() {
  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between border-b border-coral-100 bg-white px-4 py-3">
        <View className="flex-row items-center gap-3">
          <View className="h-10 w-10 rounded-full bg-coral-100">
            <Skeleton width={40} height={40} radius={999} className="bg-coral-100" />
          </View>
          <View>
            <Skeleton width="50%" height={16} radius={999} />
            <Skeleton width="70%" height={12} className="mt-1" />
          </View>
        </View>
        <View className="h-9 w-9 items-center justify-center rounded-full bg-coral-200">
          <Skeleton width={18} height={18} radius={999} className="bg-coral-200" />
        </View>
      </View>

      {/* Messages list */}
      <View className="flex-1 px-4 py-4 gap-2">
        {[0, 1, 2, 3, 4].map((i, idx) => (
          <View key={idx} className="my-2">
            <Skeleton width="30%" height={11} className="rounded-full bg-white px-3 py-1" />
          </View>
        ))}
        {[0, 1, 2, 3].map((i, idx) => (
          <View key={`msg-${idx}`} className="my-2">
            <View className="max-w-[80%] rounded-[20px] bg-coral-50 px-4 py-3">
              <Skeleton width="100%" height={14} className="mb-2" />
              <Skeleton width="70%" height={14} className="mb-1" />
              <Skeleton width="90%" height={12} />
            </View>
            <Skeleton width="40%" height={10} className="mt-0.5 text-right" />
          </View>
        ))}
        {[0, 1].map((i, idx) => (
          <View key={`msg2-${idx}`} className="my-2">
            <View className="max-w-[80%] ml-auto rounded-[20px] bg-white px-4 py-3">
              <Skeleton width="100%" height={14} className="mb-2" />
              <Skeleton width="70%" height={14} className="mb-1" />
              <Skeleton width="90%" height={12} />
            </View>
            <Skeleton width="40%" height={10} className="mt-0.5 text-right" />
          </View>
        ))}
      </View>

      {/* Input area */}
      <View className="flex-row items-end gap-2 border-t border-coral-100 bg-white px-3 pt-2.5 pb-10">
        <View className="max-h-[120px] flex-1 rounded-[20px] border border-coral-100 bg-coral-50 px-4 py-3">
          <Skeleton width="100%" height={14} className="mb-1" />
          <Skeleton width="60%" height={14} />
        </View>
        <View className="h-11 w-11 items-center justify-center rounded-full bg-coral-400">
          <Skeleton width={18} height={18} radius={999} className="bg-coral-400" />
        </View>
      </View>
    </View>
  );
}
