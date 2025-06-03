import { ActivityIndicator, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import ByText, { ByTextProps } from './Text';

// Button variant types
type ByButtonVariant = 'primary' | 'primary-light';
type ByButtonSize = 'sm' | 'md' | 'lg' | 'xl';

// Props interface
interface ByButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: ByButtonVariant;
  size?: ByButtonSize;
  fontWeight?: ByTextProps['fontWeight'];
  fontColor?: ByTextProps['fontColor'];
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
}

// Variant styles using your billy color palette
const getVariantStyles = (variant: ByButtonVariant, disabled: boolean) => {
  const baseStyles = 'rounded-[100px] h-[48px] flex items-center justify-center px-6';

  if (disabled) {
    return `${baseStyles} bg-neutral-200 opacity-50`;
  }

  switch (variant) {
    case 'primary':
      return `${baseStyles} bg-primary-300 active:bg-primary-400`;
    case 'primary-light':
      return `${baseStyles} bg-primary-50 active:bg-primary-100`;
    default:
      return `${baseStyles} bg-primary-300 active:bg-primary-400`;
  }
};

const ByButton: React.FC<ByButtonProps> = ({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  fontWeight = 'semibold',
  fontColor = 'secondary',
  onPress,
  ...props
}) => {
  const isDisabled = disabled || loading;

  const buttonStyles = [getVariantStyles(variant, isDisabled), fullWidth ? 'w-full' : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <TouchableOpacity
      className={buttonStyles}
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
      <ByText fontWeight={fontWeight} fontColor={fontColor}>
        {loading ? 'Loading...' : title}
      </ByText>

      {/* Right Icon */}
      {rightIcon && !loading && <View className="ml-2">{rightIcon}</View>}
    </TouchableOpacity>
  );
};

export default ByButton;
