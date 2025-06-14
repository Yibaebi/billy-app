import { router } from 'expo-router';
import { ScrollView, TouchableOpacity } from 'react-native';

import ArrowLeft from '@/components/svgs/ArrowLeft';
import ByButton from '@/components/ui/Button';
import BySelectableTag from '@/components/ui/SelectableTag';
import ByStack from '@/components/ui/Stack';
import ByText from '@/components/ui/Text';

const SELECTED_EXPENSES_CATEGORIES = [
  {
    id: 'living',
    name: 'Living',
    icon: '🏠',
  },
  {
    id: 'food',
    name: 'Food',
    icon: '🍽️',
  },
  {
    id: 'transport',
    name: 'Transport',
    icon: '🚖',
  },
  {
    id: 'health',
    name: 'Health',
    icon: '🩺',
  },
  {
    id: 'work-bills',
    name: 'Work and Bills',
    icon: '💼',
  },
  {
    id: 'financial-giving',
    name: 'Financial & Giving',
    icon: '💳',
  },
];

export default function OnboardingComplete() {
  return (
    <ByStack direction="column" className="w-full h-full">
      <ByStack className="absolute top-0 z-10 w-full pb-4 bg-secondary-100 pl-7">
        <TouchableOpacity
          className="rounded-full p-2.5 pr-2 bg-secondary-300"
          onPress={() => router.push('/onboarding/onboarding-complete')}
        >
          <ArrowLeft />
        </TouchableOpacity>
      </ByStack>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="mt-[120px] px-7"
        className="w-full min-h-screen"
      >
        <ByStack direction="column" className="w-full mb-12">
          <ByText fontWeight="bold" size="3xl">
            🎉 You&apos;re All Set!
          </ByText>

          <ByText size="lg">Here’s a quick summary before we begin.</ByText>
        </ByStack>

        <ByStack direction="column" className="w-full h-[400px] mb-6 bg-[#460957] rounded-xl">
          <ByText>Expense Categories</ByText>
        </ByStack>

        <ByStack direction="column" className="w-full h-full mb-12">
          <ByText fontWeight="bold" size="lg" className="mb-3">
            Expense Categories
          </ByText>

          <ByStack direction="row" className="flex-wrap w-full h-full gap-2">
            {SELECTED_EXPENSES_CATEGORIES.map(expense => (
              <BySelectableTag
                key={expense.id}
                label={`${expense.icon} ${expense.name}`}
                clickable={false}
              />
            ))}
          </ByStack>
        </ByStack>
      </ScrollView>

      <ByStack
        direction="row"
        alignItems="center"
        className="absolute bottom-0 w-full pt-6 pb-12 px-7 bg-secondary-100"
      >
        <ByButton
          variant="primary"
          title="Start Tracking"
          fullWidth
          onPress={() => router.push(`/onboarding/onboarding-complete`)}
        />
      </ByStack>
    </ByStack>
  );
}
