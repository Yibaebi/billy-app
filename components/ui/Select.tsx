import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import React, { useRef, useState } from 'react';
import { FlatList, Modal, TouchableOpacity, View } from 'react-native';

import ByArrowDown from '@/components/svgs/ArrowDown';
import Colors from '@/constants/Colors';
import { getIsAndroid, getIsIOS, getScreenHeight } from '@/utils/helpers';

import ByText from './Text';

const IS_ANDROID = getIsAndroid();
const IS_IOS = getIsIOS();
const SCREEN_HEIGHT = getScreenHeight();

// CVA variants for the select container
const containerVariants = cva(
  'border rounded-xl px-3 py-3.5 flex-row items-center justify-between w-full h-[48px]',
  {
    variants: {
      variant: {
        default: 'border-neutral-300 bg-white',
        error: 'border-red-500 bg-white',
        focused: 'border-primary-500 bg-white',
      },
      disabled: {
        true: 'opacity-50 bg-neutral-100',
        false: '',
      },
      size: {
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      disabled: false,
      size: 'md',
    },
  }
);

// Generic option type
export interface BySelectOption {
  label: string;
  value: string;
  description?: string;
  disabled?: boolean;
}

interface BySelectProps<T extends BySelectOption> extends VariantProps<typeof containerVariants> {
  options: T[];
  value?: T | null;
  onSelect?: (option: T) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  overlayTitle?: string;
  emptyMessage?: string;
  error?: boolean;
  errorMessage?: string;

  renderOption?: (
    option: BySelectOption,
    isSelected: boolean,
    isLast: boolean
  ) => React.ReactElement;
}

export default function BySelect<T extends BySelectOption>({
  options,
  value,
  onSelect,
  placeholder = 'Select an option',
  disabled = false,
  variant = 'default',
  size = 'md',
  className = '',
  emptyMessage = 'No options found',
  renderOption,
}: BySelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<View>(null);

  const [dropdownLayout, setDropdownLayout] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    showAbove: false,
  });

  const handleSelect = (option: T) => {
    onSelect?.(option);
    setIsOpen(false);
  };

  const handleOpen = () => {
    if (!disabled) {
      // Measure the trigger position
      triggerRef.current?.measure((x, y, width, height, pageX, pageY) => {
        const dropdownMaxHeight = 400;
        const spaceBelow = SCREEN_HEIGHT - (pageY + height);
        const spaceAbove = pageY;

        // Show above if there's not enough space below and there's more space above
        const showAbove = spaceBelow < dropdownMaxHeight && spaceAbove > spaceBelow;

        setDropdownLayout({
          x: pageX,
          y: showAbove ? pageY - 8 - (IS_ANDROID ? height : 0) : pageY + 8 + (IS_IOS ? height : 0),
          width: width,
          height: height,
          showAbove: showAbove,
        });

        setIsOpen(true);
      });
    }
  };

  const handleClose = () => setIsOpen(false);

  // Default option renderer
  const defaultRenderOption = (option: T, isSelected: boolean, isLast: boolean) => (
    <TouchableOpacity
      onPress={() => handleSelect(option)}
      className={clsx(
        'flex-row items-center py-4 border-b border-secondary-300',
        isLast && 'border-b-0',
        isSelected && 'bg-primary-50',
        option.disabled && 'opacity-50'
      )}
      activeOpacity={option.disabled ? 1 : 0.6}
      disabled={option.disabled}
    >
      <View className="flex-1">
        <ByText
          fontWeight={isSelected ? 'bold' : 'regular'}
          size="base"
          numberOfLines={1}
          fontColor={isSelected ? 'primary' : 'secondary'}
        >
          {option.label}
        </ByText>

        {option.description && (
          <ByText
            fontWeight="light"
            size="sm"
            fontColor="secondary"
            className="opacity-70 mt-0.5"
            numberOfLines={2}
          >
            {option.description}
          </ByText>
        )}
      </View>

      {isSelected && (
        <View className="justify-center items-center ml-3 w-6 h-6 rounded-full bg-primary-500">
          <ByText className="text-xs text-white">✓</ByText>
        </View>
      )}
    </TouchableOpacity>
  );

  // Empty state component
  const renderEmptyState = () => (
    <View className="flex-1 justify-center items-center py-16">
      <ByText className="mb-3 text-4xl">📋</ByText>

      <ByText fontWeight="semibold" size="lg" className="mb-1">
        {emptyMessage}
      </ByText>
    </View>
  );

  const renderOptionItem = ({ item, index }: { item: T; index: number }): React.ReactElement => {
    const isSelected = value?.value === item.value;
    const isLast = index === options.length - 1;

    if (renderOption) {
      return renderOption(item, isSelected, isLast);
    }

    return defaultRenderOption(item, isSelected, isLast);
  };

  return (
    <View className="relative w-full">
      <TouchableOpacity
        ref={triggerRef}
        className={clsx(containerVariants({ variant, disabled, size }), className)}
        onPress={handleOpen}
        disabled={disabled}
        activeOpacity={0.7}
      >
        <View className="flex-1">
          {value ? (
            <View>
              <ByText fontWeight="regular" size="base" numberOfLines={1}>
                {value.label}
              </ByText>

              {value.description && (
                <ByText fontWeight="light" size="sm" fontColor="secondary" className="opacity-70">
                  {value.description}
                </ByText>
              )}
            </View>
          ) : (
            <ByText fontColor="secondary" className="opacity-60 text-secondary-500">
              {placeholder}
            </ByText>
          )}
        </View>

        {/* Arrow down icon */}
        <View
          className={clsx('ml-3', disabled ? 'opacity-50' : '')}
          style={{
            transform: [{ rotate: isOpen ? '180deg' : '0deg' }],
          }}
        >
          <ByArrowDown />
        </View>
      </TouchableOpacity>

      {/* Dropdown */}
      <Modal visible={isOpen} transparent={true} animationType="none" onRequestClose={handleClose}>
        <TouchableOpacity onPress={handleClose} activeOpacity={1} className="w-full h-full">
          <View
            className="absolute bg-white rounded-xl border drop-shadow-sm border-secondary-200"
            style={{
              top: dropdownLayout.y,
              left: dropdownLayout.x,
              width: dropdownLayout.width,
              maxHeight: 400,
              shadowColor: Colors.secondary[500],
              shadowOffset: { width: 0, height: 12 },
              shadowOpacity: 0.08,
              shadowRadius: 100,
              elevation: 10,
              transform: dropdownLayout.showAbove ? [{ translateY: '-100%' }] : undefined,
            }}
          >
            <TouchableOpacity activeOpacity={1} className="px-3">
              <FlatList
                data={options}
                keyExtractor={item => item.value}
                renderItem={renderOptionItem}
                showsVerticalScrollIndicator={false}
                initialNumToRender={15}
                maxToRenderPerBatch={20}
                windowSize={10}
                removeClippedSubviews={true}
                scrollEventThrottle={16}
                ListEmptyComponent={renderEmptyState}
                getItemLayout={(_data, index) => ({
                  length: 60,
                  offset: 60 * index,
                  index,
                })}
                style={{ maxHeight: 320 }}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
