import clsx from 'clsx';
import React, { useMemo, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import ByStack from '@/components/ui/Stack';

import ByPlusIcon from '@/components/svgs/PlusIcon';
import ByButton from '@/components/ui/Button';
import ByCheckbox from '@/components/ui/Checkbox';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { SlideUpOverlay } from '@/components/ui/Overlay';
import ByText from '@/components/ui/Text';
import ByInput from '@/components/ui/TextInput';
import Colors from '@/constants/Colors';

// Default Options
const DEFAULT_OPTIONS = [
  { id: '1', label: 'Salary', isDefault: false, checked: false },
  { id: '2', label: 'Freelance', isDefault: false, checked: false },
];

export default function OnboardingIncomePreset() {
  const [showAddSource, setShowAddSource] = useState(false);
  const [newSource, setNewSource] = useState('');
  const [sources, setSources] = useState(DEFAULT_OPTIONS);

  // Show add source input
  const handleAddSource = () => setShowAddSource(true);

  // Add a new source
  const addSource = () => {
    if (!newSource) return;

    // Check if source already exists
    const existingSource = sources.find(
      source => source.label.toLowerCase() === newSource.toLowerCase()
    );

    if (existingSource) return;

    // New source data
    const newSourceData = {
      id: newSource.split(' ').join('-').toLowerCase(),
      label: newSource,
      isDefault: false,
      checked: true,
    };

    setSources(currSource => [newSourceData, ...currSource]);
    setShowAddSource(false);
    setNewSource('');
  };

  // Toggle source
  const handleToggleSource = (id: string) =>
    setSources(currSource =>
      currSource.map(source =>
        source.id === id ? { ...source, checked: !source.checked } : source
      )
    );

  const checkIfNewSourceExists = useMemo(
    () => sources.find(source => source.label.toLowerCase() === newSource.toLowerCase()),
    [sources, newSource]
  );

  // Remove source
  const handleRemoveSource = (id: string) =>
    setSources(currSource => currSource.filter(source => source.id !== id));

  return (
    <ByStack
      direction="column"
      alignItems="center"
      justifyContent="center"
      className="w-full h-full gap-4 px-12"
    >
      {/* Title and description */}
      <ByStack
        direction="column"
        alignItems="center"
        justifyContent="center"
        className="gap-1 mb-4"
      >
        <ByText fontWeight="bold" className="text-2xl">
          How do you earn?
        </ByText>

        <ByText className="text-center max-w-[250px]">
          List your sources of income. You can add a max of{' '}
          <ByText fontWeight="bold" fontStyle="italic">
            five
          </ByText>{' '}
          sources.
        </ByText>
      </ByStack>

      {/* Sources list */}
      <ByStack
        direction="column"
        alignItems="center"
        justifyContent="center"
        className="w-full gap-4 mb-4"
      >
        {sources.map(option => (
          <View key={option.id} className="relative flex w-full">
            <ByCheckbox
              label={option.label}
              checked={option.checked}
              onToggle={() => handleToggleSource(option.id)}
            />

            {!option.isDefault && sources.length > 1 && (
              <TouchableOpacity
                onPress={() => handleRemoveSource(option.id)}
                className="absolute -left-[10px] -top-[10px] z-10"
              >
                <IconSymbol name="xmark.circle.fill" size={20} color={Colors.error} />
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ByStack>

      {/* Add new source overlay */}
      <SlideUpOverlay visible={showAddSource} height={320} onClose={() => setShowAddSource(false)}>
        <ByStack direction="column" alignItems="center" justifyContent="center" className="mb-4 ">
          <ByText fontWeight="bold" className="text-2xl mb-0.5">
            Add new source
          </ByText>

          <ByText textAlign="center">
            Source name must be at least 3 characters minimum and a maximum of 20 characters.
          </ByText>
        </ByStack>

        <ByStack
          direction="column"
          alignItems="center"
          justifyContent="center"
          className="w-full gap-4 p-5 border-2 border-dotted rounded-lg bg-secondary-200 border-secondary-400"
        >
          <ByInput
            className={clsx('w-full !bg-white', !!checkIfNewSourceExists && '!border-red-500')}
            placeholder="Add new source"
            value={newSource}
            onChangeText={setNewSource}
          />

          <ByStack alignItems="center" justifyContent="flex-end" className="w-full gap-4">
            <ByButton
              variant="neutral"
              title="Close"
              className="border border-neutral-400"
              onPress={() => setShowAddSource(false)}
            />

            <ByButton
              variant="primary"
              title="Add"
              onPress={addSource}
              disabled={!!checkIfNewSourceExists || newSource.length < 3}
            />
          </ByStack>
        </ByStack>
      </SlideUpOverlay>

      <ByButton
        variant="neutral"
        title="Add Source"
        className="w-full border-2 border-dotted border-neutral-400"
        rightIcon={<ByPlusIcon />}
        disabled={sources.length === 5}
        onPress={handleAddSource}
      />
    </ByStack>
  );
}
