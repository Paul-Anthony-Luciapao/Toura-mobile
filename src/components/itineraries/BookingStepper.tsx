import { colors } from '@/styles/global';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

const STEPS = [ 
    { label: 'Availability', icon: 'calendar-outline' as const }, 
    { label: 'Verification', icon: 'person-outline' as const }, 
    { label: 'Payment', icon: 'card-outline' as const }, 
    { label: 'Confirmation', icon: 'checkmark-circle-outline' as const }, 
];

type BookingStepperProps = { currentStep: number; };

export default function BookingStepper(
    { currentStep, }: BookingStepperProps) { 
        return ( 
        <View className="px-4 py-5"> <View className="flex-row items-start"> {STEPS.map((step, index) => { const completed = index < currentStep; const active = index === currentStep; const highlighted = completed || active;

        return ( 
        <React.Fragment key={step.label}> <View className="flex-1 items-center"> 
        <View className="h-10 w-10 items-center justify-center rounded-full" style={{ backgroundColor: highlighted ? colors.primary : '#E5E7EB', }} > {completed ? ( <Ionicons name="checkmark" size={21} color={colors.white} /> ) : ( <Ionicons name={step.icon} size={20} color={active ? colors.white : '#6B7280'} /> )} </View>

        <Text className="mt-2 text-center text-[10px] font-poppins-medium" style={{ color: active ? colors.primary : '#6B7280', }} > {step.label} </Text> </View>

{       index < STEPS.length - 1 && ( <View className="mt-5 h-[2px] flex-1" style={{ backgroundColor: completed ? colors.primary : '#E5E7EB', }} /> )} </React.Fragment> ); })} </View>

<       Text className="mt-4 text-center text-xs text-gray-500"> Step {currentStep + 1} of {STEPS.length} </Text> </View> ); }