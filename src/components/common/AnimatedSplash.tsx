import { Image } from "expo-image";
import { useEffect } from "react";
import { ImageBackground, ImageSourcePropType, View } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

type Props = Readonly<{
  backgroundImage: ImageSourcePropType;
  logoText?: string;
  holdDuration?: number;
  onFinish: () => void;
}>;

export default function AnimatedSplash({
  backgroundImage,
  logoText = "Toura",
  holdDuration = 1800,
  onFinish,
}: Props) {
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.85);
  const screenOpacity = useSharedValue(1);

  useEffect(() => {
    logoOpacity.value = withTiming(1, { duration: 500 });
    logoScale.value = withTiming(1, { duration: 500 });

    screenOpacity.value = withDelay(
      holdDuration,
      withTiming(0, { duration: 400 }, (finished) => {
        if (finished) {
          runOnJS(onFinish)();
        }
      }),
    );
  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  const containerStyle = useAnimatedStyle(() => ({
    opacity: screenOpacity.value,
  }));

  return (
    <Animated.View className="absolute inset-0" style={containerStyle}>
      <ImageBackground source={backgroundImage} className="flex-1">
        <View className="absolute inset-0 bg-[rgba(11,46,74,0.75)]" />
        <View className="flex-1 items-center justify-center">
          <Animated.View className="items-center" style={logoStyle}>
            <Image
              source={require("../../../assets/logo/toura-logo.png")}
              className="h-[120px] w-[120px]"
              contentFit="contain"
            />
          </Animated.View>
        </View>
      </ImageBackground>
    </Animated.View>
  );
}
