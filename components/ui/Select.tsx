import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import React, { useMemo, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';

import ByArrowDown from '@/components/svgs/ArrowDown';
import { SlideUpOverlay } from './Overlay';
import ByText from './Text';
import ByInput from './TextInput';

// CVA variants for the select container
const containerVariants = cva(
  'border rounded-xl px-3 py-3.5 flex-row items-center justify-between w-full',
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
  options: (T | null | undefined)[];
  value?: T | null;
  onSelect?: (option: T) => void;
  placeholder?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  disabled?: boolean;
  className?: string;
  overlayTitle?: string;
  emptyMessage?: string;
  renderOption?: (option: BySelectOption, isSelected: boolean) => React.ReactElement;
  error?: boolean;
  errorMessage?: string;
}

export default function BySelect<T extends BySelectOption>({
  options,
  value,
  onSelect,
  placeholder = 'Select an option',
  searchable = false,
  searchPlaceholder = 'Search options...',
  disabled = false,
  variant = 'default',
  size = 'md',
  className = '',
  overlayTitle = 'Select Option',
  emptyMessage = 'No options found',
  renderOption,
}: BySelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter options based on search query
  const filteredOptions = useMemo(() => {
    if (!searchQuery.trim()) {
      return options as T[];
    }

    // Filter options based on search query
    const query = searchQuery.toLowerCase();

    return options.filter(option => {
      const label = option?.label.toLowerCase();
      const value = option?.value.toLowerCase();
      const description = option?.description?.toLowerCase();

      return (
        label?.includes(query) ||
        value?.includes(query) ||
        (description && description.includes(query))
      );
    }) as T[];
  }, [options, searchQuery]);

  const handleSelect = (option: T) => {
    onSelect?.(option);
    setIsOpen(false);
    setSearchQuery('');
  };

  const handleOpen = () => {
    if (!disabled) {
      setIsOpen(true);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setSearchQuery('');
  };

  // Default option renderer
  const defaultRenderOption = (option: T, isSelected: boolean) => (
    <TouchableOpacity
      onPress={() => handleSelect(option)}
      className={clsx(
        'flex-row items-center py-4 border-b border-secondary-300',
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
        <View className="w-6 h-6 bg-primary-500 rounded-full items-center justify-center ml-3">
          <ByText className="text-white text-xs">✓</ByText>
        </View>
      )}
    </TouchableOpacity>
  );

  // Empty state component
  const renderEmptyState = () => (
    <View className="flex-1 items-center justify-center py-16">
      <ByText className="text-4xl mb-3">📋</ByText>
      <ByText fontWeight="semibold" size="lg" className="mb-1">
        {emptyMessage}
      </ByText>
      <ByText fontColor="secondary" size="sm" className="text-center opacity-70">
        {searchable && searchQuery ? 'Try adjusting your search terms' : 'No options available'}
      </ByText>
    </View>
  );

  const renderOptionItem = ({ item }: { item: T }): React.ReactElement => {
    const isSelected = value?.value === item.value;

    if (renderOption) {
      return renderOption(item, isSelected);
    }

    return defaultRenderOption(item, isSelected);
  };

  return (
    <>
      <TouchableOpacity
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
            <ByText fontColor="secondary" className="opacity-60">
              {placeholder}
            </ByText>
          )}
        </View>

        {/* Arrow down icon */}
        <View className="ml-3">
          <ByArrowDown color={disabled ? '#9CA3AF' : '#6B7280'} />
        </View>
      </TouchableOpacity>

      {/* Selection overlay */}
      <SlideUpOverlay visible={isOpen} onClose={handleClose} height={700}>
        {/* Header */}
        <View className="mb-2">
          <View className="flex-row items-center justify-between mb-4">
            <ByText fontWeight="bold" size="xl">
              {overlayTitle}
            </ByText>

            <TouchableOpacity
              onPress={handleClose}
              className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center"
              activeOpacity={0.7}
            >
              <ByText className="opacity-60">✕</ByText>
            </TouchableOpacity>
          </View>

          {/* Search input */}
          {searchable && (
            <>
              <View className="relative">
                <ByInput
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholder={searchPlaceholder}
                  className="pl-12 bg-white"
                />

                <View className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <ByText className="opacity-50">🔍</ByText>
                </View>
              </View>

              {/* Results counter */}
              <View className="mt-3 px-1">
                <ByText fontColor="secondary" size="sm" className="opacity-70">
                  {filteredOptions.length === options.length
                    ? `${options.length} options`
                    : `${filteredOptions.length} of ${options.length} options`}
                </ByText>
              </View>
            </>
          )}
        </View>

        {/* Options list */}
        <FlatList
          data={filteredOptions}
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
        />
      </SlideUpOverlay>
    </>
  );
}
