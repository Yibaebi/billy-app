import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';
import { Animated, Easing, View } from 'react-native';

import ByCheckCircle from '@/components/svgs/CheckCircle';
import ByStack from '@/components/ui/Stack';
import ByText from '@/components/ui/Text';
import Colors from '@/constants/Colors';

interface ByAnimatedProgressBarProps {
  step: number;
  numberOfSteps: number;
  className?: string;
}

export default function ByAnimatedProgressBar({
  step,
  numberOfSteps,
  className,
}: ByAnimatedProgressBarProps) {
  // Calculate the previous step to ensure the progress bar starts at 0 when the step is 0
  const prevStep = Math.min(0, step - 1);
  const { current: progress } = useRef(new Animated.Value(prevStep));

  // Interpolate the progress bar width
  const width = progress.interpolate({
    inputRange: [0, numberOfSteps],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  const percentage = Math.round((step / numberOfSteps) * 100);

  // Update the progress bar when the step changes
  useEffect(() => {
    const timingConfig: Animated.TimingAnimationConfig = {
      easing: Easing.ease,
      duration: 600,
      toValue: step,
      useNativeDriver: false,
    };

    Animated.timing(progress, timingConfig).start();
  }, [progress, step]);

  return (
    <ByStack
      direction="column"
      alignItems="center"
      justifyContent="center"
      className={clsx('absolute top-0 gap-2 w-full px-12', className)}
    >
      <ByStack direction="row" alignItems="center" justifyContent="center" className="w-full gap-2">
        <ByCheckCircle fill={Colors.primary[500]} />

        <View className="flex w-full h-[12px] bg-primary-100 rounded-full">
          <Animated.View className="h-full rounded-full bg-primary-500" style={{ width }} />
        </View>
      </ByStack>

      <ByText>{percentage}% done</ByText>
    </ByStack>
  );
}
