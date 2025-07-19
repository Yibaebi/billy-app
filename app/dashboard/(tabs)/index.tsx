import * as ImgPicker from 'expo-image-picker';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, TouchableOpacity } from 'react-native';

import BudgetSplitModal from '@/components/screens/dashboard/BudgetSplitModal';
import ByArrowRightIcon from '@/components/svgs/ArrowRight';
import ByFlashIcon from '@/components/svgs/FlashIcon';
import GroupIcon from '@/components/svgs/GroupIcon';
import MoneyTickIcon from '@/components/svgs/MoneyTickIcon';
import ByPlusIcon from '@/components/svgs/PlusIcon';
import ByScannerIcon from '@/components/svgs/ScannerIcon';
import BySettingsIcon from '@/components/svgs/SettingsIcon';
import ByButton from '@/components/ui/Button';
import ByStack from '@/components/ui/Stack';
import ByText from '@/components/ui/Text';
import Colors from '@/constants/Colors';

// Example expenses
const EXAMPLE_EXPENSES = [
  {
    id: 1,
    amount: 100,
    date: '2025-06-01',
    description: 'Rent',
  },
  {
    id: 2,
    amount: 100,
    date: '2025-06-02',
    description: 'Payment for electricity bill.',
  },
  {
    id: 3,
    amount: 100,
    date: '2025-06-04',
    description: 'Food',
  },
  {
    id: 4,
    amount: 100,
    date: '2025-06-07',
    description: 'Transportation',
  },
];

export default function DashboardHome() {
  const [currSetting, setCurrSetting] = useState<'budget-split' | 'expense-addtion'>(
    'expense-addtion'
  );
  const [isOpen, setIsOpen] = useState(true);
  const [, setImage] = useState<string | null>(null);

  // Open Camera
  const handleOpenCamera = async () => {
    // Camera options
    const pickerOptions: ImgPicker.ImagePickerOptions = {
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    };

    // Launch camera picker
    const result = await ImgPicker.launchCameraAsync(pickerOptions);
    const image = result.assets?.[0]?.uri;

    setImage(image ?? null);
  };

  return (
    <>
      <ByStack className="relative px-6 bg-secondary-100">
        <ByStack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          className="absolute top-0 left-6 z-10 pb-4 w-full bg-secondary-100"
        >
          <Pressable onPress={handleOpenCamera} className="p-2 rounded-full bg-secondary-300">
            <ByScannerIcon />
          </Pressable>

          <ByText fontWeight="bold">Home</ByText>

          <Link className="p-2 rounded-full bg-secondary-300" href="/dashboard/profile">
            <BySettingsIcon />
          </Link>
        </ByStack>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pt-20 ">
          <ByStack direction="column" className="w-full">
            <ByStack alignItems="center" justifyContent="space-between" className="mb-9 w-full">
              <ByText
                size="xl"
                fontWeight="bold"
                className="max-w-[198px] whitespace-nowrap"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                Hello, User 090909090909090909090
              </ByText>

              <ByStack
                direction="row"
                alignItems="center"
                className="bg-primary-100 py-1.5 px-3 rounded-full border border-primary-200 gap-1"
              >
                <ByText fontWeight="bold" size="lg">
                  10
                </ByText>

                <ByFlashIcon />
              </ByStack>
            </ByStack>

            <ByStack direction="column" className="p-4 mb-6 w-full rounded-xl bg-secondary-200">
              <ByStack direction="column" className="gap-2 mb-9">
                <ByText>Assigned budget</ByText>

                <ByText fontWeight="extrabold" size="4xl">
                  $1,550
                </ByText>
              </ByStack>

              <ByStack direction="column" className="gap-3 w-full">
                <ByStack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  className="w-full"
                >
                  <ByText>Today’s expense</ByText>
                  <ByText fontWeight="bold">$50</ByText>
                </ByStack>

                <ByStack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  className="w-full"
                >
                  <ByText>Unassigned income</ByText>
                  <ByText fontWeight="bold">$1,400</ByText>
                </ByStack>
              </ByStack>
            </ByStack>

            <ByStack direction="column" className="gap-4 mb-6 w-full">
              <ByText size="xl" fontWeight="bold">
                Expense Categories
              </ByText>

              <ByStack direction="column" className="gap-3 w-full">
                <TouchableOpacity className="flex-row justify-between items-center gap-2 px-3 py-2.5 w-full rounded-xl border border-secondary-300">
                  <ByStack direction="row" alignItems="center" className="gap-2">
                    <MoneyTickIcon />
                    <ByText>Fixed expense</ByText>
                  </ByStack>

                  <ByArrowRightIcon />
                </TouchableOpacity>

                <TouchableOpacity className="flex-row justify-between items-center gap-2 px-3 py-2.5 w-full rounded-xl border border-secondary-300">
                  <ByStack direction="row" alignItems="center" className="gap-2">
                    <GroupIcon />
                    <ByText>Flexible expense</ByText>
                  </ByStack>

                  <ByArrowRightIcon />
                </TouchableOpacity>
              </ByStack>
            </ByStack>

            <ByStack direction="column" className="gap-4 mb-6 w-full">
              <ByStack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                className="w-full"
              >
                <ByText size="xl" fontWeight="bold">
                  Activity
                </ByText>

                <ByText fontWeight="bold" className="underline">
                  See all
                </ByText>
              </ByStack>

              <ScrollView
                showsVerticalScrollIndicator={false}
                className="mb-4 max-h-[130px]"
                contentContainerClassName="gap-3"
                nestedScrollEnabled={true}
              >
                {EXAMPLE_EXPENSES.map(expense => (
                  <ByStack
                    key={expense.id}
                    direction="row"
                    alignItems="flex-start"
                    justifyContent="space-between"
                    className="gap-2 w-full"
                  >
                    <ByStack direction="row" alignItems="center" className="gap-2">
                      <ByStack className="p-2 rounded-full bg-secondary-300">
                        <ByPlusIcon color={Colors.secondary[600]} width={24} height={24} />
                      </ByStack>

                      <ByStack direction="column" className="gap-1">
                        <ByText fontWeight="bold" className="leading-5">
                          {expense.description}
                        </ByText>

                        <ByText size="sm">{expense.date}</ByText>
                      </ByStack>
                    </ByStack>

                    <ByText fontWeight="semibold">${expense.amount}</ByText>
                  </ByStack>
                ))}
              </ScrollView>

              <ByButton
                title="Log expense"
                fullWidth
                rightIcon={<ByPlusIcon width={24} height={24} />}
                onPress={() => setIsOpen(true)}
              />
            </ByStack>
          </ByStack>
        </ScrollView>
      </ByStack>

      {/* <SetMonthlyBudgetModal isOpen={isOpen} onClose={() => setIsOpen(false)} /> */}
      {/* <ConfirmIncomeModal isOpen={isOpen} onClose={() => setIsOpen(false)} /> */}

      <BudgetSplitModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        currSetting={currSetting}
        onSettingChange={setCurrSetting}
      />
    </>
  );
}
