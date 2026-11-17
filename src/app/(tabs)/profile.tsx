import { getCustomTabBarContentPadding } from "@/components/CustomTabBar";
import { useAuth } from "@/context/AuthContext";
import { fetchMyItineraryBookings } from "@/services/itineraryBookings";
import { roleLabel } from "@/services/auth";
import { fetchMyTourBookings } from "@/services/tourBookings";
import { colors } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState, type ReactNode } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

const fallbackAvatar = require("../../../assets/images/profile-images/ChatGPT Image Sep 30, 2026, 02_26_30 PM 1.png");
const coverImage = require("../../../assets/images/elnido.jpg");

type ProfileRowProps = Readonly<{
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  isLast?: boolean;
}>;

function ProfileRow({ icon, label, onPress, isLast = false }: ProfileRowProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      className={`min-h-14 flex-row items-center px-4 active:bg-coral-50 ${
        isLast ? "" : "border-b border-slate-100"
      }`}>
      <View className="h-9 w-9 items-center justify-center rounded-xl bg-coral-50">
        <Ionicons name={icon} size={19} color={colors.primaryDark} />
      </View>
      <Text className="ml-3 flex-1 font-poppins-medium text-sm text-textMain">
        {label}
      </Text>
      <Ionicons name="chevron-forward" size={18} color={colors.textSubtle} />
    </Pressable>
  );
}

function ProfileSection({
  title,
  children,
}: Readonly<{ title: string; children: ReactNode }>) {
  return (
    <View className="mt-6">
      <Text className="mb-2 px-1 font-poppins-semibold text-xs uppercase tracking-wider text-textMuted">
        {title}
      </Text>
      <View className="overflow-hidden rounded-2xl border border-coral-100 bg-white">
        {children}
      </View>
    </View>
  );
}

function TravelStat({
  icon,
  label,
  value,
  loading,
  onPress,
}: Readonly<{
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: number | null;
  loading: boolean;
  onPress: () => void;
}>) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${label}: ${value ?? (loading ? "loading" : "unavailable")}`}
      onPress={onPress}
      className="flex-1 rounded-2xl border border-coral-100 bg-white p-4 active:bg-coral-50">
      <View className="h-9 w-9 items-center justify-center rounded-xl bg-coral-50">
        <Ionicons name={icon} size={19} color={colors.primaryDark} />
      </View>
      <View className="mt-3 min-h-8 justify-center">
        {loading ? (
          <ActivityIndicator size="small" color={colors.primary} />
        ) : (
          <Text className="font-poppins-bold text-2xl text-textMain">
            {value ?? "—"}
          </Text>
        )}
      </View>
      <Text className="mt-1 font-poppins text-xs text-textMuted">{label}</Text>
    </Pressable>
  );
}

export default function Profile() {
  const router = useRouter();
  const { user, signOut, loading: authLoading } = useAuth();
  const insets = useSafeAreaInsets();
  const [travelSummary, setTravelSummary] = useState<{
    bookings: number;
    itineraries: number;
  } | null>(null);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  useFocusEffect(
    useCallback(() => {
      if (!user || user.role !== "traveler") {
        setTravelSummary(null);
        setSummaryLoading(false);
        return;
      }

      let active = true;
      setSummaryLoading(true);

      Promise.all([fetchMyItineraryBookings(), fetchMyTourBookings()])
        .then(([itineraryBookings, tourBookings]) => {
          if (active) {
            setTravelSummary({
              bookings: itineraryBookings.length + tourBookings.length,
              itineraries: itineraryBookings.length,
            });
          }
        })
        .catch(() => {
          if (active) setTravelSummary(null);
        })
        .finally(() => {
          if (active) setSummaryLoading(false);
        });

      return () => {
        active = false;
      };
    }, [user]),
  );

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await signOut();
      router.replace("/");
    } catch {
      Alert.alert("Could not sign out", "Please try again.");
    } finally {
      setSigningOut(false);
    }
  };

  const displayName = user?.name?.trim() || "Traveler";
  const initials = displayName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
  const profileImage = user?.avatar ? { uri: user.avatar } : fallbackAvatar;

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <StatusBar style="light" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: getCustomTabBarContentPadding(insets.bottom),
        }}>
        <View className="h-[230px] overflow-hidden">
          <Image
            source={coverImage}
            resizeMode="cover"
            accessible={false}
            className="absolute inset-0 h-full w-full"
          />
          <LinearGradient
            pointerEvents="none"
            colors={["rgba(15, 23, 42, 0.22)", "rgba(15, 23, 42, 0.62)"]}
            className="absolute inset-0"
          />
          <View className="flex-row items-center justify-between px-5 pt-3">
            <Text className="font-poppins-semibold text-xl text-white">
              Profile
            </Text>
            {user ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Open account settings"
                onPress={() => router.push("/settings")}
                className="h-10 w-10 items-center justify-center rounded-full bg-black/25">
                <Ionicons name="settings-outline" size={20} color="white" />
              </Pressable>
            ) : null}
          </View>
        </View>

        <View className="-mt-7 rounded-t-[28px] bg-background px-5 pb-6 pt-3">
          <View className="relative h-12 flex-row items-end">
            <Image
              source={profileImage}
              resizeMode="cover"
              accessibilityLabel="Profile photo"
              className="h-24 w-24 rounded-full border-4 border-white bg-coral-50"
              style={{ position: "absolute", left: 0, top: -56 }}
            />
            <View className="mb-1 ml-[108px] flex-1">
              {user && !authLoading ? (
                <>
                  <Text
                    numberOfLines={1}
                    className="font-poppins-bold text-lg text-textMain">
                    {displayName}
                  </Text>
                  <Text className="font-poppins-medium text-xs text-coral-600">
                    {roleLabel(user.role)}
                  </Text>
                </>
              ) : (
                <Text className="font-poppins-semibold text-lg text-textMain">
                  {authLoading ? "Loading profile…" : "Welcome, traveler"}
                </Text>
              )}
            </View>
          </View>

          {authLoading ? (
            <View className="mt-8 items-center py-10">
              <ActivityIndicator color={colors.primary} />
            </View>
          ) : user ? (
            <>
              <Text
                numberOfLines={1}
                className="mt-3 font-poppins text-sm text-textMuted">
                {user.email}
              </Text>
              {user.phone ? (
                <Text className="mt-0.5 font-poppins text-xs text-textMuted">
                  {user.phone}
                </Text>
              ) : null}

              {user.role === "traveler" ? (
                <View className="mt-5 flex-row gap-3">
                  <TravelStat
                    icon="briefcase-outline"
                    label="Bookings"
                    value={travelSummary?.bookings ?? null}
                    loading={summaryLoading}
                    onPress={() => router.push("/my-bookings")}
                  />
                  <TravelStat
                    icon="map-outline"
                    label="Itineraries"
                    value={travelSummary?.itineraries ?? null}
                    loading={summaryLoading}
                    onPress={() => router.push("/my-itineraries")}
                  />
                </View>
              ) : null}

              <ProfileSection title="Account">
                <ProfileRow
                  icon="settings-outline"
                  label="Account settings"
                  onPress={() => router.push("/settings")}
                  isLast
                />
              </ProfileSection>

              <ProfileSection title="Support and legal">
                <ProfileRow
                  icon="document-text-outline"
                  label="Terms and conditions"
                  onPress={() => router.push("/legal/terms")}
                />
                <ProfileRow
                  icon="shield-checkmark-outline"
                  label="Privacy policy"
                  onPress={() => router.push("/legal/privacy")}
                  isLast
                />
              </ProfileSection>

              <Pressable
                accessibilityRole="button"
                accessibilityState={{ disabled: signingOut }}
                disabled={signingOut}
                onPress={() => void handleSignOut()}
                className="mt-6 min-h-14 flex-row items-center justify-center rounded-2xl border border-coral-100 bg-white px-4 active:bg-coral-50">
                {signingOut ? (
                  <ActivityIndicator color={colors.primary} />
                ) : (
                  <>
                    <Ionicons name="log-out-outline" size={19} color={colors.accent} />
                    <Text className="ml-2 font-poppins-semibold text-sm text-coral-600">
                      Sign out
                    </Text>
                  </>
                )}
              </Pressable>
            </>
          ) : (
            <View className="mt-5 rounded-2xl border border-coral-100 bg-white p-5">
              <Text className="font-poppins-semibold text-lg text-textMain">
                Sign in to your account
              </Text>
              <Text className="mt-1 font-poppins text-sm leading-5 text-textMuted">
                Access your bookings and keep your travel plans together.
              </Text>
              <Pressable
                accessibilityRole="button"
                onPress={() => router.push("/login")}
                className="mt-5 items-center rounded-xl bg-coral-400 px-4 py-3 active:opacity-80">
                <Text className="font-poppins-semibold text-white">Log in</Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                onPress={() => router.push("/signup-role")}
                className="mt-2 items-center rounded-xl border border-slate-200 px-4 py-3 active:bg-slate-50">
                <Text className="font-poppins-semibold text-textMain">
                  Create account
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
