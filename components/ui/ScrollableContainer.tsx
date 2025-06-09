import clsx from 'clsx';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef, useState } from 'react';

import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  ScrollViewProps,
  View,
} from 'react-native';

interface ScrollableContainerProps extends ScrollViewProps {
  children: React.ReactNode;
  maxHeight?: number;
  className?: string;
  blurIntensity?: number;
  shadowColor?: string;
}

export default function ScrollableContainer({
  children,
  maxHeight = 250,
  className = '',
  blurIntensity = 100,
  shadowColor = 'rgba(0, 0, 0, 0.1)',
  ...scrollViewProps
}: ScrollableContainerProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  // Animated values for smooth blur transitions
  const topBlurOpacity = useRef(new Animated.Value(0)).current;
  const bottomBlurOpacity = useRef(new Animated.Value(0)).current;

  const isScrollable = contentHeight > containerHeight;
  const canScrollUp = scrollPosition > 5; // Small threshold for better UX
  const canScrollDown = scrollPosition < contentHeight - containerHeight - 5;

  // Calculate blur intensity based on scroll position
  const getTopBlurIntensity = () => {
    const fadeDistance = 50;
    const intensity = Math.min(scrollPosition / fadeDistance, 1);
    return Math.max(blurIntensity * intensity, 0);
  };

  const getBottomBlurIntensity = () => {
    const remainingScroll = contentHeight - containerHeight - scrollPosition;
    const fadeDistance = 50;
    const intensity = Math.min((fadeDistance - remainingScroll) / fadeDistance + 1, 1);
    return Math.max(blurIntensity * intensity, 0);
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset } = event.nativeEvent;
    setScrollPosition(contentOffset.y);

    // Animate blur overlays
    Animated.timing(topBlurOpacity, {
      toValue: canScrollUp ? 1 : 0,
      duration: 150,
      useNativeDriver: true,
    }).start();

    Animated.timing(bottomBlurOpacity, {
      toValue: canScrollDown ? 1 : 0,
      duration: 150,
      useNativeDriver: true,
    }).start();

    scrollViewProps.onScroll?.(event);
  };

  const handleContentSizeChange = (contentWidth: number, contentHeight: number) => {
    setContentHeight(contentHeight);
    scrollViewProps.onContentSizeChange?.(contentWidth, contentHeight);
  };

  const handleLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    setContainerHeight(height);
    scrollViewProps.onLayout?.(event);
  };

  return (
    <View className={clsx('relative overflow-hidden', className)}>
      {/* Main ScrollView with enhanced styling */}
      <View
        style={{
          maxHeight,
          borderRadius: 12,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
        }}
        className="shadow-lg border border-white/20"
      >
        <ScrollView
          ref={scrollViewRef}
          snapToAlignment="start"
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          onContentSizeChange={handleContentSizeChange}
          onLayout={handleLayout}
          scrollEventThrottle={16}
          bounces={true}
          decelerationRate="normal"
          {...scrollViewProps}
        >
          <View className="px-1">{children}</View>
        </ScrollView>
      </View>

      {/* Enhanced Top Blur Overlay */}
      {isScrollable && (
        <Animated.View
          className="absolute top-0 left-0 right-0 z-20 pointer-events-none"
          style={{
            height: 24,
            opacity: topBlurOpacity,
          }}
        >
          {/* Primary blur layer */}
          <BlurView
            intensity={getTopBlurIntensity()}
            tint="systemMaterialLight"
            className="absolute inset-0 rounded-t-xl"
          />

          {/* Gradient overlay for seamless blend */}
          <LinearGradient
            colors={[
              'rgba(255, 255, 255, 0.9)',
              'rgba(255, 255, 255, 0.7)',
              'rgba(255, 255, 255, 0.3)',
              'transparent',
            ]}
            className="absolute inset-0 rounded-t-xl"
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />

          {/* Subtle shadow for depth */}
          {/* <View
            className="absolute bottom-0 left-0 right-0 h-2"
            style={{
              backgroundColor: `linear-gradient(to bottom, ${shadowColor}, transparent)`,
              shadowColor: shadowColor,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 4,
            }}
          /> */}
        </Animated.View>
      )}

      {/* Enhanced Bottom Blur Overlay */}
      {isScrollable && (
        <Animated.View
          className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none"
          style={{
            height: 24,
            opacity: bottomBlurOpacity,
          }}
        >
          {/* Subtle shadow for depth */}
          <View
            className="absolute top-0 left-0 right-0 h-2"
            style={{
              backgroundColor: `linear-gradient(to top, ${shadowColor}, transparent)`,
              shadowColor: shadowColor,
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.15,
              shadowRadius: 4,
            }}
          />

          {/* Primary blur layer */}
          <BlurView
            intensity={getBottomBlurIntensity()}
            tint="systemMaterialLight"
            className="absolute inset-0 rounded-b-xl"
          />

          {/* Gradient overlay for seamless blend */}
          <LinearGradient
            colors={[
              'transparent',
              'rgba(255, 255, 255, 0.3)',
              'rgba(255, 255, 255, 0.7)',
              'rgba(255, 255, 255, 0.9)',
            ]}
            className="absolute inset-0 rounded-b-xl"
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />
        </Animated.View>
      )}

      {/* Optional: Scroll indicators with beautiful styling */}
      {isScrollable && (
        <>
          {/* Top scroll indicator */}
          {canScrollUp && (
            <Animated.View
              className="absolute top-1 right-2 z-30 pointer-events-none"
              style={{ opacity: topBlurOpacity }}
            >
              <View className="w-6 h-6 rounded-full bg-white/80 items-center justify-center shadow-sm">
                <View className="w-3 h-3 border-t-2 border-l-2 border-gray-600 transform rotate-45 -mt-1" />
              </View>
            </Animated.View>
          )}

          {/* Bottom scroll indicator */}
          {canScrollDown && (
            <Animated.View
              className="absolute bottom-1 right-2 z-30 pointer-events-none"
              style={{ opacity: bottomBlurOpacity }}
            >
              <View className="w-6 h-6 rounded-full bg-white/80 items-center justify-center shadow-sm">
                <View className="w-3 h-3 border-b-2 border-r-2 border-gray-600 transform rotate-45 -mt-1" />
              </View>
            </Animated.View>
          )}
        </>
      )}

      {/* Enhanced content area glow effect */}
      <View
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 8,
        }}
      />
    </View>
  );
}
