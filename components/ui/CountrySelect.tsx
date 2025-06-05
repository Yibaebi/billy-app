import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';

import { COUNTRIES } from '@/constants/Countries';
import { IconSymbol } from './IconSymbol';
import { SlideUpOverlay } from './Overlay';
import ByText from './Text';
import ByInput from './TextInput';

// CVA variants for the country select container
const containerVariants = cva(
  'border rounded-xl p-4 flex-row items-center justify-between w-full',
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
    },
    defaultVariants: {
      variant: 'default',
      disabled: false,
    },
  }
);

// Country type
export type Country = {
  name: string;
  flag: string;
  code: string;
  dial_code: string;
};

interface CountrySelectProps {
  value: Country | null;
  onSelect?: (country: Country) => void;
  placeholder?: string;
  disabled?: boolean;
  variant?: VariantProps<typeof containerVariants>['variant'];
  className?: string;
  showDialCode?: boolean;
  searchPlaceholder?: string;
}

export default function CountrySelect({
  value,
  onSelect,
  placeholder = 'Select country',
  disabled = false,
  variant = 'default',
  className = '',
  showDialCode = false,
  searchPlaceholder = 'Search countries...',
}: CountrySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const flatListRef = useRef<FlatList>(null);

  // Filter countries based on search query
  const filteredCountries = useMemo(() => {
    if (!searchQuery.trim()) return COUNTRIES;

    const query = searchQuery.toLowerCase();
    return COUNTRIES.filter(
      country =>
        country.name.toLowerCase().includes(query) ||
        country.code.toLowerCase().includes(query) ||
        country.dial_code.includes(query)
    );
  }, [searchQuery]);

  const selectedIndex = useMemo(
    () => filteredCountries.findIndex(country => country.code === value?.code),
    [filteredCountries, value]
  );

  // Scroll to selected item when overlay opens or search changes
  useEffect(() => {
    if (isOpen && value && filteredCountries.length > 0 && selectedIndex !== -1) {
      // Use requestAnimationFrame for better timing
      requestAnimationFrame(() => {
        const offset = selectedIndex * 60; // Item height
        const listHeight = 700 - 200; // Overlay height minus header/padding
        const centerOffset = Math.max(0, offset - listHeight / 2);

        flatListRef.current?.scrollToOffset({
          offset: centerOffset,
          animated: true,
        });
      });
    }
  }, [filteredCountries.length, isOpen, selectedIndex, value]);

  const handleSelect = (country: Country) => {
    onSelect?.(country);
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

  // Country Item with improved design
  const renderCountryItem = ({ item }: { item: Country }) => {
    const isSelected = value?.code === item.code;

    return (
      <TouchableOpacity
        onPress={() => handleSelect(item)}
        className={clsx(
          'flex-row items-center px-4 py-3 border-b border-neutral-100',
          isSelected && 'bg-primary-50'
        )}
        activeOpacity={0.6}
      >
        <View className="w-10 h-10 rounded-full bg-neutral-100 items-center justify-center mr-3">
          <ByText className="text-xl">{item.flag}</ByText>
        </View>

        <View className="flex-1 mr-3">
          <ByText
            fontWeight={isSelected ? 'semibold' : 'regular'}
            size="base"
            numberOfLines={1}
            className={isSelected ? 'text-primary-600' : ''}
          >
            {item.name}
          </ByText>
          {showDialCode && (
            <ByText
              fontWeight="light"
              size="sm"
              fontColor="secondary"
              className="opacity-70 mt-0.5"
            >
              {item.dial_code} • {item.code}
            </ByText>
          )}
        </View>

        {isSelected && (
          <View className="w-6 h-6 bg-primary-500 rounded-full items-center justify-center">
            <IconSymbol name="checkmark.circle.fill" size={16} color="white" />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  // Empty state component
  const renderEmptyState = () => (
    <View className="flex-1 items-center justify-center py-16">
      <ByText className="text-4xl mb-3">🌍</ByText>
      <ByText fontWeight="semibold" size="lg" className="mb-1">
        No countries found
      </ByText>
      <ByText fontColor="secondary" size="sm" className="text-center opacity-70">
        Try adjusting your search terms
      </ByText>
    </View>
  );

  // Handle scroll to index errors gracefully
  const handleScrollToIndexFailed = (info: { index: number }) => {
    const wait = new Promise(resolve => setTimeout(resolve, 500));

    wait.then(() => {
      flatListRef.current?.scrollToIndex({
        index: info.index,
        animated: true,
        viewPosition: 0.5,
      });
    });
  };

  return (
    <>
      <TouchableOpacity
        className={clsx(containerVariants({ variant, disabled }), className)}
        onPress={handleOpen}
        disabled={disabled}
        activeOpacity={0.7}
      >
        <View className="flex-row items-center flex-1">
          {value ? (
            <>
              <View className="w-8 h-8 rounded-full bg-neutral-100 items-center justify-center mr-3">
                <ByText className="text-lg">{value.flag}</ByText>
              </View>

              <View className="flex-1">
                <ByText fontWeight="regular" size="base" numberOfLines={1}>
                  {value.name}
                </ByText>

                {showDialCode && (
                  <ByText fontWeight="light" size="sm" fontColor="secondary" className="opacity-70">
                    {value.dial_code}
                  </ByText>
                )}
              </View>
            </>
          ) : (
            <ByText fontColor="secondary" className="opacity-60">
              {placeholder}
            </ByText>
          )}
        </View>

        {/* Chevron down icon */}
        <View className="ml-3">
          <ByText className="opacity-60 text-sm">▼</ByText>
        </View>
      </TouchableOpacity>

      {/* Country selection overlay */}
      <SlideUpOverlay visible={isOpen} onClose={handleClose} height={700}>
        {/* Enhanced Header */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between mb-4">
            <ByText fontWeight="bold" size="2xl">
              Select Country
            </ByText>

            <TouchableOpacity
              onPress={handleClose}
              className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center"
              activeOpacity={0.7}
            >
              <ByText className="opacity-60">✕</ByText>
            </TouchableOpacity>
          </View>

          {/* Enhanced Search input */}
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

          {/* Results counter with better styling */}
          <View className="mt-3 px-1">
            <ByText fontColor="secondary" size="sm" className="opacity-70">
              {filteredCountries.length === COUNTRIES.length
                ? `${COUNTRIES.length} countries`
                : `${filteredCountries.length} of ${COUNTRIES.length} countries`}
            </ByText>
          </View>
        </View>

        {/* Countries list with improved styling */}
        <FlatList
          ref={flatListRef}
          data={filteredCountries}
          keyExtractor={item => item.code}
          renderItem={renderCountryItem}
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
