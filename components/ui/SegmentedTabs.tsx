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
}

export default function SegmentedTabs<T extends SegmentedTabItemProps>({
  tabs,
  selectedId,
  onChange,
  className,
}: SegmentedTabsProps<T>) {
  const handlePress = (id: T['id']) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    onChange(id);
  };

  return (
    <ScrollView horizontal className={clsx('p-1 w-full bg-white rounded-2xl h-[56px]', className)}>
      <ByStack direction="row" className="overflow-hidden h-full rounded-xl bg-neutral-100/50">
        {tabs.map(tab => {
          const isSelected = tab.id === selectedId;

          return (
            <Pressable key={tab.id} className={clsx('flex-1')} onPress={() => handlePress(tab.id)}>
              <ByStack
                direction="row"
                alignItems="center"
                justifyContent="center"
                className={clsx(
                  'h-full rounded-xl px-3 min-w-[100px]',
                  isSelected && 'bg-primary-800'
                )}
              >
                {tab.icon}

                <ByText
                  className={clsx(
                    'ml-2 text-sm font-medium',
                    isSelected ? 'text-secondary-800' : 'text-secondary-600'
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
