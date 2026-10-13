import { ID_TYPES } from "@/data/mockData";
import type { ID } from "@/data/types";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
    Alert,
    Image,
    Modal,
    Pressable,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function VerificationCard() {
  const [idType, setIdType] = useState<ID | null>(null);
  const [idImage, setIdImage] = useState<string | null>(null);
  const [showIDTypes, setShowIDTypes] = useState(false);

  // =============================
  // Take Photo
  // =============================
  const takePhoto = async () => {
    if (!idType) {
      Alert.alert(
        "Select ID Type",
        "Please select the type of ID you want to upload first.",
      );
      return;
    }

    const permission =
      await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Camera Permission Required",
        "Please allow camera access to take a photo of your ID.",
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setIdImage(result.assets[0].uri);
    }
  };

  // =============================
  // Choose From Gallery
  // =============================
  const chooseFromGallery = async () => {
    if (!idType) {
      Alert.alert(
        "Select ID Type",
        "Please select the type of ID you want to upload first.",
      );
      return;
    }

    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Gallery Permission Required",
        "Please allow access to your photos to select your ID.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setIdImage(result.assets[0].uri);
    }
  };

  // =============================
  // Select ID Type
  // =============================
  const selectIDType = (type: ID) => {
    setIdType(type);
    setIdImage(null);
    setShowIDTypes(false);
  };

  return (
    <View className="rounded-xl bg-white p-4">
      {/* ========================= */}
      {/* HEADER */}
      {/* ========================= */}
      <View className="items-center">
        <Text className="text-xl font-bold text-gray-900">
          Upload a Valid ID
        </Text>
      </View>

      {/* ========================= */}
      {/* DESCRIPTION */}
      {/* ========================= */}
      <View className="mt-3 items-center px-2">
        <Text className="text-center text-sm leading-5 text-gray-600">
          Select your ID type and provide a clear photo of your
          government-issued ID for verification.
        </Text>
      </View>

      {/* ========================= */}
      {/* ID TYPE */}
      {/* ========================= */}
      <View className="mt-6">
        <Text className="mb-2 font-semibold text-gray-800">
          ID Type
        </Text>

        {/* Selected ID */}
        <TouchableOpacity
          onPress={() => setShowIDTypes(true)}
          activeOpacity={0.7}
          className={`flex-row items-center justify-between rounded-xl border-2 p-4 ${
            idType
              ? "border-primary bg-primary/10"
              : "border-gray-300 bg-white"
          }`}
        >
          <View className="flex-1 flex-row items-center">
            <Ionicons
              name="card-outline"
              size={22}
              color={idType ? "#000000" : "#6B7280"}
            />

            <View className="ml-3">
              <Text className="text-xs text-gray-500">
                Selected ID
              </Text>

              <Text
                className={`mt-1 text-sm ${
                  idType
                    ? "font-semibold text-primary"
                    : "text-gray-400"
                }`}
              >
                {idType ? idType.name : "Select your ID type"}
              </Text>
            </View>
          </View>

          <Ionicons
            name="chevron-down"
            size={20}
            color={idType ? "#000000" : "#6B7280"}
          />
        </TouchableOpacity>
      </View>

      {/* ========================= */}
      {/* ID TYPE MODAL */}
      {/* ========================= */}
      <Modal
        visible={showIDTypes}
        transparent
        animationType="fade"
        onRequestClose={() => setShowIDTypes(false)}
      >
        <Pressable
          className="flex-1 justify-end bg-black/40"
          onPress={() => setShowIDTypes(false)}
        >
          <Pressable
            className="rounded-t-3xl bg-white p-5"
            onPress={(event) => event.stopPropagation()}
          >
            {/* Modal Header */}
            <View className="mb-5 flex-row items-center justify-between">
              <Text className="text-lg font-bold text-gray-900">
                Select ID Type
              </Text>

              <TouchableOpacity
                onPress={() => setShowIDTypes(false)}
                className="h-8 w-8 items-center justify-center rounded-full bg-gray-100"
              >
                <Ionicons
                  name="close"
                  size={18}
                  color="#374151"
                />
              </TouchableOpacity>
            </View>

            {/* ID Options */}
            <View className="gap-2">
              {ID_TYPES.map((type) => {
                const isSelected = idType?.id === type.id;

                return (
                  <TouchableOpacity
                    key={type.id}
                    onPress={() => selectIDType(type)}
                    activeOpacity={0.7}
                    className={`rounded-xl border p-4 ${
                      isSelected
                        ? "border-primary bg-primary/10"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <View className="flex-row items-center justify-between">
                      <Text
                        className={`text-sm ${
                          isSelected
                            ? "font-semibold text-primary"
                            : "text-gray-700"
                        }`}
                      >
                        {type.name}
                      </Text>

                      {isSelected && (
                        <Ionicons
                          name="checkmark-circle"
                          size={22}
                          color="#000000"
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View className="h-5" />
          </Pressable>
        </Pressable>
      </Modal>

      {/* ========================= */}
      {/* ID PREVIEW */}
      {/* ========================= */}
      {idImage && (
        <View className="mt-6">
          <Text className="mb-2 font-semibold text-gray-800">
            ID Photo
          </Text>

          <View className="overflow-hidden rounded-xl border border-primary bg-primary/5">
            <Image
              source={{ uri: idImage }}
              className="h-52 w-full"
              resizeMode="contain"
            />
          </View>
        </View>
      )}

      {/* ========================= */}
      {/* UPLOAD BUTTONS */}
      {/* ========================= */}
      <View className="mt-6">
        <Text className="mb-3 font-semibold text-gray-800">
          {idImage ? "Change ID Photo" : "Add ID Photo"}
        </Text>

        <View className="flex-row gap-3">
          {/* Take Photo */}
          <TouchableOpacity
            onPress={takePhoto}
            activeOpacity={0.7}
            className="flex-1 flex-row items-center justify-center rounded-xl border border-slate-200 bg-gray-100 py-4"
          >
            <Ionicons
              name="camera-outline"
              size={21}
              color="#2E7D32"
            />

            <Text className="ml-2 font-semibold text-primary">
              Take a Photo
            </Text>
          </TouchableOpacity>

          {/* Gallery */}
          <TouchableOpacity
            onPress={chooseFromGallery}
            activeOpacity={0.7}
            className="flex-1 flex-row items-center justify-center rounded-xl border border-slate-200 bg-gray-100 py-4"
          >
            <Ionicons
              name="images-outline"
              size={21}
              color="#2E7D32"
            />

            <Text className="ml-2 font-semibold text-primary">
              Gallery
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ========================= */}
      {/* IMPORTANT REMINDERS */}
      {/* ========================= */}
      <View className="mt-5 rounded-2xl border border-slate-200 p-4">
        {/* Reminder Header */}
        <View className="flex-row items-center">
          <Ionicons
            name="information-circle-outline"
            size={20}
            color="#6B7280"
          />

          <Text className="ml-3 text-sm font-semibold text-gray-700">
            Important Reminders
          </Text>
        </View>

        {/* Reminder Items */}
        <View className="mt-2">
          <Text className="text-xs leading-5 text-gray-600">
            {"\u2022"} Make sure the ID is clear, not blurry, and
            well-lit.
          </Text>

          <Text className="text-xs leading-5 text-gray-600">
            {"\u2022"} All information must be visible.
          </Text>

          <Text className="text-xs leading-5 text-gray-600">
            {"\u2022"} Accepted file format: JPG, PNG, or PDF
            (Max 3MB).
          </Text>
        </View>
      </View>
    </View>
  );
}
