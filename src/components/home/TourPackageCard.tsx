import { Image, Text, View } from "react-native";

export type TourPackageCardData = {
  id: string;
  title: string;
  image: string;
};

type Props = Readonly<{
  item: TourPackageCardData;
}>;

export default function TourPackageCard({ item }: Props) {
  return (
    <View className="w-[170px]">
      <Image
        source={{ uri: item.image }}
        className="h-[130px] w-full rounded-t-[18px] bg-slate-200"
      />
      <Text
        className="mt-2 text-[14px] font-semibold text-slate-900"
        numberOfLines={1}>
        {item.title}
      </Text>
    </View>
  );
}
