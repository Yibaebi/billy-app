import { Link, router, Stack } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import NotFoundIllustration from '@/components/svgs/NotFoundIllustration';
import ByButton from '@/components/ui/Button';
import ByText from '@/components/ui/Text';

export default function NotFoundScreen() {
  const handleGoHome = () => router.push('/onboarding');

  return (
    <>
      <Stack.Screen options={{ title: 'Page Not Found', headerShown: false }} />

      <View className="flex-1 bg-[#FBFCFA] justify-center items-center px-6 py-8">
        <View className="items-center max-w-sm w-full">
          {/* SVG Illustration */}
          <View className="mb-8 items-center">
            <NotFoundIllustration width={220} height={220} />
          </View>

          {/* Main heading */}
          <ByText size="3xl" textAlign="center" fontWeight="bold" className="mb-4 leading-10">
            Oops! Page Not Found
          </ByText>

          {/* Subtitle */}
          <ByText textAlign="center" className="mb-10 px-4">
            The page you&apos;re looking for seems to have wandered off. Don&apos;t worry, it
            happens to the best of us!
          </ByText>

          {/* Action button */}
          <ByButton
            title="Take Me Home"
            variant="primary"
            fullWidth
            className="mb-4"
            onPress={handleGoHome}
          />

          {/* Secondary link */}
          <Link href="/onboarding" className="mt-2">
            <ByText className="text-[#7B8074] text-sm underline">
              Or go back to the beginning
            </ByText>
          </Link>
        </View>
      </View>
    </>
  );
}
