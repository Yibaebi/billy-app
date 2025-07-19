import { useState } from 'react';
import { View } from 'react-native';

import ByButton from '@/components/ui/Button';
import ByModal from '@/components/ui/Modal';
import ByStack from '@/components/ui/Stack';

import ModalHeader from '../ModalHeader';
import ExpenseAdd from './ExpenseAdd';
import BudgetSplitModalHeader from './Header';
import IncomeAllocation from './IncomeAllocation';

interface BudgetSplitModalProps {
  isOpen: boolean;
  onClose: () => void;
  currSetting: 'budget-split' | 'expense-addtion';
  onSettingChange: (setting: 'budget-split' | 'expense-addtion') => void;
}

export default function BudgetSplitModal({
  isOpen,
  onClose,
  currSetting,
  onSettingChange,
}: BudgetSplitModalProps) {
  const [totalAmount] = useState(1800);
  const [budgetAmount, setBudgetAmount] = useState(1200);
  const usedPercentage = Math.round((budgetAmount / totalAmount) * 100);

  return (
    <ByModal
      withInput
      isVisible={isOpen}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      onClose={onClose}
    >
      <ByStack justifyContent="flex-end" direction="column" className="w-full h-full">
        <View className="bg-white rounded-[36px] w-full relative p-6">
          <ByStack direction="column" className="pt-14 w-full">
            <ModalHeader onClose={onClose} />

            <BudgetSplitModalHeader
              totalAmount={totalAmount}
              usedPercentage={usedPercentage}
              budgetAmount={budgetAmount}
            />

            {currSetting === 'budget-split' ? (
              <IncomeAllocation
                budgetAmount={budgetAmount}
                totalAmount={totalAmount}
                setBudgetAmount={setBudgetAmount}
              />
            ) : (
              <ExpenseAdd totalAmount={totalAmount} budgetAmount={budgetAmount} />
            )}

            <ByButton fullWidth title="Continue" onPress={onClose} />
          </ByStack>
        </View>
      </ByStack>
    </ByModal>
  );
}
