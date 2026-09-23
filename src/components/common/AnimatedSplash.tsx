import { colors } from "@/styles/global";
import { Image } from "expo-image";
import { useEffect } from "react";
import {
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  View,
} from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

type Props = Readonly<{
  backgroundImage: ImageSourcePropType;
  holdDuration?: number;
  onFinish: () => void;
}>;

export default function AnimatedSplash({
  backgroundImage,
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
    <Animated.View style={[StyleSheet.absoluteFill, containerStyle]}>
      <ImageBackground source={backgroundImage} style={styles.background}>
        <View style={styles.overlay} />
        <View style={styles.center}>
          <Animated.View style={logoStyle}>
            <Image
              source={require("../../../assets/logo/toura-logo.png")}
              style={styles.logo}
              contentFit="contain"
            />
          </Animated.View>
        </View>
      </ImageBackground>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.heroOverlayBottom,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 120,
    height: 120,
  },
});
