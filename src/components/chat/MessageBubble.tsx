import type { ChatMessage } from "@/data/types";
import { formatClock } from "@/lib/formatters";
import { Text, View } from "react-native";

type Props = Readonly<{
  message: ChatMessage;
  isMine: boolean;
}>;

export default function MessageBubble({ message, isMine }: Props) {
  return (
    <View
      className={`max-w-[80%] ${isMine ? "self-end" : "self-start"}`}>
      <View
        className={`rounded-[18px] px-3.5 py-2.5 ${
          isMine
            ? "rounded-br-[6px] bg-coral-400"
            : "rounded-bl-[6px] border border-coral-100 bg-white"
        }`}>
        <Text
          className={`text-[14px] leading-[20px] ${
            isMine ? "text-white" : "text-ink"
          }`}>
          {message.body}
        </Text>
      </View>
      <Text
        className={`mt-1 text-[10.5px] text-ink-400 ${
          isMine ? "text-right" : "text-left"
        }`}>
        {formatClock(message.createdAt)}
      </Text>
    </View>
  );
}
