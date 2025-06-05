import React, { useEffect } from 'react';
import Svg, { Path } from 'react-native-svg';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

// Props for the CheckmarkIcon component
interface CheckmarkIconProps {
  size?: number;
  color?: string;
  className?: string;
  animate?: boolean;
}

// CheckmarkIcon component
export default function CheckmarkIcon({
  size = 16,
  color = 'white',
  className = '',
  animate = true,
}: CheckmarkIconProps) {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  // Animate the checkmark icon
  useEffect(() => {
    if (animate) {
      // Reset values
      scale.value = 0;
      opacity.value = 0;

      // Simple scale and opacity animation that works well on Android
      opacity.value = withDelay(10, withTiming(1, { duration: 150 }));
      scale.value = withDelay(
        10,
        withSequence(withTiming(1.3, { duration: 200 }), withTiming(1, { duration: 100 }))
      );
    } else {
      scale.value = 1;
      opacity.value = 1;
    }
  }, [animate, scale, opacity]);

  // Animated style for the checkmark icon
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <Path
          d="M20 6L9 17l-5-5"
          stroke={color}
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </Svg>
    </Animated.View>
  );
}
