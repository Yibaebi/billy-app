import { TouchableOpacity } from 'react-native';

import ArrowLeft from '@/components/svgs/ArrowLeft';
import { IconSymbol } from '@/components/ui/IconSymbol';
import ByStack from '@/components/ui/Stack';

interface ModalHeaderProps {
  onClose: () => void;
  hideBackButton?: boolean;
}

export default function ModalHeader({ onClose, hideBackButton = false }: ModalHeaderProps) {
  return (
    <ByStack
      direction="row"
      alignItems="center"
      justifyContent={hideBackButton ? 'flex-end' : 'space-between'}
      className="absolute top-0 right-0 w-full"
    >
      {!hideBackButton && (
        <TouchableOpacity
          onPress={onClose}
          className="z-10 justify-center items-center p-2 rounded-full bg-neutral-100"
          activeOpacity={0.7}
        >
          <ArrowLeft width={18} height={18} />
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={onClose}
        className="z-10 justify-center items-center p-2 rounded-full bg-neutral-100"
        activeOpacity={0.7}
      >
        <IconSymbol name="xmark" size={14} color="black" />
      </TouchableOpacity>
    </ByStack>
  );
}
