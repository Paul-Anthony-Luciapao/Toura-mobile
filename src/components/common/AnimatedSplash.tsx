import { colors } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import {
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  Text,
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
    <Animated.View style={[StyleSheet.absoluteFill, containerStyle]}>
      <ImageBackground source={backgroundImage} style={styles.background}>
        <View style={styles.overlay} />
        <View style={styles.center}>
          <Animated.View style={[styles.logoRow, logoStyle]}>
            <Ionicons name="leaf-outline" size={40} color={colors.white} />
            <Text style={styles.logoText}>{logoText}</Text>
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
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logoText: {
    fontSize: 32,
    fontFamily: "Poppins_700Bold",
    color: colors.white,
  },
});
