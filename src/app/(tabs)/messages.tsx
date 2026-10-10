import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import {
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
  Image,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

const MOCK_CONVERSATIONS = [
  {
    id: "1",
    name: "Toura - Admin",
    avatar: "https://i.pravatar.cc/150?u=toura",
    lastMessage: "Hi there! 👋 Welcome to...",
    time: "1:00PM",
    read: true,
    isLogo: true,
  },
  {
    id: "2",
    name: "Karen - Palwan Dreams",
    avatar: "https://i.pravatar.cc/150?u=karen",
    lastMessage: "Let's go to Bali next year...",
    time: "1:00PM",
    read: true,
  },
  {
    id: "3",
    name: "Unknown",
    avatar: null,
    lastMessage: "Hello ABCD......",
    time: "1:00PM",
    read: true,
  },
  {
    id: "4",
    name: "Maria",
    avatar: "https://i.pravatar.cc/150?u=maria",
    lastMessage: "Hi, I would like to see your...",
    time: "1:00PM",
    read: true,
  },
];

export default function Messages() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      {/* Subtle top gradient */}
      <LinearGradient
        colors={["rgba(59, 162, 154, 0.15)", "rgba(255, 255, 255, 0)"]}
        style={{ position: "absolute", top: 0, left: 0, right: 0, height: 120 }}
      />
      
      <View className="px-5 mt-4 z-10">
        <View className="flex-row items-center border border-gray-200 rounded-full px-4 py-2.5 bg-white">
          <Ionicons name="search" size={20} color="#1F2937" />
          <TextInput
            placeholder="Search"
            className="flex-1 ml-3 text-[15px] text-gray-800 font-poppins"
            placeholderTextColor="#6B7280"
          />
        </View>
      </View>

      <View className="flex-row items-center justify-between px-5 mt-6 mb-3">
        <Text className="text-[17px] font-poppins-medium text-ink">Messages</Text>
        <Text className="text-[15px] font-poppins text-[#3BA29A]">Requests</Text>
      </View>

      <FlatList
        data={MOCK_CONVERSATIONS}
        keyExtractor={(item) => item.id}
        contentContainerClassName="px-5 py-2 pb-24"
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable className="flex-row items-center py-4 bg-white">
            <View className="mr-4">
              {item.isLogo ? (
                <View className="w-12 h-12 rounded-full border border-[#3BA29A] items-center justify-center bg-white">
                  <Ionicons name="water-outline" size={28} color="#3BA29A" />
                </View>
              ) : item.avatar ? (
                <Image
                  source={{ uri: item.avatar }}
                  className="w-12 h-12 rounded-full"
                />
              ) : (
                <View className="w-12 h-12 rounded-full bg-gray-200 items-center justify-center">
                  <Ionicons name="person" size={28} color="white" />
                </View>
              )}
            </View>

            <View className="flex-1 justify-center">
              <Text className="text-[15px] font-poppins-medium text-ink mb-0.5">
                {item.name}
              </Text>
              <Text className="text-[13px] text-gray-500 font-poppins">
                {item.lastMessage}
              </Text>
            </View>

            <View className="items-end justify-start h-full pt-1">
              <View className="flex-row items-center">
                {item.read && (
                  <Ionicons name="checkmark-done-outline" size={16} color="#3BA29A" />
                )}
                <Text className="text-[11px] text-gray-500 ml-1 font-poppins">
                  {item.time}
                </Text>
              </View>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

