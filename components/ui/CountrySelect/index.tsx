import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';

import ByArrowDown from '@/components/svgs/ArrowDown';
import { SlideUpOverlay } from '@/components/ui/Overlay';
import ByText from '@/components/ui/Text';
import ByInput from '@/components/ui/TextInput';
import COUNTRIES from '@/constants/Countries';
import { IconSymbol } from '../IconSymbol';
import CountrySelectItem from './countryItem';
import CountrySelectEmptyState from './empty';

// CVA variants for the country select container
const containerVariants = cva('border rounded-full p-2 flex-row items-center gap-2', {
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
  searchPlaceholder = 'Search countries...',
}: CountrySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const flatListRef = useRef<FlatList>(null);
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
    scrollTimeoutRef.current = setTimeout(scrollToIndex, 50);
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
          <View className="w-6 h-6 rounded-full flex items-center justify-center overflow-hidden">
            <ByText className="w-full h-full text-2xl leading-none">{value.flag}</ByText>
          </View>
        ) : (
          <View className="w-6 h-6 rounded-full bg-neutral-100 items-center justify-center"></View>
        )}

        <ByArrowDown />
      </TouchableOpacity>

      <SlideUpOverlay visible={isOpen} onClose={handleClose} height={650}>
        <View className="max-h-[620px]">
          <View className="mb-6">
            <View className="flex-row items-center justify-between mb-4">
              <ByText fontWeight="bold" size="xl">
                Select Country
              </ByText>

              <TouchableOpacity
                onPress={handleClose}
                className="p-2 rounded-full bg-neutral-100 flex items-center justify-center"
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
                className="pl-12 "
              />

              <View className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <ByText className="opacity-50">🔍</ByText>
              </View>
            </View>

            <View className="mt-3 px-1">
              <ByText fontColor="secondary" size="sm" className="opacity-70">
                {filteredCountries.length === COUNTRIES.length
                  ? `${COUNTRIES.length} countries`
                  : `${filteredCountries.length} of ${COUNTRIES.length} countries`}
              </ByText>
            </View>
          </View>

          {/* Optimized FlatList with performance props */}
          <FlatList
            ref={flatListRef}
            data={filteredCountries}
            keyExtractor={item => item.code}
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
