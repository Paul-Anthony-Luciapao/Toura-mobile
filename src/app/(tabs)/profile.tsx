import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
    Image,
    Pressable,
    ScrollView,
    Text,
    View,
    useWindowDimensions,
} from "react-native";
import {
    SafeAreaView,
    useSafeAreaInsets,
} from "react-native-safe-area-context";

const COLORS = {
  teal: "#2A9D8F",
  paper: "#FFFEFE",
  mint: "#E9F7F5",
  ink: "#172033",
};

// Width of the original Figma screenshot.
const FIGMA_W = 775;
const SHEET_RADIUS = 24;

const avatar = require("../../../assets/images/profile-images/ChatGPT Image Sep 30, 2026, 02_26_30 PM 1.png");
const cover = require("../../../assets/images/elnido.jpg");
const postPhoto = require("../../../assets/images/profile-images/Frame 2087327664.png");

const destinations = [
  {
    name: "Paris",
    image: require("../../../assets/images/profile-images/Ellipse 276.png"),
  },
  {
    name: "Thailand",
    image: require("../../../assets/images/profile-images/Ellipse 277.png"),
  },
  {
    name: "Dubai",
    image: require("../../../assets/images/profile-images/Ellipse 278.png"),
  },
  {
    name: "Japan",
    image: require("../../../assets/images/profile-images/Ellipse 279.png"),
  },
];

const FALLBACK_NAME = "Marites Santos";
const FALLBACK_HANDLE = "@marites99";

// Generate a handle from the user's email.
function getHandle(email?: string) {
  const local = email
    ?.split("@")[0]
    ?.toLowerCase()
    .replace(/[^a-z0-9._]/g, "");

  return local ? `@${local}` : FALLBACK_HANDLE;
}

export default function Profile() {
  const router = useRouter();
  const { user } = useAuth();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  // Scale Figma measurements to the device width.
  const s = (n: number) => (n * width) / FIGMA_W;
  const sheetTop = s(310);

  // Logged-out screen.
  if (!user) {
    return (
      <SafeAreaView
        className="flex-1 px-5 pt-8"
        style={{ backgroundColor: COLORS.paper }}
        edges={["top"]}
      >
        <StatusBar style="dark" />

        <Text className="text-[24px] font-poppins-bold text-[#172033]">
          Profile
        </Text>

        <View className="mt-8 gap-4">
          <Text className="text-[16px] font-poppins text-[#334155]">
            You are not signed in yet.
          </Text>

          <Pressable
            onPress={() => router.push("/login")}
            accessibilityRole="button"
            className="items-center rounded-xl px-4 py-3"
            style={{ backgroundColor: COLORS.teal }}
          >
            <Text className="font-poppins-semibold text-white">Log in</Text>
          </Pressable>

          <Pressable
            onPress={() => router.push("/signup-role")}
            accessibilityRole="button"
            className="items-center rounded-xl border px-4 py-3"
            style={{ borderColor: COLORS.teal }}
          >
            <Text className="font-poppins-semibold text-[#172033]">
              Sign up
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const displayName = user.name?.trim() || FALLBACK_NAME;
  const handle = getHandle(user.email);

  return (
    <View className="flex-1" style={{ backgroundColor: COLORS.paper }}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* ---------- Cover image ---------- */}
        {/* Replaces ImageBackground with View + Image. */}
        <View
          style={{
            height: sheetTop + SHEET_RADIUS,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Image
            source={cover}
            resizeMode="cover"
            accessible={false}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: "100%",
              height: "100%",
            }}
          />

          {/* Settings button */}
          <Pressable
            onPress={() => router.push("/settings")}
            accessibilityRole="button"
            accessibilityLabel="Open settings"
            hitSlop={14}
            style={{
              position: "absolute",
              top: insets.top + 8,
              right: s(33),
            }}
          >
            <Ionicons name="settings-outline" size={30} color="white" />
          </Pressable>
        </View>

        {/* ---------- White profile sheet ---------- */}
        <View
          style={{
            marginTop: -SHEET_RADIUS,
            height: s(140),
            borderTopLeftRadius: SHEET_RADIUS,
            borderTopRightRadius: SHEET_RADIUS,
            backgroundColor: COLORS.paper,
          }}
        >
          {/* Profile avatar */}
          <Image
            source={avatar}
            style={{
              position: "absolute",
              left: s(65),
              top: -s(100),
              width: s(230),
              height: s(230),
              borderRadius: s(115),
              borderWidth: 3,
              borderColor: "white",
            }}
          />

          {/* Camera badge */}
          <View
            className="items-center justify-center rounded-full border-2 border-white"
            style={{
              position: "absolute",
              left: s(235),
              top: s(91),
              width: s(46),
              height: s(46),
              backgroundColor: COLORS.ink,
            }}
          >
            <Ionicons name="camera-outline" size={14} color="white" />
          </View>

          {/* Profile name and handle */}
          <View
            style={{
              position: "absolute",
              left: s(329),
              right: s(32),
              top: s(24),
            }}
          >
            <View className="flex-row items-center gap-2">
              <Text
                numberOfLines={1}
                className="shrink text-[20px] font-poppins-bold text-[#172033]"
              >
                {displayName}
              </Text>

              <View
                className="h-6 w-6 items-center justify-center rounded-full"
                style={{ backgroundColor: COLORS.mint }}
              >
                <Ionicons name="create-outline" size={14} color={COLORS.ink} />
              </View>
            </View>

            <Text className="text-[15px] font-poppins text-[#334155]">
              {handle}
            </Text>
          </View>
        </View>

        {/* ---------- Profile content ---------- */}
        <View style={{ paddingHorizontal: s(32) }}>
          <Text
            className="text-[18px] font-poppins-semibold text-[#172033]"
            style={{ marginTop: s(30) }}
          >
            Where I’ve Been
          </Text>

          {/* Destination images */}
          <View className="mt-2 flex-row justify-between">
            {destinations.map((destination) => (
              <View key={destination.name} className="items-center">
                <Image
                  source={destination.image}
                  resizeMode="cover"
                  style={{
                    width: s(124),
                    height: s(124),
                    borderRadius: s(62),
                  }}
                />

                <Text className="mt-1 text-[14px] font-poppins text-[#111111]">
                  {destination.name}
                </Text>
              </View>
            ))}
          </View>

          {/* ---------- Post header ---------- */}
          <View className="mt-3 flex-row items-center gap-3">
            <Image
              source={avatar}
              style={{
                width: s(62),
                height: s(62),
                borderRadius: s(31),
              }}
            />

            <View>
              <Text className="text-[18px] font-poppins-semibold text-[#172033]">
                {displayName}
              </Text>

              <View className="flex-row items-center gap-2">
                <Text className="text-[14px] font-poppins text-[#64748B]">
                  12d
                </Text>

                <Ionicons name="globe-outline" size={15} color="#94A3B8" />

                <Text className="text-[14px] font-poppins text-[#64748B]">
                  Vietnam
                </Text>
              </View>
            </View>
          </View>

          {/* Post caption */}
          <Text className="mt-2 text-[17px] font-poppins text-[#172033]">
            Hello there... 😏
          </Text>

          {/* Post image */}
          <Image
            source={postPhoto}
            resizeMode="cover"
            className="mt-2 w-full overflow-hidden rounded-[22px]"
            style={{ aspectRatio: 1 }}
          />

          {/* Pagination dots */}
          <View className="mt-2 flex-row items-center justify-center gap-1.5">
            {[0, 1, 2, 3, 4].map((dot) => (
              <View
                key={dot}
                className="rounded-full"
                style={{
                  width: dot === 0 ? 10 : 6,
                  height: dot === 0 ? 10 : 6,
                  backgroundColor: dot === 0 ? COLORS.teal : "#D9D9D9",
                }}
              />
            ))}
          </View>

          {/* Post actions */}
          <View className="mt-2 flex-row items-center gap-5">
            <View className="flex-row items-center gap-1">
              <Ionicons name="heart-outline" size={22} color={COLORS.ink} />
              <Text className="font-poppins text-[#172033]">200k</Text>
            </View>

            <View className="flex-row items-center gap-1">
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={21}
                color={COLORS.ink}
              />
              <Text className="font-poppins text-[#172033]">1,001</Text>
            </View>

            <View className="flex-row items-center gap-1">
              <Ionicons
                name="arrow-redo-outline"
                size={22}
                color={COLORS.ink}
              />
              <Text className="font-poppins text-[#172033]">2m</Text>
            </View>
          </View>
        </View>

        {/* ---------- View itinerary button ---------- */}
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push("/my-itineraries")}
          className="mx-5 mt-4 items-center rounded-xl px-4 py-3"
          style={{ backgroundColor: COLORS.teal }}
        >
          <Text className="font-poppins-semibold text-white">
            View my itinerary
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
