import COLORS from '@/constants/Colors';
import clsx from 'clsx';
import { TextInput as RNTextInput, TextInputProps } from 'react-native';

export default function ByTextInput(props: TextInputProps) {
  return (
    <RNTextInput
      {...props}
      placeholderTextColor={props.placeholderTextColor || COLORS.secondary[400]}
      className={clsx(
        `px-3 font-nunito text-secondary-base
        text-lg rounded-[12px] border border-secondary-400 h-[48px]
        disabled:opacity-50 w-full`,
        props.className
      )}
    />
  );
}
