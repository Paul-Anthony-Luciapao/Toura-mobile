import { Text, View } from "react-native";

type Props = Readonly<{
  title: string;
  subtitle?: string;
  action?: string;
}>;

export default function SectionHeader({ title, subtitle, action }: Props) {
  return (
    <View className="mb-[14px] flex-row items-center justify-between px-0 pt-4 pb-3">
      <View>
        <Text className="text-[22px] font-bold text-slate-900">{title}</Text>
        {subtitle ? (
          <Text className="mt-1 text-[13px] text-slate-500">{subtitle}</Text>
        ) : null}
      </View>
      {action ? (
        <Text className="text-[13px] font-bold text-[#0f766e]">{action}</Text>
      ) : null}
    </View>
  );
}
