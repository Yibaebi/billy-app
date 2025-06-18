import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';

import { SlideUpOverlay } from '@/components/ui/Overlay';
import { getIsAndroid } from '@/utils/helpers';

import BySearchIcon from '@/components/svgs/SearchIcon';
import ByText from '@/components/ui/Text';
import ByInput from '@/components/ui/TextInput';
import COUNTRIES from '@/constants/Countries';

import { IconSymbol } from '../IconSymbol';
import CountrySelectItem from './countryItem';
import CountrySelectEmptyState from './empty';

// CVA variants for the country select container
const containerVariants = cva('border rounded-full p-2 px-4 flex-row items-center gap-3 bg-white', {
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
});

// Country type
export type Country = {
  name: string;
  flag: string;
  code: string;
  dial_code: string;
  currency: string;
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

// Constants for performance optimization
const ITEM_HEIGHT = 60;
const INITIAL_NUM_TO_RENDER = 15;
const MAX_TO_RENDER_PER_BATCH = 20;
const WINDOW_SIZE = 8;
const UPDATE_CELLS_BATCH_PERIOD = 16;

export default function CountrySelect({
  value,
  onSelect,
  disabled = false,
  variant = 'default',
  className = '',
  showDialCode = false,
  searchPlaceholder = 'Type a currency/country',
}: CountrySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const flatListRef = useRef<FlatList<Country>>(null);
  const scrollTimeoutRef = useRef<number | null>(null);

  // Filter countries based on search query with improved performance
  const filteredCountries = useMemo(() => {
    if (!searchQuery.trim()) return COUNTRIES;

    const query = searchQuery.toLowerCase();
    return COUNTRIES.filter(country => {
      // Early return for exact matches (most common case)
      if (country.code.toLowerCase() === query) return true;

      return (
        country.name.toLowerCase().includes(query) ||
        country.code.toLowerCase().includes(query) ||
        country.dial_code.includes(query)
      );
    });
  }, [searchQuery]);

  const selectedIndex = useMemo(
    () => filteredCountries.findIndex(country => country.code === value?.code),
    [filteredCountries, value]
  );

  // Optimized scroll to selected item
  const scrollToSelected = useCallback(() => {
    const filteredListIsEmpty = filteredCountries.length === 0;
    const noSelectedValue = selectedIndex === -1 || !value;
    const preventScroll = !isOpen || filteredListIsEmpty || noSelectedValue;

    // Prevent scroll if the list is empty or the selected value is not found
    if (preventScroll) return;

    // Clear any pending scroll operations
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

    // Scroll to selected item
    const scrollToIndex = () =>
      flatListRef.current?.scrollToIndex({
        index: selectedIndex,
        animated: false,
        viewPosition: 0.5,
      });

    // Use minimal delay for better performance
    scrollTimeoutRef.current = setTimeout(scrollToIndex, 80);
  }, [isOpen, value, filteredCountries.length, selectedIndex]);

  // Effect for scrolling to selected item
  useEffect(() => {
    scrollToSelected();

    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [scrollToSelected]);

  // Handle select country
  const handleSelect = (country: Country) => {
    onSelect?.(country);
    setIsOpen(false);
    setSearchQuery('');
  };

  // Handle close country select
  const handleClose = () => {
    setIsOpen(false);
    setSearchQuery('');
  };

  // Get item layout for the flat list
  const getItemLayout = (_: any, index: number) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  });

  return (
    <>
      <TouchableOpacity
        className={clsx(containerVariants({ variant, disabled }), className)}
        onPress={() => setIsOpen(true)}
        disabled={disabled}
        activeOpacity={0.7}
      >
        {value ? (
          <View className="flex-row gap-2 justify-center items-center h-full rounded-full">
            <ByText size="base" fontWeight="bold">
              {value.currency}
            </ByText>

            <ByText
              className={clsx(
                'w-6 h-6 min-w-6 min-h-6',
                getIsAndroid() ? 'text-2xl leading-none' : 'text-[24px]/[28px]'
              )}
            >
              {value.flag}
            </ByText>
          </View>
        ) : (
          <View className="justify-center items-center w-6 h-6 rounded-full bg-neutral-100"></View>
        )}
      </TouchableOpacity>

      <SlideUpOverlay visible={isOpen} onClose={handleClose} height={400}>
        <View className="h-[400px] p-6 bg-white rounded-[36px]">
          <View className="mb-6">
            <View className="flex-row justify-end items-center mb-4">
              <TouchableOpacity
                onPress={handleClose}
                className="flex justify-center items-center p-2 rounded-full bg-neutral-100"
                activeOpacity={0.7}
              >
                <IconSymbol name="xmark" size={14} color="black" />
              </TouchableOpacity>
            </View>

            <View className="relative">
              <ByInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder={searchPlaceholder}
                className="pl-12"
              />

              <View className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <BySearchIcon />
              </View>
            </View>

            <View className="px-1 mt-3">
              <ByText fontWeight="bold" fontColor="secondary" size="sm" className="opacity-70">
                {filteredCountries.length === COUNTRIES.length
                  ? `${COUNTRIES.length} Currencies`
                  : `${filteredCountries.length} of ${COUNTRIES.length} countries`}
              </ByText>
            </View>
          </View>

          {/* Optimized FlatList with performance props */}
          <FlatList
            ref={flatListRef}
            data={filteredCountries}
            keyExtractor={(item, index) => `${item.code}-${index}`}
            getItemLayout={getItemLayout}
            initialNumToRender={INITIAL_NUM_TO_RENDER}
            maxToRenderPerBatch={MAX_TO_RENDER_PER_BATCH}
            windowSize={WINDOW_SIZE}
            updateCellsBatchingPeriod={UPDATE_CELLS_BATCH_PERIOD}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={CountrySelectEmptyState}
            maintainVisibleContentPosition={{
              minIndexForVisible: 0,
              autoscrollToTopThreshold: 100,
            }}
            disableVirtualization={false}
            renderItem={({ item }) => (
              <CountrySelectItem
                item={item}
                value={value}
                handleSelect={handleSelect}
                showDialCode={showDialCode}
              />
            )}
          />
        </View>
      </SlideUpOverlay>
    </>
  );
}
