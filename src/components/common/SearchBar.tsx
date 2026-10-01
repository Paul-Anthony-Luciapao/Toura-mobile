import { Ionicons } from "@expo/vector-icons";
import { Pressable, TextInput, TextInputProps, View } from "react-native";

type Props = TextInputProps & {
  onClear?: () => void;
  containerClassName?: string;
};

export default function SearchBar({
  value,
  onChangeText,
  placeholder = "Search destinations, itineraries...",
  containerClassName = "",
  ...props
}: Props) {
  return (
    <View
      className={`h-11 flex-row items-center gap-5 rounded-full border border-border bg-white px-3 ${containerClassName}`}
    >
      {/* Search Icon */}
      <Ionicons
        name="search"
        size={22}
        color="#475569"
      />

      {/* Input */}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#64748b"
        className="h-11 flex-1 py-0 font-poppins text-[14px] text-textMain"
        {...props}
      />

      {/* Clear Button */}
      {value ? (
        <Pressable
          onPress={() => onChangeText?.("")}
          hitSlop={8}
        >
          <Ionicons
            name="close-circle"
            size={17}
            color="#94a3b8"
          />
        </Pressable>
      ) : null}
    </View>
  );
}
