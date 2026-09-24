import { useLocalSearchParams } from "expo-router";
import { Image, ScrollView, Text, View } from "react-native";
import PrimaryButton from "../../components/common/PrimaryButton";
import { INITIAL_RESORTS } from "../../data/mockData";
import { formatCurrency } from "../../lib/formatters";

export default function ResortDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const resort = INITIAL_RESORTS.find((item) => item.id === id);

  if (!resort) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-[18px] font-bold text-slate-900">
          Resort not found.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-white px-0 pt-0"
      contentContainerClassName="pb-8">
      <Image
        source={{ uri: resort.coverImage }}
        className="h-[260px] w-full bg-slate-200"
      />

      <View className="px-[18px] pt-[22px]">
        <Text className="text-[12px] font-bold uppercase tracking-normal text-[#0f766e]">
          {resort.municipality}
        </Text>
        <Text className="mt-1.5 text-[28px] font-extrabold text-slate-900">
          {resort.name}
        </Text>
        <Text className="mt-2 text-[15px] leading-[22px] text-slate-700">
          {resort.tagline}
        </Text>

        <View className="mt-3 flex-row items-center">
          <Text className="text-[15px] font-extrabold text-[#f59e0b]">
            ★ {resort.rating}
          </Text>
          <Text className="ml-2 text-[13px] text-slate-500">
            ({resort.reviewCount} reviews)
          </Text>
        </View>

        <Text className="mt-3.5 text-[15px] leading-6 text-slate-700">
          {resort.description}
        </Text>
      </View>

      <View className="px-[18px] pt-[22px]">
        <Text className="mb-3 text-[20px] font-extrabold text-slate-900">
          Amenities
        </Text>
        <View className="flex-row flex-wrap">
          {resort.amenities.map((item) => (
            <Text
              key={item}
              className="mb-2 mr-2 rounded-full bg-[#eaf5f2] px-3 py-2 text-[12px] font-semibold text-[#115e59]">
              {item}
            </Text>
          ))}
        </View>
      </View>

      <View className="px-[18px] pt-[22px]">
        <Text className="mb-3 text-[20px] font-extrabold text-slate-900">
          Available stays
        </Text>
        {resort.accommodations.map((room) => (
          <View
            key={room.id}
            className="mb-4 overflow-hidden rounded-[16px] bg-white shadow-sm shadow-black/5">
            <Image
              source={{ uri: room.image }}
              className="h-[170px] w-full bg-slate-200"
            />
            <View className="p-[14px]">
              <Text className="text-[18px] font-extrabold text-slate-900">
                {room.title}
              </Text>
              <Text className="mt-2 text-[13px] leading-5 text-slate-700">
                {room.description}
              </Text>
              <Text className="mt-2 text-[12px] text-slate-500">
                {room.capacity} guests • {room.bedType} • {room.size}
              </Text>
              <View className="mt-3 flex-row items-baseline">
                <Text className="text-[22px] font-extrabold text-slate-900">
                  {formatCurrency(room.pricePerNight)}
                </Text>
                <Text className="text-[12px] text-slate-500">/ night</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <View className="px-[18px] pt-[22px]">
        <Text className="mb-3 text-[20px] font-extrabold text-slate-900">
          Special offers
        </Text>
        {resort.offers.map((offer) => (
          <View
            key={offer.id}
            className="mb-3.5 rounded-[16px] border border-[#fed7aa] bg-[#fff7ed] p-[14px]">
            <Text className="text-[11px] font-extrabold uppercase text-[#c2410c]">
              {offer.tag}
            </Text>
            <Text className="mt-2 text-[18px] font-extrabold text-slate-900">
              {offer.title}
            </Text>
            <Text className="mt-2 text-[13px] leading-5 text-slate-700">
              {offer.description}
            </Text>
            <Text className="mt-2.5 text-[14px] font-extrabold text-[#b45309]">
              {offer.discountRate}
            </Text>
          </View>
        ))}
      </View>

      <View className="mx-[18px] mt-[18px] rounded-[18px] bg-white p-4 shadow-sm shadow-black/5">
        <Text className="mb-3 text-[18px] font-extrabold text-slate-900">
          From {formatCurrency(resort.basePrice)} / night
        </Text>
        <PrimaryButton label="Book this stay" />
      </View>
    </ScrollView>
  );
}
