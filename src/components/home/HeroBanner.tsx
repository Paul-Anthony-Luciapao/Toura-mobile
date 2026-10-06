import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/styles/global";
import type { ImageSourcePropType } from "react-native";
import { ImageBackground, Text, TextInput, View } from "react-native";
import Header from "./Header";

type Props = Readonly<{
  image: ImageSourcePropType;
  headline: string;
  subtext: string;
}>;

export default function HeroBanner({ image, headline, subtext }: Props) {
  return (
    <ImageBackground source={image} className="h-[440px] w-full">
      <View className="absolute inset-0 bg-[rgba(27,31,30,0.45)]" />
      <View className="absolute inset-x-0 bottom-0 h-40 bg-[rgba(27,31,30,0.35)]" />

      <Header variant="light" />

      <View className="mt-auto px-5 pb-8">
        <Text className="text-[34px] font-bold leading-[40px] text-white">
          {headline}
        </Text>
        <Text className="mt-3 text-[14px] leading-5 text-white/90">{subtext}</Text>

        <View className="mt-6 flex-row items-center gap-2 rounded-full bg-white px-4 py-3 shadow-lg shadow-black/20">
          <Ionicons name="search" size={18} color={colors.textMuted} />
          <TextInput
            placeholder="Search destinations, itineraries..."
            placeholderTextColor={colors.textMuted}
            className="flex-1 text-[14px] text-ink"
          />
        </View>
      </View>
    </ImageBackground>
  );
}
