import CategoryIcons from "@/components/home/CategoryIcons";
import HeroBanner from "@/components/home/HeroBanner";
import SectionHeader from "@/components/home/SectionHeader";
import TourPackageCard from "@/components/home/TourPackageCard";
import TouristSpotCard from "@/components/home/TouristSpotCard";
import { INITIAL_TOURIST_SPOTS } from "@/data/mockData";
import { ScrollView, StatusBar, View } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  const [spots, setSpots] = useState<TouristSpot[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadSpots = useCallback(async () => {
    setError(null);
    try {
      setSpots(await fetchTouristSpots());
    } catch (e) {
      setError(getErrorMessage(e));
    }
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await loadSpots();
      setLoading(false);
    })();
  }, [loadSpots]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadSpots();
    setRefreshing(false);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <View className="mt-10 items-center">
          <ActivityIndicator color="#0f766e" />
        </View>
      );
    }
    if (error) {
      return (
        <View className="mt-10 items-center px-6">
          <Text className="text-center text-[13px] text-red-600">{error}</Text>
        </View>
      );
    }
    if (spots.length === 0) {
      return (
        <View className="mt-10 items-center px-6">
          <Text className="text-center text-[13px] text-slate-500">
            No destinations available yet. Pull down to refresh.
          </Text>
        </View>
      );
    }
    return (
      <>
        {/* Itinerary Packages */}
        <View className="mt-5">
          <SectionHeader
            title="Itinerary Packages"
            action="View all"
            onActionPress={() => router.push("/itinerary-packages")}
          />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="pb-1">
            {spots.map((spot) => (
              <View key={spot.id} className="mr-3.5 w-[280px]">
                <TouristSpotCard spot={spot} className="w-full" />
              </View>
            ))}
          </ScrollView>
        </View>

        <View className="mt-7">
          <SectionHeader title="Tour Packages" action="View all" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="pb-1">
            {INITIAL_TOURIST_SPOTS.map((spot) => (
              <View key={spot.id} className="mr-[14px]">
                <TourPackageCard
                  item={{ id: spot.id, title: spot.name, image: spot.image }}
                />
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
}

