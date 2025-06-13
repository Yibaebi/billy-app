import ByButton from '@/components/ui/Button';
import BySelectableTag from '@/components/ui/SelectableTag';
import ByStack from '@/components/ui/Stack';
import ByText from '@/components/ui/Text';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';

interface ExpenseCategory {
  id: string;
  name: string;
  icon: string;
  subcategories: ExpenseSubcategory[];
}

interface ExpenseSubcategory {
  id: string;
  name: string;
  isSelected: boolean;
}

// The actual data structure:
const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  {
    id: 'living',
    name: 'Living',
    icon: '🏠',
    subcategories: [
      { id: 'rent', name: 'Rent', isSelected: false },
      { id: 'utilities', name: 'Utilities', isSelected: true },
      { id: 'internet', name: 'Internet', isSelected: false },
    ],
  },
  {
    id: 'food',
    name: 'Food',
    icon: '🍽️',
    subcategories: [
      { id: 'groceries', name: 'Groceries', isSelected: false },
      { id: 'dinning-out', name: 'Dinning out', isSelected: false },
    ],
  },
  {
    id: 'transport',
    name: 'Transport',
    icon: '🚖',
    subcategories: [
      { id: 'fuel', name: 'Fuel', isSelected: false },
      { id: 'ride-hailing', name: 'Ride-hailing', isSelected: false },
      { id: 'public-transit', name: 'Public Transit', isSelected: false },
      { id: 'maintenance', name: 'Maintenance', isSelected: false },
      { id: 'car-rental', name: 'Car Rental', isSelected: false },
    ],
  },
  {
    id: 'health',
    name: 'Health',
    icon: '🩺',
    subcategories: [
      { id: 'shopping', name: 'Shopping', isSelected: false },
      { id: 'self-care', name: 'Self care', isSelected: false },
      { id: 'fitness', name: 'Fitness', isSelected: false },
    ],
  },
  {
    id: 'work-bills',
    name: 'Work and Bills',
    icon: '💼',
    subcategories: [
      { id: 'tools', name: 'Tools', isSelected: false },
      { id: 'workspace', name: 'Workspace', isSelected: false },
      { id: 'data-airtime', name: 'Data/Airtime', isSelected: false },
    ],
  },
  {
    id: 'financial-giving',
    name: 'Financial & Giving',
    icon: '💳',
    subcategories: [
      { id: 'savings', name: 'Savings', isSelected: false },
      { id: 'loans', name: 'Loans', isSelected: false },
      { id: 'gifts', name: 'Gifts', isSelected: false },
      { id: 'tithe', name: 'Tithe', isSelected: false },
    ],
  },
];

export default function OnboardingTrackInterest() {
  const [categories, setCategories] = useState(EXPENSE_CATEGORIES);

  // Toggle source
  const handleToggleCategory = (categoryId: string, subCategoryId: string) =>
    setCategories(currCategories =>
      currCategories.map(category =>
        category.id === categoryId
          ? {
              ...category,
              subcategories: category.subcategories.map(subCategory =>
                subCategory.id === subCategoryId
                  ? { ...subCategory, isSelected: !subCategory.isSelected }
                  : subCategory
              ),
            }
          : category
      )
    );

  return (
    <ByStack direction="column" className="w-full h-full pt-[50px] px-12 gap-9">
      <ByStack justifyContent="space-between" alignItems="center" className="w-full gap-2">
        <ByText size="2xl" fontWeight="bold">
          Add Expenses
        </ByText>

        <ByButton
          size="sm"
          fontColor="primary"
          variant="primary-outline"
          title="Skip"
          className="w-24"
        />
      </ByStack>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-10">
        <ByStack direction="column" className="w-full gap-6">
          {categories.map(category => (
            <ByStack
              key={category.id}
              direction="column"
              justifyContent="center"
              className="w-full gap-3"
            >
              <ByStack alignItems="center" className="gap-2">
                <ByText>{category.icon}</ByText>

                <ByText size="lg" fontWeight="bold">
                  {category.name}
                </ByText>
              </ByStack>

              <ByStack alignItems="center" className="flex-wrap gap-2">
                {category.subcategories.map(subcategory => (
                  <BySelectableTag
                    key={subcategory.id}
                    label={subcategory.name}
                    showCheckmark={subcategory.isSelected}
                    selected={subcategory.isSelected}
                    onPress={() => handleToggleCategory(category.id, subcategory.id)}
                  />
                ))}
              </ByStack>
            </ByStack>
          ))}
        </ByStack>
      </ScrollView>
    </ByStack>
  );
}
