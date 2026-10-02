import { colors } from "@/styles/global";
import SearchBar from "../common/SearchBar";

import { ImageBackground, Text, View } from "react-native";

import Header from "./Header";

type Props = Readonly<{
  image: string;
  headline: string;
  subtext: string;
}>;

export default function HeroBanner({ image, headline, subtext }: Props) {
  return (
    <ImageBackground source={{ uri: image }} className="h-[460px] w-full">
      <View
        className="absolute inset-0"
        style={{
          backgroundColor: colors.heroOverlayBottom,
        }}
      />

      <Header variant="light" />

      <View className="p-5">
        <Text className="font-poppins-semibold text-5xl lg:text-6xl leading-[50px] text-white">
          {headline}
        </Text>

        <Text className="mt-3 max-w-80 text-xl leading-6 text-white">
          {subtext}
        </Text>

        <SearchBar containerClassName="mt-5 border-transparent shadow-md shadow-black/10" />
      </View>
    </ImageBackground>
  );
}
