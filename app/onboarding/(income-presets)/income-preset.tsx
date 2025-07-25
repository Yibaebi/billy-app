import { router } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';

import clsx from 'clsx';
import React, { useMemo, useState } from 'react';

import { IconSymbol } from '@/components/ui/IconSymbol';
import { BlurOverlay } from '@/components/ui/Overlay';

import ByPlusIcon from '@/components/svgs/PlusIcon';
import ByButton from '@/components/ui/Button';
import ByCheckbox from '@/components/ui/Checkbox';
import ByStack from '@/components/ui/Stack';
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

  // Close new source input
  const handleCloseNewSource = () => setShowAddSource(false);

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
    setNewSource('');
    handleCloseNewSource();
  };

  // Toggle source
  const handleToggleSource = (id: string) =>
    setSources(currSource =>
      currSource.map(source =>
        source.id === id ? { ...source, checked: !source.checked } : source
      )
    );

  const newSourceAlreadyExists = useMemo(
    () => !!sources.find(source => source.label.toLowerCase() === newSource.toLowerCase()),
    [sources, newSource]
  );

  // Remove source
  const handleRemoveSource = (id: string) =>
    setSources(currSource => currSource.filter(source => source.id !== id));

  return (
    <>
      <ByStack
        direction="column"
        alignItems="center"
        justifyContent="center"
        className="gap-4 px-12 w-full h-full"
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
          className="gap-4 mb-4 w-full"
        >
          {sources.map(option => (
            <View key={option.id} className="flex relative w-full">
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
        <BlurOverlay visible={showAddSource} onClose={handleCloseNewSource}>
          <ByStack
            direction="column"
            className="bg-secondary-100 rounded-[36px] p-6 pt-[72px] w-full z-50"
          >
            {/* Close button */}
            <TouchableOpacity
              onPress={handleCloseNewSource}
              className="flex absolute top-6 right-6 justify-center items-center p-2 rounded-full bg-secondary-300"
              activeOpacity={0.7}
            >
              <IconSymbol name="xmark" size={14} color="black" />
            </TouchableOpacity>

            {/* Header Text */}
            <ByStack
              direction="column"
              alignItems="center"
              justifyContent="center"
              className="mb-6 rounded-[36px] w-full"
            >
              <ByText fontWeight="bold" className="mb-2 text-2xl">
                Add new source
              </ByText>

              <ByText textAlign="center" className="max-w-[300px]">
                Add an income source we missed — name it whatever makes sense to you.
              </ByText>
            </ByStack>

            {/* Input */}
            <ByInput
              containerClassName="mb-4 gap-2"
              className={clsx('w-full', newSourceAlreadyExists && '!border-error')}
              placeholder="Add new source"
              value={newSource}
              onChangeText={setNewSource}
              error={newSourceAlreadyExists}
              errorMessage={newSourceAlreadyExists ? "Oops — that one's already taken." : ''}
            />

            {/* Done button */}
            <ByButton
              variant="primary"
              title="Done"
              fullWidth
              onPress={addSource}
              disabled={newSourceAlreadyExists || newSource.length < 3}
            />
          </ByStack>
        </BlurOverlay>
      </ByStack>

      <ByStack
        direction="column"
        justifyContent="center"
        alignItems="center"
        gap={16}
        className={clsx('absolute bottom-0 px-12 pt-6 pb-12 w-full bg-secondary-100')}
      >
        <ByButton
          variant="primary-light"
          title="Add Source"
          fullWidth
          rightIcon={<ByPlusIcon width={20} height={20} />}
          disabled={sources.length === 5}
          onPress={handleAddSource}
        />

        <ByButton
          variant="primary"
          title="Next"
          fullWidth
          onPress={() => router.push(`/onboarding/track-interest`)}
        />
      </ByStack>
    </>
  );
}
