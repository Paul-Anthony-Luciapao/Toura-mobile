import React from "react";
import { View } from "react-native";

type SkeletonProps = {
  width?: number | string;
  height?: number;
  radius?: number;
  className?: string;
};

export default function Skeleton({
  width = "100%",
  height = 20,
  radius = 8,
  className,
}: SkeletonProps) {
  return (
    <View
      className={className}
      style={{
        width,
        height,
        borderRadius: radius,
        backgroundColor: "#E2E8F0",
      }}
    />
  );
}
