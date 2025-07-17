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

  // Calculate percentage and thumb position
  const percentage = (value / maxValue) * 100;
  const PERCENT_INDICATOR_WIDTH = 100;
  const sliderWidthMinusIndicator = sliderWidth - PERCENT_INDICATOR_WIDTH;
  const thumbLeftPosition = (percentage * sliderWidthMinusIndicator) / 100;

  // Handle pan gesture
  const panGesture = Gesture.Pan()
    .enabled(!disabled)
    .onStart(() => {
      setIsDragging(true);
    })
    .onUpdate(async e => {
      if (disabled) return;

      const { x } = e;
      const newValue = Math.round((x / sliderWidthMinusIndicator) * maxValue);
      const clampedValue = Math.max(0, Math.min(newValue, maxValue));

      if (clampedValue !== value) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        onChange(clampedValue);

        // Provide haptic feedback at 25%, 50%, 75%, and 100%
        const milestones = [25, 50, 75, 100];

        if (milestones.includes(clampedValue)) {
          await Haptics.selectionAsync();
        }
      }
    })
    .onEnd(() => {
      setIsDragging(false);
      onChangeComplete?.(value);
    })
    .runOnJS(true);

  // Update slider width when layout changes
  const onSliderLayout = (event: LayoutChangeEvent) =>
    setSliderWidth(event.nativeEvent.layout.width);

  return (
    <ByStack direction="row" alignItems="center" className="w-full h-[48px]">
      <GestureHandlerRootView className={clsx('w-full', className)}>
        <ByStack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          className="w-full"
          onLayout={onSliderLayout}
        >
          <ByText textAlign="center" fontWeight="bold" className="text-secondary-700">
            0%
          </ByText>

          <GestureDetector gesture={panGesture}>
            <View
              className={clsx(
                'relative w-full h-0.5 rounded bg-neutral-200',
                disabled && 'opacity-50'
              )}
              style={{
                maxWidth: sliderWidthMinusIndicator,
                minWidth: sliderWidthMinusIndicator,
              }}
            >
              {/* Fill */}
              <View
                className={clsx(
                  'absolute left-0 h-full',
                  isDragging ? 'bg-primary-500' : 'bg-primary-600'
                )}
                style={{ width: `${percentage}%` }}
              />

              {/* Thumb */}
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
          </GestureDetector>

          <ByText textAlign="center" fontWeight="bold" className="text-secondary-700">
            {Math.round(percentage)}%
          </ByText>
        </ByStack>
      </GestureHandlerRootView>
    </ByStack>
  );
}
