import { Slot } from 'expo-router';
import React from 'react';

import SafeAreaViewComponent from '@/components/SafeAreaView';

export default function OnboardingLayout() {
  return (
    <SafeAreaViewComponent>
      <Slot />
    </SafeAreaViewComponent>
  );
}
