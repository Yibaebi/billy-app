import * as Haptics from 'expo-haptics';

import clsx from 'clsx';
import React, { useState } from 'react';
import { LayoutAnimation, LayoutChangeEvent, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';

import ByStack from '@/components/ui/Stack';
import ByText from '@/components/ui/Text';

interface PercentageSliderProps {
  value: number;
  maxValue?: number;
  onChange: (value: number) => void;
  onChangeComplete?: (value: number) => void;
  disabled?: boolean;
  className?: string;
}

export default function PercentageSlider({
  value,
  maxValue = 100,
  onChange,
  onChangeComplete,
  disabled = false,
  className,
}: PercentageSliderProps) {
  const [sliderWidth, setSliderWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Handle pan gesture
  const panGesture = Gesture.Pan()
    .enabled(!disabled)
    .onStart(() => setIsDragging(true))
    .onUpdate(e => {
      if (disabled) return;

      console.log('e', e);

      const { x } = e;
      const newValue = Math.round((x / sliderWidth) * maxValue);
      const clampedValue = Math.max(0, Math.min(newValue, maxValue));

      if (clampedValue !== value) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        onChange(clampedValue);

        // Provide haptic feedback at 25%, 50%, 75%, and 100%
        const milestones = [25, 50, 75, 100];

        if (milestones.includes(clampedValue)) {
          Haptics.selectionAsync();
        }
      }
    })
    .onEnd(() => {
      setIsDragging(false);
      onChangeComplete?.(value);
    });

  // Update slider width when layout changes
  const onSliderLayout = (event: LayoutChangeEvent) =>
    setSliderWidth(event.nativeEvent.layout.width);

  // Calculate percentage and thumb position
  const percentage = (value / maxValue) * 100;
  const PERCENT_INDICATOR_WIDTH = 100;
  const thumbLeftPosition = ((sliderWidth - PERCENT_INDICATOR_WIDTH) * percentage) / 100;

  return (
    <GestureHandlerRootView className={clsx('w-full', className)}>
      <GestureDetector gesture={panGesture}>
        <ByStack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          className="w-full"
          onLayout={onSliderLayout}
        >
          <ByText textAlign="center" fontWeight="bold" className="text-secondary-700">
            {0}%
          </ByText>

          <View
            className={clsx(
              'relative w-full h-0.5 rounded bg-neutral-200',
              disabled && 'opacity-50'
            )}
            style={{ maxWidth: sliderWidth - PERCENT_INDICATOR_WIDTH }}
          >
            <View
              className={clsx(
                'absolute left-0 h-full',
                isDragging ? 'bg-primary-500' : 'bg-primary-600'
              )}
              style={{ width: `${percentage}%`, transform: [{ translateX: -12 }] }}
            />

            <View
              className={clsx(
                'absolute w-7 h-7 border rounded-full bg-secondary-100 top-[50%]',
                isDragging ? 'scale-110 border-primary-500' : 'border-secondary-400',
                disabled && 'border-secondary-400 bg-secondary-200'
              )}
              style={{
                left: thumbLeftPosition,
                transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
              }}
            />
          </View>

          <ByText textAlign="center" fontWeight="bold" className="text-secondary-700">
            {Math.round(percentage)}%
          </ByText>
        </ByStack>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}
