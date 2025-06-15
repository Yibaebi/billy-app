import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import React from 'react';
import { TouchableOpacity, View, ViewProps } from 'react-native';

import Colors from '@/constants/Colors';
import CheckmarkIcon from '../svgs/CheckmarkIcon';
import ByText, { ByTextProps } from './Text';

// CVA variants for the container
const containerVariants = cva(
  'border rounded-xl p-3 flex-row items-center justify-between w-full border-secondary-400',
  {
    variants: {
      disabled: {
        true: 'opacity-50',
        false: '',
      },
    },
  }
);

// CVA variants for the checkbox circle/square
const checkboxVariants = cva('border flex items-center justify-center', {
  variants: {
    shape: {
      circle: 'rounded-full',
      square: 'rounded-[7px]',
    },
    checked: {
      true: 'border-2 border-primary-500 bg-primary-200',
      false: 'border-2 border-neutral-300 bg-neutral-200',
    },
    disabled: {
      true: 'opacity-50',
      false: '',
    },
  },
});

interface ByCheckboxProps extends ViewProps, VariantProps<typeof containerVariants> {
  label: string;
  checked: boolean;
  onToggle?: (checked: boolean) => void;
  disabled?: boolean;
  labelProps?: Partial<ByTextProps>;
  className?: string;
  shape?: VariantProps<typeof checkboxVariants>['shape'];
  disableAnimation?: boolean;
}

export default function ByCheckbox({
  label,
  checked,
  disabled,
  onToggle,
  labelProps,
  className,
  shape = 'square',
  disableAnimation = false,
  ...props
}: ByCheckboxProps) {
  // Render check indicator
  const renderCheckIndicator = () => {
    if (!checked) return null;

    if (shape === 'square') {
      return (
        <CheckmarkIcon
          key={checked ? 'checked' : 'unchecked'}
          size={12}
          color={Colors['primary'][600]}
          animate={!disableAnimation}
        />
      );
    } else {
      // For circle, keep the dot
      return <View className="w-[7px] h-[7px] rounded-full bg-white" />;
    }
  };

  return (
    <TouchableOpacity
      className={clsx(containerVariants({ disabled }), className)}
      onPress={() => onToggle?.(!checked)}
      disabled={disabled}
      activeOpacity={0.7}
      {...props}
    >
      <ByText fontWeight="regular" fontColor="secondary" size="lg" {...labelProps}>
        {label}
      </ByText>

      <View className={clsx(checkboxVariants({ shape, checked, disabled }), 'w-6 h-6')}>
        {renderCheckIndicator()}
      </View>
    </TouchableOpacity>
  );
}
