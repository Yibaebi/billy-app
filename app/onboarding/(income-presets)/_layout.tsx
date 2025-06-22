import { router, Slot, usePathname } from 'expo-router';
import React, { useMemo } from 'react';
import { ScrollView } from 'react-native';

import ByAnimatedProgressBar from '@/components/ui/AnimatedProgressBar';
import ByButton from '@/components/ui/Button';
import ByStack from '@/components/ui/Stack';
import clsx from 'clsx';

// Onboarding steps
const ONBOARDING_STEPS = {
  'income-preset': 1,
  'track-interest': 2,
  'income-add': 3,
  'add-expenses': 4,
};

export default function OnboardingPresetsLayout() {
  const pathname = usePathname();

  // Number of steps in the onboarding process
  const getPresetsProgress = (): number => {
    const currentStep = Object.keys(ONBOARDING_STEPS).find(step =>
      pathname.includes(step)
    ) as keyof typeof ONBOARDING_STEPS;

    return currentStep ? ONBOARDING_STEPS[currentStep] : 0;
  };

  // Check if current route is income preset route
  const isIncomePresetRoute = pathname.includes('income-preset');

  // Get button text based on the current step
  const routeNavCTAProps = useMemo(() => {
    if (isIncomePresetRoute) {
      return null;
    }

    if (pathname.includes('track-interest')) {
      return [
        { label: 'Back', route: 'income-preset' as const, type: 'primary-light' as const },
        { label: 'Next', route: 'income-add' as const, type: 'primary' as const },
      ];
    }

    if (pathname.includes('income-add')) {
      return [
        { label: 'Back', route: 'track-interest' as const, type: 'primary-light' as const },
        { label: 'Next', route: 'add-expenses' as const, type: 'primary' as const },
      ];
    }

    if (pathname.includes('add-expenses')) {
      return [
        { label: 'Back', route: 'income-add' as const, type: 'primary-light' as const },
        { label: 'Next', route: 'onboarding-complete' as const, type: 'primary' as const },
      ];
    }

    return [{ label: 'Next', route: 'track-interest' as const, type: 'primary' as const }];
  }, [pathname, isIncomePresetRoute]);

  return (
    <ByStack
      direction="column"
      alignItems="center"
      justifyContent="center"
      className="relative w-full h-full"
    >
      <ByAnimatedProgressBar
        step={getPresetsProgress()}
        numberOfSteps={4}
        className="!bg-secondary-100 z-10"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="h-full max-h-screen pt-12 pb-[120px]"
      >
        <Slot />
      </ScrollView>

      {routeNavCTAProps && (
        <ByStack
          direction={isIncomePresetRoute ? 'column' : 'row'}
          justifyContent="center"
          alignItems="center"
          gap={16}
          className={clsx('absolute bottom-0 px-12 pt-6 pb-12 w-full bg-secondary-100')}
        >
          {routeNavCTAProps.map(({ label, route, type }) => (
            <ByButton
              key={`${route}-${label}`}
              variant={type}
              title={label}
              onPress={() => router.push(`/onboarding/${route}`)}
              className={clsx(routeNavCTAProps.length === 2 ? 'w-1/2' : 'w-full')}
            />
          ))}
        </ByStack>
      )}
    </ByStack>
  );
}
