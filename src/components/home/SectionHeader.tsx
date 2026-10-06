import { Text, View } from "react-native";

type Props = Readonly<{
  title: string;
  subtitle?: string;
  action?: string;
}>;

export default function SectionHeader({ title, subtitle, action }: Props) {
  return (
    <View className="mb-[14px] flex-row items-end justify-between px-0 pt-2 pb-3">
      <View>
        <Text className="text-[22px] font-bold text-ink">{title}</Text>
        {subtitle ? (
          <Text className="mt-1 text-[13px] text-ink-500">{subtitle}</Text>
        ) : null}
      </View>
      {action ? (
        <Text className="text-[13px] font-bold text-coral-400">{action}</Text>
      ) : null}
    </View>
  );
}
