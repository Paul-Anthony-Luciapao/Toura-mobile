import { globalStyles } from "@/styles/global";
import { Text, View } from "react-native";

export default function Messages() {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Message</Text>
    </View>
  );
}
