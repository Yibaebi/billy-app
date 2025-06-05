import React from 'react';

import SafeAreaViewComponent from '@/components/SafeAreaView';
import BillyLogo from '@/components/svgs/BillyLogo';
import ByButton from '@/components/ui/Button';
import ByStack from '@/components/ui/Stack';
import ByText from '@/components/ui/Text';

export default function OnboardingHome() {
  return (
    <SafeAreaViewComponent>
      <ByStack
        direction="column"
        justifyContent="flex-end"
        alignItems="center"
        className="bg-neutral-100 h-full w-full px-12 pb-12 relative"
      >
        <BillyLogo />

        <ByStack
          direction="column"
          justifyContent="center"
          alignItems="center"
          className="my-12 gap-3"
        >
          <ByText
            textAlign="center"
            fontWeight="bold"
            className="text-secondary-800 text-[40px] leading-[40px] max-w-[320px]"
          >
            Feel better about your money.
          </ByText>

          <ByText
            textAlign="center"
            className="text-secondary-800 text-[18px] leading-[24px] max-w-[320px]"
          >
            A simple app to help you track, save, and spend with more confidence.
          </ByText>
        </ByStack>

        <ByStack direction="column" alignItems="center" className="w-full gap-12">
          <ByButton title="Get Started" className="w-full" />

          <ByText
            textAlign="center"
            className="text-neutral-700 text-[14px] leading-[1.5rem] max-w-[230px]"
          >
            By using Billy you agree to the{' '}
            <ByText fontWeight="bold" fontColor="inherit">
              Terms of Service
            </ByText>{' '}
            and{' '}
            <ByText fontWeight="bold" fontColor="inherit">
              Privacy Policy
            </ByText>
          </ByText>
        </ByStack>
      </ByStack>
    </SafeAreaViewComponent>
  );
}
