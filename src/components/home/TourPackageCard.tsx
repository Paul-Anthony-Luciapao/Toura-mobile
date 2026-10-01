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
    <View
      className={`w-[170px] overflow-hidden rounded-[18px] bg-white shadow-md shadow-black/10 ${className}`}
    >
      {/* Image */}
      <Image
        source={{ uri: item.image }}
        resizeMode="cover"
        className="h-[130px] w-full bg-slate-200"
      />

      {/* Title */}
      <View className="px-3 pb-3 pt-2">
        <Text
          className="font-poppins-semibold text-[14px] text-textMain"
          numberOfLines={1}
        >
          {item.title}
        </Text>
      </View>
    </View>
  );
}
