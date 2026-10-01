import { Image, Text, View } from "react-native";

export type TourPackageCardData = {
  id: string;
  title: string;
  image: string;
};

type Props = Readonly<{
  item: TourPackageCardData;
  className?: string;
}>;

export default function TourPackageCard({
  item,
  className = "",
}: Props) {
  return (
    <View className={`w-full ${className}`}>
      {/* Image */}
      <Image
        source={{ uri: item.image }}
        resizeMode="cover"
        className="h-[180px] w-full rounded-3xl bg-surfaceMuted"
      />

      {/* Title */}
      <Text
        className="mt-2 font-poppins-semibold text-[14px] text-textMain"
        numberOfLines={1}
      >
        {item.title}
      </Text>
    </View>
  );
}
