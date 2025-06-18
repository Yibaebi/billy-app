import { BlurView } from 'expo-blur';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  Platform,
  TouchableOpacity,
  useAnimatedValue,
  View,
} from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// ===========================================
// 1. FADE OVERLAY
// ===========================================
interface FadeOverlayProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const FadeOverlay: React.FC<FadeOverlayProps> = ({ visible, onClose, children }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, fadeAnim]);

  if (!visible) return null;

  return (
    <Modal transparent visible={visible} animationType="none">
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          opacity: fadeAnim,
        }}
      >
        <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={onClose}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity activeOpacity={1} onPress={() => {}}>
              {children}
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </Modal>
  );
};

// ===========================================
// 2. SLIDE UP OVERLAY (Bottom Sheet Style)
// ===========================================

interface SlideUpOverlayProps {
  visible: boolean;
  onClose: () => void;
  height?: number;
  children: React.ReactNode;
}

export const SlideUpOverlay: React.FC<SlideUpOverlayProps> = ({
  visible,
  onClose,
  height = SCREEN_HEIGHT * 0.6,
  children,
}) => {
  const slideAnim = useRef(new Animated.Value(height)).current;
  const backdropAnim = useRef(new Animated.Value(0)).current;

  const [isModalVisible, setIsModalVisible] = useState(visible);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (visible && !isModalVisible) {
      // Opening: Show modal immediately, then animate in
      setIsModalVisible(true);
      setIsClosing(false);

      const slideIn = Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      });

      const backdropIn = Animated.timing(backdropAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      });

      Animated.parallel([slideIn, backdropIn]).start();
    } else if (!visible && isModalVisible && !isClosing) {
      // Closing: Start exit animation, then hide modal
      setIsClosing(true);

      const slideOut = Animated.timing(slideAnim, {
        toValue: height,
        duration: 250,
        useNativeDriver: true,
      });

      const backdropOut = Animated.timing(backdropAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      });

      Animated.parallel([slideOut, backdropOut]).start(() => {
        setIsModalVisible(false);
        setIsClosing(false);

        // Call onClose after animation completes
        onClose();
      });
    }
  }, [visible, isModalVisible, isClosing, slideAnim, backdropAnim, height, onClose]);

  const handleCloseRequest = () => {
    if (isClosing) return; // Prevent multiple close requests

    // Trigger exit animation by setting internal state
    setIsClosing(true);

    const slideOut = Animated.timing(slideAnim, {
      toValue: height,
      duration: 250,
      useNativeDriver: true,
    });

    const backdropOut = Animated.timing(backdropAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    });

    Animated.parallel([slideOut, backdropOut]).start(() => {
      setIsModalVisible(false);
      setIsClosing(false);

      // Notify parent after animation completes
      onClose();
    });
  };

  if (!isModalVisible) return null;

  return (
    <Modal
      transparent
      visible={isModalVisible}
      animationType="none"
      onRequestClose={handleCloseRequest}
    >
      <View className="flex-1">
        {/* Backdrop */}
        <Animated.View className="absolute inset-0 bg-black/30" style={{ opacity: backdropAnim }}>
          <TouchableOpacity className="flex-1" onPress={handleCloseRequest} />
        </Animated.View>

        {/* Slide Up Content */}
        <Animated.View
          className="absolute right-0 left-0 bottom-10 px-3 rounded-lg"
          style={{
            height,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            transform: [{ translateY: slideAnim }],
          }}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

// ===========================================
// 3. SCALE OVERLAY (Popup Style)
// ===========================================
interface ScaleOverlayProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const ScaleOverlay: React.FC<ScaleOverlayProps> = ({ visible, onClose, children }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      const scaleIn = Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      });

      const opacityIn = Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      });

      Animated.parallel([scaleIn, opacityIn]).start();
    } else {
      const scaleOut = Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      });

      const opacityOut = Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      });

      Animated.parallel([scaleOut, opacityOut]).start();
    }
  }, [visible, scaleAnim, opacityAnim]);

  if (!visible) return null;

  return (
    <Modal transparent visible={visible} animationType="none">
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: opacityAnim,
        }}
      >
        <TouchableOpacity
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          onPress={onClose}
        />

        <Animated.View
          style={{
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 20,
            margin: 20,
            maxWidth: SCREEN_WIDTH * 0.9,
            transform: [{ scale: scaleAnim }],
          }}
        >
          {children}
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

// ===========================================
// 4. BLUR OVERLAY (iOS Style)
// ===========================================
interface BlurOverlayProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  blurType?: 'light' | 'dark' | 'regular';
  height?: number;
}

export const BlurOverlay: React.FC<BlurOverlayProps> = ({ visible, onClose, children }) => {
  const scaleAnim = useAnimatedValue(0);
  const opacityAnim = useAnimatedValue(0);
  const [isModalVisible, setIsModalVisible] = useState(visible);

  // Open Animation
  // In your BlurOverlay component
  const animateIn = useCallback(() => {
    setIsModalVisible(true);

    // Reset animation values first
    scaleAnim.setValue(0);
    opacityAnim.setValue(0);

    const scaleIn = Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    });

    const opacityIn = Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    });

    Animated.parallel([scaleIn, opacityIn]).start();
  }, [scaleAnim, opacityAnim]);

  // Close Animation
  const animateOut = useCallback(() => {
    const scaleOut = Animated.timing(scaleAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    });

    const opacityOut = Animated.timing(opacityAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    });

    Animated.parallel([scaleOut, opacityOut]).start(() => {
      setIsModalVisible(false);
      onClose();
    });
  }, [scaleAnim, opacityAnim, onClose]);

  // Close Action
  const handleClose = useCallback(() => {
    animateOut();
  }, [animateOut]);

  // Effect to handle modal visibility and animation
  useEffect(() => {
    if (visible) {
      animateIn();
    } else if (!visible) {
      handleClose();
    }
  }, [visible]);

  console.log({
    platform: Platform.OS,
    isModalVisible,
    visible,
    scaleAnim,
    opacityAnim,
    width: SCREEN_WIDTH * 0.9,
  });

  if (!isModalVisible) return null;

  return (
    <Modal
      transparent
      visible={isModalVisible}
      animationType="fade"
      hardwareAccelerated
      statusBarTranslucent
    >
      <Animated.View className="w-screen h-screen" style={{ opacity: opacityAnim }}>
        <BlurView
          className="flex justify-center items-center w-screen h-screen"
          intensity={100}
          tint="dark"
        >
          <TouchableOpacity
            className="flex absolute inset-0"
            activeOpacity={1}
            onPress={handleClose}
          />

          <Animated.View
            className="flex justify-center items-center px-3 w-screen"
            style={{ transform: [{ scale: scaleAnim }] }}
          >
            {children}
          </Animated.View>
        </BlurView>
      </Animated.View>
    </Modal>
  );
};

// ===========================================
// 5. SLIDE FROM SIDE OVERLAY
// ===========================================
interface SlideFromSideProps {
  visible: boolean;
  onClose: () => void;
  side?: 'left' | 'right';
  width?: number;
  children: React.ReactNode;
}

export const SlideFromSide: React.FC<SlideFromSideProps> = ({
  visible,
  onClose,
  side = 'right',
  width = SCREEN_WIDTH * 0.8,
  children,
}) => {
  const slideAnim = useRef(new Animated.Value(side === 'left' ? -width : width)).current;
  const backdropAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      const slideIn = Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      });

      const backdropIn = Animated.timing(backdropAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      });

      Animated.parallel([slideIn, backdropIn]).start();
    } else {
      const hideValue = side === 'left' ? -width : width;

      const slideOut = Animated.timing(slideAnim, {
        toValue: hideValue,
        duration: 250,
        useNativeDriver: true,
      });

      const backdropOut = Animated.timing(backdropAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      });

      Animated.parallel([slideOut, backdropOut]).start();
    }
  }, [visible, slideAnim, backdropAnim, side, width]);

  if (!visible) return null;

  return (
    <Modal transparent visible={visible} animationType="none">
      <View style={{ flex: 1, flexDirection: 'row' }}>
        {/* Backdrop */}
        <Animated.View className="absolute inset-0" style={{ opacity: backdropAnim }}>
          <TouchableOpacity style={{ flex: 1 }} onPress={onClose} />
        </Animated.View>

        {/* Side Panel */}
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            [side]: 0,
            width,
            backgroundColor: 'white',
            transform: [{ translateX: slideAnim }],
          }}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};
