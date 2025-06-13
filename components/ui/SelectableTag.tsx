import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import ByText from './Text';

// CVA variants for the selectable tag
const tagVariants = cva('flex-row items-center justify-center rounded-full border', {
  variants: {
    variant: {
      default: '',
      primary: '',
      secondary: '',
      outline: '',
    },
    size: {
      xs: 'px-2 py-1',
      sm: 'px-3 py-1.5',
      md: 'px-4 py-2',
      lg: 'px-5 py-2.5',
    },
    selected: {
      true: '',
      false: '',
    },
    disabled: {
      true: 'opacity-50',
      false: '',
    },
  },
  compoundVariants: [
    // Default variant
    {
      variant: 'default',
      selected: false,
      class: 'border-neutral-200',
    },
    {
      variant: 'default',
      selected: true,
      class: 'border-primary-500',
    },
    // Primary variant
    {
      variant: 'primary',
      selected: false,
      class: 'bg-primary-50 border-primary-200',
    },
    {
      variant: 'primary',
      selected: true,
      class: 'bg-primary-500 border-primary-500',
    },
    // Secondary variant
    {
      variant: 'secondary',
      selected: false,
      class: 'bg-secondary-50 border-secondary-200',
    },
    {
      variant: 'secondary',
      selected: true,
      class: 'bg-secondary-500 border-secondary-500',
    },
    // Outline variant
    {
      variant: 'outline',
      selected: false,
      class: 'bg-white border-neutral-300',
    },
    {
      variant: 'outline',
      selected: true,
      class: 'bg-neutral-900 border-neutral-900',
    },
  ],
});

// Text variants for different states
const textVariants = cva('', {
  variants: {
    variant: {
      default: '',
      primary: '',
      secondary: '',
      outline: '',
    },
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-base',
    },
    selected: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    // Default variant text colors
    {
      variant: 'default',
      selected: false,
      class: 'text-neutral-700',
    },
    {
      variant: 'default',
      selected: true,
      class: 'text-primary-500',
    },
    // Primary variant text colors
    {
      variant: 'primary',
      selected: false,
      class: 'text-primary-700',
    },
    {
      variant: 'primary',
      selected: true,
      class: 'text-white',
    },
    // Secondary variant text colors
    {
      variant: 'secondary',
      selected: false,
      class: 'text-secondary-700',
    },
    {
      variant: 'secondary',
      selected: true,
      class: 'text-white',
    },
    // Outline variant text colors
    {
      variant: 'outline',
      selected: false,
      class: 'text-neutral-600',
    },
    {
      variant: 'outline',
      selected: true,
      class: 'text-white',
    },
  ],
});

export interface BySelectableTagProps extends VariantProps<typeof tagVariants> {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  showCheckmark?: boolean;
}

export default function BySelectableTag({
  label,
  selected = false,
  onPress,
  disabled = false,
  variant = 'default',
  size = 'md',
  className = '',
  icon,
  showCheckmark = false,
}: BySelectableTagProps) {
  return (
    <TouchableOpacity
      className={clsx(tagVariants({ variant, size, selected, disabled }), className)}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={disabled ? 1 : 0.7}
    >
      {/* Optional icon */}
      {icon && <View className={clsx('mr-1.5', size === 'xs' && 'mr-1')}>{icon}</View>}

      {/* Label */}
      <ByText className={textVariants({ variant, size, selected })} numberOfLines={1}>
        {label}
      </ByText>

      {/* Optional checkmark for selected state */}
      {showCheckmark && selected && (
        <View className={clsx('ml-1.5', size === 'xs' && 'ml-1')}>
          <ByText
            className={clsx(
              'text-primary-500',
              size === 'xs' && 'text-xs',
              size === 'sm' && 'text-sm',
              size === 'md' && 'text-sm',
              size === 'lg' && 'text-base'
            )}
          >
            ✓
          </ByText>
        </View>
      )}
    </TouchableOpacity>
  );
}

// Utility component for rendering multiple tags
export interface BySelectableTagGroupProps {
  tags: {
    id: string;
    label: string;
    selected?: boolean;
    disabled?: boolean;
    icon?: React.ReactNode;
  }[];
  onTagPress?: (tagId: string) => void;
  variant?: VariantProps<typeof tagVariants>['variant'];
  size?: VariantProps<typeof tagVariants>['size'];
  showCheckmark?: boolean;
  className?: string;
  multiSelect?: boolean;
}

export function BySelectableTagGroup({
  tags,
  onTagPress,
  variant = 'default',
  size = 'md',
  showCheckmark = false,
  className = '',
}: BySelectableTagGroupProps) {
  return (
    <View className={clsx('flex-row flex-wrap gap-2', className)}>
      {tags.map(tag => (
        <BySelectableTag
          key={tag.id}
          label={tag.label}
          selected={tag.selected}
          disabled={tag.disabled}
          variant={variant}
          size={size}
          icon={tag.icon}
          showCheckmark={showCheckmark}
          onPress={() => onTagPress?.(tag.id)}
        />
      ))}
    </View>
  );
}
