import React, { useEffect, useRef } from 'react';
import { Animated, Easing, View } from 'react-native';

import Colors from '@/constants/Colors';
import ByCheckCircle from '../svgs/CheckCircle';
import ByStack from './Stack';
import ByText from './Text';

interface ByAnimatedProgressBarProps {
  step: number;
  numberOfSteps: number;
}

export default function ByAnimatedProgressBar({ step, numberOfSteps }: ByAnimatedProgressBarProps) {
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
      className="w-full gap-2 absolute top-0"
    >
      <ByStack direction="row" alignItems="center" justifyContent="center" className="w-full gap-2">
        <ByCheckCircle fill={Colors.primary[500]} />

        <View className="flex w-full h-[12px] bg-primary-100 rounded-full">
          <Animated.View className="h-full bg-primary-500 rounded-full" style={{ width }} />
        </View>
      </ByStack>

      <ByText>{percentage}% done</ByText>
    </ByStack>
  );
}
