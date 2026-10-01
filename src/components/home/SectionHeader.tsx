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
    <View className="mb-3.5 flex-row items-center justify-between">
      <View>
        <Text className="font-poppins-bold text-[22px] text-textMain">
          {title}
        </Text>
        {subtitle ? (
          <Text className="mt-1 font-poppins text-[13px] text-textMuted">
            {subtitle}
          </Text>
        ) : null}
      </View>

      {action ? (
        <Pressable onPress={onActionPress} hitSlop={8} className="active:opacity-70">
          <Text className="font-poppins-bold text-[13px] text-primary">
            {action}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}

