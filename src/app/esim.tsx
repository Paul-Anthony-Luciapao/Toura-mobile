import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// TODO: replace with the real beach hero asset, e.g.
// require("../../assets/images/esim-hero.png")
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=85";

const COUNTRIES = [
  "Japan",
  "Australia",
  "UK",
  "China",
  "Thailand",
  "Philippines",
];

const GUIDES: {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}[] = [
  { id: "ios", label: "iOS Devices", icon: "logo-apple" },
  { id: "android", label: "Android Devices", icon: "logo-android" },
];

// Placeholder copy. Replace the answers with the real text.
const FAQS: { id: string; question: string; answer: string }[] = [
  {
    id: "validity-start",
    question: "When does my eSIM validity period begin?",
    answer: "Answer coming soon.",
  },
  {
    id: "when-to-book",
    question: "When should I book or activate my eSIM?",
    answer: "Answer coming soon.",
  },
  {
    id: "validity-length",
    question:
      "How long is my eSIM valid after booking confirmation or first use of mobile data?",
    answer: "Answer coming soon.",
  },
  {
    // Kept exactly as in the Figma design. It looks like a duplicate or
    // truncated copy of the question above, so confirm the intended text.
    id: "validity-length-duplicate",
    question: "confirmation or first use of mobile data?",
    answer: "Answer coming soon.",
  },
  {
    id: "cancel",
    question: "Can I cancel my eSIM booking?",
    answer: "Answer coming soon.",
  },
];

// Slow, smooth expand. Increase to make the dropdown even slower.
const FAQ_ANIMATION_MS = 450;

type FaqItemProps = Readonly<{
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}>;

function FaqItem({ question, answer, isOpen, onToggle }: FaqItemProps) {
  const progress = useSharedValue(0);
  const contentHeight = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(isOpen ? 1 : 0, {
      duration: FAQ_ANIMATION_MS,
      easing: Easing.out(Easing.cubic),
    });
  }, [isOpen, progress]);

  const bodyStyle = useAnimatedStyle(() => ({
    height: contentHeight.value * progress.value,
    opacity: progress.value,
  }));

  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${progress.value * 180}deg` }],
  }));

  return (
    <Pressable
      onPress={onToggle}
      className="rounded-xl bg-surfaceSoft px-4 py-4"
      accessibilityRole="button"
      accessibilityState={{ expanded: isOpen }}>
      <View className="flex-row items-center gap-3">
        <Text className="flex-1 font-['Poppins_400Regular'] text-[14px] text-slate-900">
          {question}
        </Text>
        <Animated.View
          style={chevronStyle}
          className="h-7 w-7 items-center justify-center rounded-full bg-white">
          <Ionicons name="chevron-down" size={16} color="#0f766e" />
        </Animated.View>
      </View>

      {/* Clipped wrapper whose height animates from 0 to the measured height */}
      <Animated.View style={[{ overflow: "hidden" }, bodyStyle]}>
        {/* Absolutely positioned so it keeps its full height for measuring */}
        <View
          style={{ position: "absolute", top: 0, left: 0, right: 0 }}
          onLayout={(e) => {
            contentHeight.value = e.nativeEvent.layout.height;
          }}>
          <Text className="pt-3 font-['Poppins_400Regular'] text-[13px] leading-5 text-slate-600">
            {answer}
          </Text>
        </View>
      </Animated.View>
    </Pressable>
  );
}

export default function EsimScreen() {
  const insets = useSafeAreaInsets();
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="light-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-10">
        {/* Hero image */}
        <Image
          source={{ uri: HERO_IMAGE }}
          style={{ height: 210, width: "100%" }}
          contentFit="cover"
        />

        {/* Overlapping card */}
        <View className="-mt-[96px] mx-5 rounded-3xl bg-white px-5 pb-6 pt-6 shadow-md shadow-black/10">
          <Text className="text-center font-['Poppins_600SemiBold'] text-[20px] text-slate-900">
            eSim
          </Text>

          {/* Search (visual only for now) */}
          <View className="mt-5 h-[52px] flex-row items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4">
            <Ionicons name="search-outline" size={22} color="#0f172a" />
            <TextInput
              editable={false}
              placeholder="Search"
              placeholderTextColor="#94a3b8"
              className="flex-1 font-['Poppins_400Regular'] text-[15px] text-slate-900"
            />
          </View>

          {/* Country chips (visual only for now) */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="gap-2.5 pr-5"
            className="mt-4 -mx-5"
            contentInset={{ left: 20 }}
            contentOffset={{ x: -20, y: 0 }}>
            {COUNTRIES.map((country, index) => (
              <View
                key={country}
                className={`rounded-full bg-surfaceSoft px-4 py-2 ${
                  index === 0 ? "ml-5" : ""
                }`}>
                <Text className="font-['Poppins_400Regular'] text-[13px] text-slate-700">
                  {country}
                </Text>
              </View>
            ))}
          </ScrollView>

          {/* Setup and usage guide (visual only for now) */}
          <Text className="mt-6 font-['Poppins_600SemiBold'] text-[18px] text-slate-900">
            eSIM Setup and Usage Guide
          </Text>
          <View className="mt-3 flex-row gap-8 rounded-2xl border border-slate-200 bg-white px-4 py-3">
            {GUIDES.map((guide) => (
              <View key={guide.id} className="items-center gap-2">
                <View className="h-14 w-14 items-center justify-center rounded-full bg-surfaceSoft">
                  <Ionicons name={guide.icon} size={26} color="#0f172a" />
                </View>
                <Text className="font-['Poppins_400Regular'] text-[13px] text-slate-700">
                  {guide.label}
                </Text>
              </View>
            ))}
          </View>

          {/* FAQs */}
          <Text className="mt-6 font-['Poppins_600SemiBold'] text-[18px] text-slate-900">
            FAQs
          </Text>
          <View className="mt-3 gap-3">
            {FAQS.map((faq) => (
              <FaqItem
                key={faq.id}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFaqId === faq.id}
                onToggle={() =>
                  setOpenFaqId(openFaqId === faq.id ? null : faq.id)
                }
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Back button floating over the hero */}
      <Pressable
        onPress={() => router.back()}
        hitSlop={12}
        accessibilityRole="button"
        accessibilityLabel="Go back"
        className="absolute left-5 h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-black/20"
        style={{ top: insets.top + 8 }}>
        <Ionicons name="chevron-back" size={22} color="#0f172a" />
      </Pressable>
    </View>
  );
}
