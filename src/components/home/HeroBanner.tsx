import { Ionicons } from "@expo/vector-icons";
import { ImageBackground, Text, TextInput, View } from "react-native";
import Header from "./Header";

type Props = Readonly<{
  image: string;
  headline: string;
  subtext: string;
}>;

export default function HeroBanner({ image, headline, subtext }: Props) {
  return (
    <ImageBackground
      source={{ uri: image }}
      className="h-[440px] w-full"
      resizeMode="cover"
    >
      {/* Dark overlay */}
      <View className="absolute inset-0 bg-[rgba(11,46,74,0.75)]" />

      {/* Header */}
      <Header variant="light" />

      {/* Hero content */}
      <View className="mt-10 px-5">
        <Text className="text-5xl font-bold leading-[41px] text-white">
          {headline}
        </Text>

        <Text className="mt-3 text-xl leading-6 text-white">{subtext}</Text>

        {/* Search bar */}
        <View className="mt-5 flex-row items-center gap-2 rounded-full bg-white px-[14px] py-[6px]">
          <Ionicons name="search" size={18} color="#64748b" />

          <TextInput
            placeholder="Search destinations, itineraries..."
            placeholderTextColor="#64748b"
            className="flex-1 text-[14px] text-slate-900"
          />
        </View>
      </View>
    </ImageBackground>
  );
}
