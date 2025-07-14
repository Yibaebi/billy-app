import { TouchableOpacity, View } from 'react-native';

import BudgetPlanIllustration from '@/components/svgs/BudgetPlanIllustration';
import ByButton from '@/components/ui/Button';
import { IconSymbol } from '@/components/ui/IconSymbol';
import ByModal from '@/components/ui/Modal';
import ByStack from '@/components/ui/Stack';
import ByText from '@/components/ui/Text';

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
            <TouchableOpacity
              onPress={onClose}
              className="absolute top-0 right-0 z-10 justify-center items-center p-2 rounded-full bg-neutral-100"
              activeOpacity={0.7}
            >
              <IconSymbol name="xmark" size={14} color="black" />
            </TouchableOpacity>

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
