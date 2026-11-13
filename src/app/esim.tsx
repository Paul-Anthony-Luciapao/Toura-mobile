import { safeBack } from "@/lib/navigation";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StatusBar, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const FAQ_ANIMATION_MS = 350;

const FAQS = [
  {
    id: "compatibility",
    question: "How do I know if my phone supports eSIM?",
    answer:
      "eSIM support depends on your exact phone model, region, and carrier. Check your device maker’s compatibility information and confirm your phone is unlocked before choosing a plan.",
  },
  {
    id: "install",
    question: "Can I install my eSIM before traveling?",
    answer:
      "Many providers let you install an eSIM over Wi-Fi before your trip. Check the plan instructions first because validity may begin at installation, activation, or first network connection.",
  },
  {
    id: "voice-sms",
    question: "Does a travel eSIM include calls and text messages?",
    answer:
      "That depends on the plan. Many travel eSIMs provide mobile data only. Check the plan details for calls, SMS, hotspot use, and supported networks before you buy.",
  },
  {
    id: "validity",
    question: "When does the plan validity start?",
    answer:
      "The start time is set by the provider and can differ between plans. Read the activation terms before installing or turning on the eSIM.",
  },
  {
    id: "troubleshooting",
    question: "What should I do if the eSIM has no service?",
    answer:
      "Check that the eSIM line is enabled and selected for mobile data. Follow the provider’s network, APN, and data roaming instructions. Contact the provider before deleting the eSIM; some QR codes can only be used once.",
  },
  {
    id: "refunds",
    question: "Can I cancel or get a refund?",
    answer:
      "Cancellation and refund rules depend on the provider and whether the eSIM has been installed or activated. Review the provider’s terms before purchasing.",
  },
];

const SETUP_STEPS = {
  ios: [
    "Connect to Wi-Fi and open Settings > Cellular (or Mobile Service).",
    "Tap Add eSIM and choose the activation method supplied by your provider, such as a QR code or provider app.",
    "Follow the on-screen steps, label the line, and check the provider’s instructions for when to turn it on.",
  ],
  android: [
    "Connect to Wi-Fi and open your phone’s SIM settings.",
    "On Pixel, look under Network & internet > SIMs > Add SIM. On Samsung Galaxy, look under Connections > SIM manager > Add eSIM.",
    "Scan the provider’s QR code or follow its app or manual activation steps. Menu names can vary by model and software version.",
  ],
} as const;

const ANDROID_ERROR_STEPS = [
  "If Add eSIM is missing, check eSIM support for your exact phone model, region, and carrier, and confirm the phone is unlocked.",
  "Connect to a reliable Wi-Fi network, restart the phone, then try again from its built-in SIM settings.",
  "If the QR code is reported as invalid, expired, or already used, ask the eSIM provider for help or a replacement activation method. Don’t delete an installed line before checking with them.",
] as const;

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
      accessibilityRole="button"
      accessibilityState={{ expanded: isOpen }}
      className="rounded-2xl border border-slate-100 bg-white px-4 py-4"
    >
      <View className="flex-row items-center gap-3">
        <Text className="flex-1 font-poppins-medium text-[14px] leading-5 text-slate-900">
          {question}
        </Text>
        <Animated.View
          style={chevronStyle}
          className="h-7 w-7 items-center justify-center rounded-full bg-[#E9F7F5]"
        >
          <Ionicons name="chevron-down" size={16} color="#0f766e" />
        </Animated.View>
      </View>
      <Animated.View style={[{ overflow: "hidden" }, bodyStyle]}>
        <View
          style={{ position: "absolute", top: 0, left: 0, right: 0 }}
          onLayout={(event) => {
            contentHeight.value = event.nativeEvent.layout.height;
          }}
        >
          <Text className="pt-3 font-poppins text-[13px] leading-5 text-slate-600">
            {answer}
          </Text>
        </View>
      </Animated.View>
    </Pressable>
  );
}

function GuideStep({ index, children }: { index: number; children: string }) {
  return (
    <View className="mt-3 flex-row items-start">
      <View className="h-6 w-6 items-center justify-center rounded-full bg-[#E9F7F5]">
        <Text className="font-poppins-semibold text-[11px] text-[#0f766e]">
          {index}
        </Text>
      </View>
      <Text className="ml-3 flex-1 font-poppins text-[13px] leading-5 text-slate-600">
        {children}
      </Text>
    </View>
  );
}

export default function EsimScreen() {
  const insets = useSafeAreaInsets();
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);
  const [selectedGuide, setSelectedGuide] = useState<"ios" | "android">("ios");

  return (
    <View className="flex-1 bg-[#F8FAFC]">
      <StatusBar barStyle="dark-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + 8,
          paddingBottom: insets.bottom + 28,
        }}
      >
        <View className="flex-row items-center gap-3 px-5 pb-4">
          <Pressable
            onPress={() => safeBack()}
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            className="h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white"
          >
            <Ionicons name="chevron-back" size={20} color="#0f172a" />
          </Pressable>
          <Text className="flex-1 font-poppins-semibold text-[18px] text-slate-900">
            eSIM Guide
          </Text>
        </View>

        <View className="px-5">
          <LinearGradient
            colors={["#115E59", "#238276", "#4F9B8F"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              borderRadius: 26,
              overflow: "hidden",
              paddingHorizontal: 20,
              paddingVertical: 24,
            }}
          >
            <View className="mb-5 h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
              <Ionicons name="cellular-outline" size={26} color="white" />
            </View>
            <Text className="font-poppins-semibold text-[23px] leading-8 text-white">
              Stay connected in Palawan
            </Text>
            <Text className="mt-2 font-poppins text-[13px] leading-5 text-white/90">
              Learn how to prepare, install, and use a Philippines travel eSIM.
            </Text>
            <View className="mt-5 flex-row items-center self-start rounded-full bg-white/15 px-3 py-2">
              <Ionicons name="information-circle-outline" size={15} color="white" />
              <Text className="ml-1.5 font-poppins-medium text-[11px] text-white">
                TRAVEL SETUP GUIDE
              </Text>
            </View>
          </LinearGradient>

          <View className="mt-5 rounded-2xl border border-slate-100 bg-white p-4">
            <Text className="font-poppins-semibold text-[16px] text-slate-900">
              Before you start
            </Text>
            {[
              "Confirm your exact phone model supports eSIM and is carrier-unlocked.",
              "Use Wi-Fi to install the eSIM and keep the provider’s QR code or activation details available.",
              "Check the provider’s coverage, data allowance, and when plan validity begins.",
            ].map((item) => (
              <View key={item} className="mt-3 flex-row items-start">
                <Ionicons name="checkmark-circle" size={17} color="#238276" />
                <Text className="ml-2 flex-1 font-poppins text-[13px] leading-5 text-slate-600">
                  {item}
                </Text>
              </View>
            ))}
          </View>

          <View className="mt-6">
            <Text className="font-poppins-semibold text-[18px] text-slate-900">
              Set up your eSIM
            </Text>
            <Text className="mt-1 font-poppins text-[13px] leading-5 text-slate-500">
              Choose your device for the steps that match its settings.
            </Text>

            <View className="mt-3 flex-row rounded-xl bg-slate-200/70 p-1">
              {(["ios", "android"] as const).map((guide) => {
                const active = selectedGuide === guide;
                return (
                  <Pressable
                    key={guide}
                    onPress={() => setSelectedGuide(guide)}
                    accessibilityRole="button"
                    accessibilityState={{ selected: active }}
                    className="flex-1 flex-row items-center justify-center rounded-lg py-2.5"
                    style={{
                      backgroundColor: active ? "#ffffff" : "transparent",
                      elevation: active ? 1 : 0,
                    }}
                  >
                    <Ionicons
                      name={guide === "ios" ? "logo-apple" : "logo-android"}
                      size={17}
                      color={active ? "#0f766e" : "#64748b"}
                    />
                    <Text
                      className="ml-2 font-poppins-medium text-[13px]"
                      style={{ color: active ? "#0f172a" : "#475569" }}
                    >
                      {guide === "ios" ? "iPhone" : "Android"}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <View className="mt-3 rounded-2xl border border-slate-100 bg-white p-4">
              {SETUP_STEPS[selectedGuide].map((step, index) => (
                <GuideStep key={step} index={index + 1}>
                  {step}
                </GuideStep>
              ))}
            </View>

            {selectedGuide === "android" && (
              <View className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                <View className="flex-row items-center">
                  <Ionicons name="warning-outline" size={19} color="#b45309" />
                  <Text className="ml-2 font-poppins-semibold text-[15px] text-slate-900">
                    If Android setup fails
                  </Text>
                </View>
                {ANDROID_ERROR_STEPS.map((step, index) => (
                  <GuideStep key={step} index={index + 1}>
                    {step}
                  </GuideStep>
                ))}
                <Text className="mt-3 font-poppins text-[12px] leading-[18px] text-slate-600">
                  If it still fails, contact your eSIM provider with the exact error message and your phone model. They can check the activation and carrier support.
                </Text>
              </View>
            )}
          </View>

          <View className="mt-6 rounded-2xl bg-[#E9F7F5] p-4">
            <View className="flex-row items-center">
              <Ionicons name="airplane-outline" size={19} color="#0f766e" />
              <Text className="ml-2 font-poppins-semibold text-[16px] text-slate-900">
                When you arrive
              </Text>
            </View>
            <GuideStep index={1}>
              Select the travel eSIM for mobile data in your phone’s SIM settings.
            </GuideStep>
            <GuideStep index={2}>
              Turn on data roaming for that line only if the provider’s instructions require it.
            </GuideStep>
            <GuideStep index={3}>
              Check that data roaming is off for your home SIM if you want to avoid your home carrier’s roaming charges.
            </GuideStep>
          </View>

          <View className="mt-6">
            <Text className="font-poppins-semibold text-[18px] text-slate-900">
              Frequently asked questions
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

          <View className="mt-5 flex-row items-start rounded-2xl border border-slate-100 bg-white p-4">
            <Ionicons name="headset-outline" size={20} color="#238276" />
            <View className="ml-3 flex-1">
              <Text className="font-poppins-semibold text-[14px] text-slate-900">
                Need help with your plan?
              </Text>
              <Text className="mt-1 font-poppins text-[12px] leading-[18px] text-slate-600">
                Contact the eSIM provider shown in your purchase confirmation for plan-specific setup, coverage, and refund support.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
