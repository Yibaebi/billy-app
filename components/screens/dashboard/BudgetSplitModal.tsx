import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import ArrowLeft from '@/components/svgs/ArrowLeft';
import ByButton from '@/components/ui/Button';
import { IconSymbol } from '@/components/ui/IconSymbol';
import ByInfoText from '@/components/ui/InfoText';
import ByModal from '@/components/ui/Modal';
import PercentageSlider from '@/components/ui/PercentageSlider';
import ByStack from '@/components/ui/Stack';
import ByText from '@/components/ui/Text';

interface BudgetSplitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BudgetSplitModal({ isOpen, onClose }: BudgetSplitModalProps) {
  const [totalAmount] = useState(1800);
  const [budgetAmount, setBudgetAmount] = useState(1200);
  const usedPercentage = Math.round((budgetAmount / totalAmount) * 100);

  return (
    <ByModal withInput isVisible={isOpen} animationIn="slideInUp" animationOut="slideOutDown">
      <ByStack justifyContent="flex-end" direction="column" className="w-full h-full">
        <View className="bg-white rounded-[36px] w-full relative p-6">
          <ByStack direction="column" className="pt-14 w-full">
            <ByStack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              className="absolute top-0 right-0 w-full"
            >
              <TouchableOpacity
                onPress={onClose}
                className="z-10 justify-center items-center p-2 rounded-full bg-neutral-100"
                activeOpacity={0.7}
              >
                <ArrowLeft width={18} height={18} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={onClose}
                className="z-10 justify-center items-center p-2 rounded-full bg-neutral-100"
                activeOpacity={0.7}
              >
                <IconSymbol name="xmark" size={14} color="black" />
              </TouchableOpacity>
            </ByStack>

            <ByText textAlign="center" size="2xl" fontWeight="bold" className="mb-7 w-full">
              Split Monthly Budget
            </ByText>

            <ByStack direction="column" className="gap-9 p-4 w-full rounded-xl bg-secondary-200">
              <ByStack direction="row" justifyContent="space-between" className="w-full">
                <ByStack direction="column" className="gap-2">
                  <ByText size="sm">Assigned budget</ByText>

                  <ByText size="3xl" fontWeight="bold">
                    ${totalAmount}
                  </ByText>
                </ByStack>

                <ByText size="sm" className="text-primary-600">
                  {usedPercentage}% assigned
                </ByText>
              </ByStack>

              <ByStack direction="row" justifyContent="space-between" className="w-full">
                <ByText>Unassigned income</ByText>
                <ByText fontWeight="bold">${totalAmount - budgetAmount}</ByText>
              </ByStack>
            </ByStack>

            <ByText size="sm" className="mt-4 mb-3">
              Budget this much of your income
            </ByText>

            <PercentageSlider
              value={budgetAmount}
              maxValue={totalAmount}
              onChange={setBudgetAmount}
            />

            <ByInfoText text="Recommended: 50-60% of income." className="my-6" />

            <ByButton
              variant="text"
              fullWidth
              title="Reset to default"
              className="mb-4"
              disabled={budgetAmount === totalAmount * 0.5}
              onPress={() => setBudgetAmount(totalAmount * 0.5)}
            />

            <ByButton fullWidth title="Continue" onPress={onClose} />
          </ByStack>
        </View>
      </ByStack>
    </ByModal>
  );
}
