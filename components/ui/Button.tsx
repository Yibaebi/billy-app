import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import { ActivityIndicator, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

import ByText, { ByTextProps } from './Text';

// CVA variants for the button
const buttonVariants = cva('rounded-[100px] flex items-center justify-center px-6 flex-row', {
  variants: {
    variant: {
      primary: 'bg-primary-400 active:bg-primary-500',
      'primary-light': 'bg-primary-100 active:bg-primary-200',
      neutral: 'bg-neutral-200 active:bg-neutral-300',
    },
    size: {
      sm: 'h-[36px] px-4',
      md: 'h-[48px] px-6',
      lg: 'h-[56px] px-8',
      xl: 'h-[64px] px-10',
    },
    fullWidth: {
      true: 'w-full',
      false: '',
    },
    disabled: {
      true: 'bg-neutral-200 opacity-50',
      false: '',
    },
  },
  compoundVariants: [
    // Disabled state overrides all other variants
    {
      disabled: true,
      className: '!bg-neutral-200 !opacity-50',
    },
    {
      disabled: true,
      variant: 'primary',
      className: '!bg-primary-200 border border-primary-400 !opacity-50',
    },
  ],
});

// CVA variants for button text color based on variant
const textColorVariants = cva('text-secondary', {
  variants: {
    variant: {
      primary: 'secondary' as const,
      'primary-light': 'secondary' as const,
      neutral: 'secondary' as const,
    },
    disabled: {
      true: 'secondary' as const,
      false: '',
    },
  },
  compoundVariants: [
    {
      disabled: true,
      className: 'secondary' as const,
    },
  ],
});

interface ByButtonProps extends Omit<TouchableOpacityProps, 'disabled'> {
  title: string;
  variant?: VariantProps<typeof buttonVariants>['variant'];
  size?: VariantProps<typeof buttonVariants>['size'];
  fontWeight?: ByTextProps['fontWeight'];
  fontColor?: ByTextProps['fontColor'];
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
}

const ByButton: React.FC<ByButtonProps> = ({
  title,
  variant = 'primary-light',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  fontWeight = 'bold',
  fontColor,
  onPress,
  ...props
}) => {
  const isDisabled = disabled || loading;
  const textColor = fontColor || textColorVariants({ variant, disabled: isDisabled });

  return (
    <TouchableOpacity
      className={clsx(
        buttonVariants({
          variant: isDisabled ? undefined : variant,
          size,
          fullWidth,
          disabled: isDisabled,
        }),
        className
      )}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
      {...props}
    >
      {/* Left Icon */}
      {leftIcon && !loading && <View className="mr-2">{leftIcon}</View>}

      {/* Loading Spinner */}
      {loading && <ActivityIndicator size="small" className="mr-2 text-white" />}

      {/* Button Text */}
      <ByText fontWeight={fontWeight} fontColor={textColor as ByTextProps['fontColor']}>
        {loading ? 'Loading...' : title}
      </ByText>

      {/* Right Icon */}
      {rightIcon && !loading && <View className="ml-2">{rightIcon}</View>}
    </TouchableOpacity>
  );
};

export default ByButton;
