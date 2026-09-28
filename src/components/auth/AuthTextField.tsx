import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, TextInput, View, type TextInputProps } from "react-native";

type Props = Readonly<
  {
    icon: keyof typeof Ionicons.glyphMap;
    secure?: boolean;
  } & Omit<TextInputProps, "secureTextEntry">
>;

export default function AuthTextField({
  icon,
  secure = false,
  onFocus,
  onBlur,
  ...inputProps
}: Props) {
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(secure);

  return (
    <View
      className={`flex-row items-center rounded-xl border bg-white px-4 ${
        focused ? "border-[#a7ded8]" : "border-slate-200"
      }`}>
      <Ionicons name={icon} size={20} className="text-[#0f172a]" />
      <TextInput
        {...inputProps}
        secureTextEntry={hidden}
        placeholderTextColor="#64748b"
        onFocus={(e) => {
          setFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur?.(e);
        }}
        className="ml-3 h-12 flex-1 font-['Poppins_400Regular'] text-[13px] text-[#0f172a]"
      />
      {secure ? (
        <Pressable onPress={() => setHidden((v) => !v)} hitSlop={10}>
          <Ionicons
            name={hidden ? "eye-off-outline" : "eye-outline"}
            size={20}
            className="text-[#0f172a]"
          />
        </Pressable>
      ) : null}
    </View>
  );
}
