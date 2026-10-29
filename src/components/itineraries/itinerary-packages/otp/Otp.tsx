import React, { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";

type OtpProps = {
  onVerify: () => void;
};

const generateOtp = (): string =>
  Math.floor(100000 + Math.random() * 900000).toString();

export default function Otp({ onVerify }: OtpProps) {
  const [code, setCode] = useState("");
  const [demoOtp, setDemoOtp] = useState<string>(generateOtp);

  const verifyOtp = () => {
    if (code.length !== 6) {
      Alert.alert("Invalid OTP", "Enter the six-digit code.");
      return;
    }

    if (code !== demoOtp) {
      Alert.alert("Incorrect OTP", "Please try again.");
      return;
    }

    onVerify();
  };

  const resendOtp = () => {
    setDemoOtp(generateOtp());
    setCode("");
    Alert.alert("New OTP", "A new demo code has been generated.");
  };

  return (
    <View className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <Text className="text-center font-poppins-semibold text-xl text-textMain">
        One-Time Password (OTP)
      </Text>

      <Text className="mt-3 text-center font-poppins text-sm text-slate-500">
        Enter the six-digit code displayed below.
      </Text>

      <View className="relative mt-6 flex-row justify-center gap-2">
        {Array.from({ length: 6 }, (_, index) => (
          <View
            key={index}
            className="h-12 w-10 items-center justify-center rounded-md border border-slate-200 bg-slate-50"
          >
            <Text className="font-poppins-semibold text-xl text-primary">
              {code[index] ?? ""}
            </Text>
          </View>
        ))}

        <TextInput
          value={code}
          onChangeText={(value) =>
            setCode(value.replace(/\D/g, "").slice(0, 6))
          }
          keyboardType="number-pad"
          maxLength={6}
          accessibilityLabel="Six digit demo OTP"
          autoFocus
          caretHidden
          className="absolute inset-0 h-12 w-full opacity-[0.02]"
        />
      </View>

      <View className="mt-5 items-center rounded-xl bg-amber-50 p-3">
        <Text className="font-poppins text-xs text-slate-500">
          Demo verification code
        </Text>

        <Text className="mt-1 font-poppins-semibold text-2xl text-primary">
          {demoOtp}
        </Text>

        <Text className="mt-1 text-center font-poppins text-xs text-slate-500">
          Demo only — no SMS or email is sent.
        </Text>
      </View>

      <Pressable onPress={resendOtp} className="mt-5 items-center py-2">
        <Text className="font-poppins-medium text-sm text-primary">
          Generate a new OTP
        </Text>
      </Pressable>

      <Pressable
        onPress={verifyOtp}
        className="mt-3 items-center rounded-xl bg-salmon-600 py-4"
      >
        <Text className="font-poppins-semibold text-base text-white">
          Verify &amp; Continue
        </Text>
      </Pressable>
    </View>
  );
}
