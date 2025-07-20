import clsx from 'clsx';
import React from 'react';
import { LayoutAnimation, Pressable, ScrollView } from 'react-native';

import ByStack from './Stack';
import ByText from './Text';

interface SegmentedTabItemProps {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface SegmentedTabsProps<T extends SegmentedTabItemProps> {
  tabs: T[];
  selectedId: T['id'];
  onChange: (id: T['id']) => void;
  className?: string;
  itemClassName?: string;
}

export default function SegmentedTabs<T extends SegmentedTabItemProps>({
  tabs,
  selectedId,
  onChange,
  className,
  itemClassName,
}: SegmentedTabsProps<T>) {
  const handlePress = (id: T['id']) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    onChange(id);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className={clsx('bg-white h-[56px]')}
    >
      <ByStack direction="row" className={className}>
        {tabs.map((tab, index) => {
          const isSelected = tab.id === selectedId;

          return (
            <Pressable
              key={tab.id}
              className={clsx('flex-shrink-0', itemClassName)}
              onPress={() => handlePress(tab.id)}
            >
              <ByStack
                direction="row"
                alignItems="center"
                justifyContent="center"
                className={clsx(
                  'px-8 py-3.5 border-b-4',
                  isSelected ? 'border-b-secondary-800' : 'border-b-secondary-400'
                )}
              >
                {tab.icon}

                <ByText
                  className={clsx(
                    'text-sm font-medium whitespace-nowrap',
                    tab.icon && 'ml-2',
                    !isSelected && 'text-secondary-400'
                  )}
                >
                  {tab.label}
                </ByText>
              </ByStack>
            </Pressable>
          );
        })}
      </ByStack>
    </ScrollView>
  );
}
