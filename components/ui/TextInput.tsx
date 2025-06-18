import clsx from 'clsx';
import { TextInput as RNTextInput, TextInputProps } from 'react-native';

import ByStack from '@/components/ui/Stack';
import ByText from '@/components/ui/Text';
import COLORS from '@/constants/Colors';

interface ByTextInputProps extends TextInputProps {
  error?: boolean;
  errorMessage?: string;
  containerClassName?: string;
}

export default function ByTextInput(props: ByTextInputProps) {
  const { error, errorMessage, containerClassName, ...rest } = props;

  return (
    <ByStack direction="column" className={clsx('w-full', containerClassName)}>
      <RNTextInput
        {...rest}
        placeholderTextColor={props.placeholderTextColor || COLORS.secondary[400]}
        className={clsx(
          `px-3 font-nunito text-secondary-base
        text-lg rounded-[12px] border border-secondary-400 h-[48px]
        bg-secondary-200
        disabled:opacity-50 w-full`,
          props.className
        )}
      />

      {error && errorMessage && (
        <ByText fontWeight="semibold" size="sm" className="text-error">
          {errorMessage}
        </ByText>
      )}
    </ByStack>
  );
}
