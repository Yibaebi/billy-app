import React, { useState } from 'react';
import { View } from 'react-native';

import SafeAreaViewComponent from '@/components/SafeAreaView';
import ByAnimatedProgressBar from '@/components/ui/AnimatedProgressBar';
import ByStack from '@/components/ui/Stack';

import ByButton from '@/components/ui/Button';
import ByCheckbox from '@/components/ui/Checkbox';
import ByText from '@/components/ui/Text';

// Tracking Default Options
const DEFAULT_OPTIONS = [
  { id: '1', label: 'Daily expenses', isDefault: false, checked: false },
  { id: '2', label: 'Recurring bills', isDefault: false, checked: false },
  { id: '3', label: 'Savings goals', isDefault: false, checked: false },
];

export default function OnboardingTrackInterest() {
  const [interests, setInterests] = useState(DEFAULT_OPTIONS);

  // Toggle source
  const handleToggleInterest = (id: string) =>
    setInterests(currInterest =>
      currInterest.map(interest =>
        interest.id === id ? { ...interest, checked: !interest.checked } : interest
      )
    );

  return (
    <SafeAreaViewComponent>
      <ByStack
        direction="column"
        alignItems="center"
        justifyContent="center"
        className="h-full w-full px-12 pb-12 relative"
      >
        <ByAnimatedProgressBar step={1} numberOfSteps={4} />

        <ByStack
          direction="column"
          alignItems="center"
          justifyContent="center"
          className="w-full gap-4"
        >
          {/* Title and description */}
          <ByStack
            direction="column"
            alignItems="center"
            justifyContent="center"
            className="gap-1 mb-4"
          >
            <ByText textAlign="center" fontWeight="bold" className="text-2xl">
              What would you like to track with Billy?
            </ByText>

            <ByText className="text-center max-w-[300px]">
              Choose what you&apos;d like to keep an eye on.
            </ByText>
          </ByStack>

          {/* Sources list */}
          <View className="flex-col mb-4">
            <ByStack
              direction="column"
              alignItems="center"
              justifyContent="center"
              className="w-full gap-4"
            >
              {interests.map(option => (
                <View key={option.id} className="flex relative w-full">
                  <ByCheckbox
                    label={option.label}
                    checked={option.checked}
                    shape="circle"
                    onToggle={() => handleToggleInterest(option.id)}
                  />
                </View>
              ))}
            </ByStack>
          </View>
        </ByStack>

        {/* Next button */}
        <ByStack className="absolute bottom-0 w-full gap-4">
          <ByButton variant="primary-light" title="Back" onPress={() => {}} className="w-1/2" />
          <ByButton variant="primary" title="Next" onPress={() => {}} className="w-1/2" />
        </ByStack>
      </ByStack>
    </SafeAreaViewComponent>
  );
}
