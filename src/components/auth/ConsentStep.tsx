import GradientButton from "@/components/common/GradientButton";
import type { LegalSection } from "@/data/legalContent";
import { router } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = Readonly<{
  title: string;
  sections: LegalSection[];
  onAccept: () => void;
  onDecline?: () => void;
}>;

export default function ConsentStep({
  title,
  sections,
  onAccept,
  onDecline,
}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-1 bg-[#f8fafc]"
      style={{ paddingTop: insets.top + 12 }}>
      <ScrollView className="flex-1" contentContainerClassName="px-6 pb-6">
        <Text className="mb-6 text-center font-['Poppins_700Bold'] text-[26px] text-[#0f172a]">
          {title}
        </Text>

        {sections.map((section, index) => (
          <Text
            key={`${section.label}-${index}`}
            className="mb-4 font-['Poppins_400Regular'] text-sm leading-[22px] text-[#334155]">
            <Text className="font-['Poppins_700Bold'] text-[#0f172a]">
              {section.label}{" "}
            </Text>
            {section.text}
          </Text>
        ))}
      </ScrollView>

      <View
        className="flex-row gap-3 border-t border-slate-200 bg-white px-6 pt-4"
        style={{ paddingBottom: insets.bottom + 16 }}>
        <Pressable
          onPress={onDecline ?? (() => router.back())}
          className="flex-1 items-center justify-center rounded-xl border border-slate-300 py-3">
          <Text className="font-['Poppins_600SemiBold'] text-[14px] text-[#334155]">
            Decline
          </Text>
        </Pressable>
        <GradientButton label="Accept" className="flex-1" onPress={onAccept} />
      </View>
    </View>
  );
}
