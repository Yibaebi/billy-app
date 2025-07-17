import { TouchableOpacity, View } from 'react-native';

import ArrowLeft from '@/components/svgs/ArrowLeft';
import ByButton from '@/components/ui/Button';
import { IconSymbol } from '@/components/ui/IconSymbol';
import ByInfoText from '@/components/ui/InfoText';
import ByModal from '@/components/ui/Modal';
import ByStack from '@/components/ui/Stack';
import ByText from '@/components/ui/Text';
import ByTextInput from '@/components/ui/TextInput';

interface ConfirmIncomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConfirmIncomeModal({ isOpen, onClose }: ConfirmIncomeModalProps) {
  return (
    <ByModal withInput isVisible={isOpen} animationIn="slideInUp" animationOut="slideOutDown">
      <ByStack justifyContent="flex-end" direction="column" className="w-full h-full">
        <View className="bg-white rounded-[36px] w-full relative p-6">
          <ByStack direction="column" alignItems="center" className="pt-14 w-full">
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

            <ByText textAlign="center" size="2xl" fontWeight="bold" className="mb-7">
              Confirm Income Summary
            </ByText>

            <ByStack direction="column" className="gap-3 mb-3 w-full">
              <ByText>Salary</ByText>
              <ByTextInput />
            </ByStack>

            <ByStack direction="column" className="gap-3 w-full">
              <ByText>Freelance</ByText>
              <ByTextInput />
            </ByStack>

            <ByInfoText text="You can always adjust this later on your profile." className="my-6" />

            <ByButton fullWidth title="Continue" onPress={onClose} />
          </ByStack>
        </View>
      </ByStack>
    </ByModal>
  );
}
