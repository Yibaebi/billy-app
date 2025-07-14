import clsx from 'clsx';
import { KeyboardAvoidingView, View } from 'react-native';
import Modal, { ModalProps } from 'react-native-modal';

import { getIsIOS } from '@/utils/helpers';

export type ByModalProps = Partial<ModalProps> & {
  withInput?: boolean;
};

export default function ByModal({ children, isVisible, withInput, ...props }: ByModalProps) {
  const commonClasses = clsx('flex-1 justify-center items-center h-full w-full', props.className);

  // Differentiate between modal with input and without input
  const content = withInput ? (
    <KeyboardAvoidingView behavior={getIsIOS() ? 'padding' : 'height'} className={commonClasses}>
      {children}
    </KeyboardAvoidingView>
  ) : (
    <View className={commonClasses}>{children}</View>
  );

  return (
    <Modal isVisible={isVisible} {...props}>
      {content}
    </Modal>
  );
}
