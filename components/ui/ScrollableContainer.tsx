import clsx from 'clsx';
import { BlurView } from 'expo-blur';
import React, { useRef, useState } from 'react';

import {
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
  blurIntensity = 30,
  shadowColor = 'rgba(0, 0, 0, 0.1)',
  ...scrollViewProps
}: ScrollableContainerProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const isScrollable = contentHeight > containerHeight;
  const canScrollUp = scrollPosition > 0;
  const canScrollDown = scrollPosition < contentHeight - containerHeight;

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset } = event.nativeEvent;
    setScrollPosition(contentOffset.y);
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
    <View className={clsx('relative', className)}>
      <ScrollView
        ref={scrollViewRef}
        style={{ maxHeight }}
        snapToAlignment="start"
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        onContentSizeChange={handleContentSizeChange}
        onLayout={handleLayout}
        scrollEventThrottle={16}
        {...scrollViewProps}
      >
        {children}
      </ScrollView>

      {/* Top Blur Overlay */}
      {isScrollable && canScrollUp && (
        <View className="absolute -top-[12px] left-0 right-0 z-10 h-12">
          <BlurView intensity={blurIntensity} tint="default" className="flex-1 rounded-t-lg" />
          <View className="absolute bottom-0 left-0 right-0 h-6 rounded-b-lg bg-slate-700 opacity-5" />
        </View>
      )}

      {/* Bottom Blur Overlay */}
      {isScrollable && canScrollDown && (
        <View className="absolute -bottom-[12px] left-0 right-0 z-10 h-12">
          <View className="absolute top-0 left-0 right-0 h-2" />
          <BlurView intensity={blurIntensity} tint="default" className="flex-1 rounded-b-lg" />
        </View>
      )}
    </View>
  );
}
