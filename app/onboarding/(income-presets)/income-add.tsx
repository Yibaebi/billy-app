import React, { useState } from 'react';
import { ScrollView } from 'react-native';

import CountrySelect, { Country } from '@/components/ui/CountrySelect/index';
import BySelect from '@/components/ui/Select';
import ByStack from '@/components/ui/Stack';
import ByText from '@/components/ui/Text';
import ByTextInput from '@/components/ui/TextInput';

// Types
type IncomeGroup = {
  id: string;
  label: string;
  amount: string;
  frequency: 'monthly' | 'yearly' | 'one-time' | null;
};

// Default income options
const DEFAULT_OPTIONS = ['Salary', 'Freelance', 'Investments'].map(label => ({
  id: `${label}-${Math.random()}`,
  label,
  amount: '',
  frequency: null,
}));

// Frequency options
const FREQUENCY_OPTIONS = [
  { label: 'Monthly', value: 'monthly' as const },
  { label: 'Yearly', value: 'yearly' as const },
  { label: 'One-time', value: 'one-time' as const },
];

export default function OnboardingIncomeAdd() {
  const [incomeGroups, setIncomeGroups] = useState<IncomeGroup[]>(DEFAULT_OPTIONS);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  // Toggle source
  const handleChangeIncome = (income: IncomeGroup) =>
    setIncomeGroups(currIncomeGroups =>
      currIncomeGroups.map(incomeGroup =>
        incomeGroup.id === income.id
          ? { ...incomeGroup, amount: income.amount, frequency: income.frequency }
          : incomeGroup
      )
    );

  return (
    <ByStack direction="column" className="w-full h-full gap-4 pt-[100px] px-12">
      {/* Title and description */}
      <ByStack direction="column" alignItems="flex-start" className="gap-3 mb-4">
        <ByStack alignItems="center" className="gap-2">
          <ByText textAlign="center" fontWeight="bold" size="2xl">
            Input Income
          </ByText>

          <CountrySelect
            value={selectedCountry}
            onSelect={setSelectedCountry}
            placeholder="Select country"
          />
        </ByStack>

        <ByText className="max-w-[300px]">
          Add an amount for each of the following categories.
        </ByText>
      </ByStack>

      {/* Sources list */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <ByStack direction="column" className="w-full gap-4">
          {incomeGroups.map(option => {
            const frequency = option.frequency
              ? FREQUENCY_OPTIONS.find(f => f.value === option.frequency)
              : null;

            return (
              <ByStack key={option.id} direction="column" className="w-full">
                <ByText fontWeight="bold" fontColor="secondary" size="xl" className="mb-3">
                  {option.label}
                </ByText>

                <ByTextInput
                  keyboardType="numeric"
                  placeholder={`Enter amount for ${option.label}`}
                  value={String(option.amount)}
                  onChangeText={text => handleChangeIncome({ ...option, amount: text })}
                  className="w-full mb-2"
                />

                <BySelect
                  options={FREQUENCY_OPTIONS}
                  value={frequency}
                  onSelect={value => handleChangeIncome({ ...option, frequency: value.value })}
                  placeholder="Frequency"
                />
              </ByStack>
            );
          })}
        </ByStack>
      </ScrollView>
    </ByStack>
  );
}
