import { PAYMENT_METHODS } from '@/data/mockData';
import { colors } from '@/styles/global';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';

export default function PaymentCard() {
  const [selected, setSelected] = useState('ewallet');

  return (
    <View className="m-4 gap-3 rounded-lg border border-slate-200 p-4">
      <Text className="font-poppins-semibold text-lg text-textMain">
        Select Payment Method
      </Text>

      {PAYMENT_METHODS.map((method) => {
        const isSelected = selected === method.id;
        return (
          <Pressable
            key={method.id}
            onPress={() => setSelected(method.id)}
            accessibilityRole="radio"
            accessibilityState={{ checked: isSelected }}
            className={`flex-row items-center rounded-lg border p-3 ${
              isSelected
                ? 'border-primary bg-slate-50'
                : 'border-slate-200 bg-white'
            }`}
          >
            {method.iconType === 'ionicon' ? (
              <method.icon
                name={method.iconName}
                size={24}
                color={colors.primary}
              />
            ) : method.iconType === 'svg' ? (
              <method.icon width={32} height={24} />
            ) : (
              <Image
                source={method.image}
                resizeMode="contain"
                style={{ width: 32, height: 24 }}
              />
            )}

            <Text className="ml-3 flex-1 font-poppins-medium text-base text-textMain">
              {method.name}
            </Text>

            <Ionicons
              name={
                isSelected
                  ? 'radio-button-on'
                  : 'radio-button-off'
              }
              size={24}
              color={isSelected ? colors.primary : '#9CA3AF'}
            />
          </Pressable>
        );
      })}
    </View>
  );
}
