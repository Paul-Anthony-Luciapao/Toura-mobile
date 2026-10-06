import { Image } from "expo-image";
import { Text, View } from "react-native";

type Props = Readonly<{
  name?: string | null;
  uri?: string | null;
  size?: number;
}>;

function initialsOf(name?: string | null) {
  if (!name) return "?";
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function ChatAvatar({ name, uri, size = 48 }: Props) {
  const dimension = { width: size, height: size, borderRadius: size / 2 };

  if (uri) {
    return (
      <Image source={{ uri }} style={dimension} contentFit="cover" />
    );
  }

  return (
    <View
      className="items-center justify-center bg-coral-200"
      style={dimension}>
      <Text
        className="font-bold text-coral-700"
        style={{ fontSize: size * 0.36 }}>
        {initialsOf(name)}
      </Text>
    </View>
  );
}
