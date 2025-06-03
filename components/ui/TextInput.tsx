import COLORS from '@/constants/Colors';
import clsx from 'clsx';
import { TextInput as RNTextInput, TextInputProps } from 'react-native';

export default function ByTextInput(props: TextInputProps) {
  return (
    <RNTextInput
      {...props}
      placeholderTextColor={props.placeholderTextColor || COLORS.secondary[400]}
      placeholderClassName="text-secondary-400"
      className={clsx(
        props.className,
        `px-3 py-3.5 font-nunito text-secondary-base
        text-lg bg-secondary-200 rounded-[12px] border border-[#F0EBEC] 
        disabled:opacity-50 h-[48px]`
      )}
    />
  );
}
