import SafeAreaViewComponent from '@/components/SafeAreaView';
import { Stack } from 'expo-router';
import React from 'react';

export default function DashboardLayout() {
  return (
    <SafeAreaViewComponent>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaViewComponent>
  );
}
