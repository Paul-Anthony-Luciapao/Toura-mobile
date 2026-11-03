import type { LegalSection } from "@/data/legalContent";
import { colors } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = Readonly<{
  title: string;
  sections: LegalSection[];
  footer: string;
}>;

export default function LegalScreen({ title, sections, footer }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-white">
      <View className="px-5 pb-3" style={{ paddingTop: insets.top + 8 }}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </Pressable>
      </View>

      <ScrollView contentContainerClassName="px-6 pb-10">
        <Text className="mb-7 text-center text-[30px] font-['Poppins_700Bold'] text-ink">
          {title}
        </Text>

        {sections.map((section, index) => (
          <Text
            key={`${section.label}-${index}`}
            className="mb-5 font-['Poppins_400Regular'] text-sm leading-[22px] text-ink-600">
            <Text className="font-['Poppins_700Bold'] text-ink">
              {section.label}{" "}
            </Text>
            {section.text}
          </Text>
        ))}

        <Text className="mt-3 text-center font-['Poppins_400Regular'] text-[11px] text-ink-500">
          {footer}
        </Text>
      </ScrollView>
    </View>
  );
}
