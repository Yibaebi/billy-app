import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import React from 'react';
import { TouchableOpacity, View, ViewProps } from 'react-native';

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
    defaultVariants: {
      disabled: false,
    },
  }
);

// CVA variants for the checkbox circle
const checkboxVariants = cva('rounded-full border flex items-center justify-center', {
  variants: {
    size: {
      sm: 'w-5 h-5',
      md: 'w-6 h-6',
      lg: 'w-8 h-8',
    },
    checked: {
      true: 'border-primary-500 bg-primary-500',
      false: 'border-neutral-300 bg-neutral-200',
    },
    disabled: {
      true: 'opacity-50',
      false: '',
    },
  },
  defaultVariants: {
    size: 'md',
    checked: false,
    disabled: false,
  },
});

// CVA variants for the inner dot
const dotVariants = cva('rounded-full bg-white', {
  variants: {
    size: {
      sm: 'w-1.5 h-1.5',
      md: 'w-2 h-2',
      lg: 'w-3 h-3',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

interface ByCheckboxProps extends ViewProps, VariantProps<typeof containerVariants> {
  label: string;
  checked: boolean;
  onToggle?: (checked: boolean) => void;
  disabled?: boolean;
  labelProps?: Partial<ByTextProps>;
  className?: string;
  checkboxSize?: VariantProps<typeof checkboxVariants>['size'];
}

export default function ByCheckbox({
  label,
  checked,
  disabled,
  onToggle,
  labelProps,
  className,
  checkboxSize,
  ...props
}: ByCheckboxProps) {
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

      <View className={checkboxVariants({ size: checkboxSize, checked, disabled })}>
        {checked && <View className={dotVariants({ size: checkboxSize })} />}
      </View>
    </TouchableOpacity>
  );
}
