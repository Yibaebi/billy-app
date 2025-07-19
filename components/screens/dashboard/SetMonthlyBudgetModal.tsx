import { View } from 'react-native';

import BudgetPlanIllustration from '@/components/svgs/BudgetPlanIllustration';
import ByButton from '@/components/ui/Button';
import ByModal from '@/components/ui/Modal';
import ByStack from '@/components/ui/Stack';
import ByText from '@/components/ui/Text';
import ModalHeader from './ModalHeader';

interface SetMonthlyBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SetMonthlyBudgetModal({ isOpen, onClose }: SetMonthlyBudgetModalProps) {
  return (
    <ByModal withInput isVisible={isOpen} animationIn="slideInUp" animationOut="slideOutDown">
      <ByStack justifyContent="flex-end" direction="column" className="w-full h-full pt-[72px]">
        <View className="bg-white rounded-[36px] w-full relative p-6">
          <ByStack direction="column" alignItems="center" className="pt-[72px]">
            <ModalHeader onClose={onClose} hideBackButton />

            <BudgetPlanIllustration />

            <ByText textAlign="center" size="3xl" fontWeight="bold" className="max-w-[260px] mt-4">
              Let’s plan how you’ll spend this month.
            </ByText>

            <ByText textAlign="center" className="max-w-[260px] mt-2 mb-4">
              You’ve told us how you earn — now give your money a job
            </ByText>

            <ByButton fullWidth title="Set monthly budget" onPress={onClose} />
          </ByStack>
        </View>
      </ByStack>
    </ByModal>
  );
}
