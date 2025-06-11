import { router, Slot, usePathname } from 'expo-router';
import React, { useMemo } from 'react';
import { ScrollView } from 'react-native';

import ByAnimatedProgressBar from '@/components/ui/AnimatedProgressBar';
import ByButton from '@/components/ui/Button';
import ByStack from '@/components/ui/Stack';
import clsx from 'clsx';

export default function OnboardingPresetsLayout() {
  const pathname = usePathname();

  // Number of steps in the onboarding process
  const getPresetsProgress = (): number => {
    switch (pathname) {
      case '/onboarding/income-preset':
        return 1;
      case '/onboarding/track-interest':
        return 2;
      case '/onboarding/income-add':
        return 3;
      default:
        return 0;
    }
  };

  // Get button text based on the current step
  const routeNavCTAProps = useMemo(() => {
    if (pathname.includes('income-preset')) {
      return [{ label: 'Next', route: 'track-interest' as const, type: 'primary' as const }];
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
        { label: 'Next', route: 'track-interest' as const, type: 'primary' as const },
      ];
    }

    return [{ label: 'Next', route: 'track-interest' as const, type: 'primary' as const }];
  }, [pathname]);

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
        contentContainerClassName="h-full max-h-screen p-12 pb-[120px]"
      >
        <Slot />
      </ScrollView>

      <ByStack
        justifyContent="center"
        alignItems="center"
        className="absolute bottom-0 flex w-full gap-4 px-12 pt-6 pb-12 bg-secondary-100"
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
    </ByStack>
  );
}
