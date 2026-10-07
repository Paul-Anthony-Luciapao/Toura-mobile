import { Pressable, Text, View } from "react-native";

type Props = Readonly<{
  title: string;
  subtitle?: string;
  action?: string;
  onActionPress?: () => void;
}>;

export default function SectionHeader({
  title,
  subtitle,
  action,
  onActionPress,
}: Props) {
  return (
    <View className="mb-[14px] flex-row items-end justify-between px-0 pt-2 pb-3">
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
