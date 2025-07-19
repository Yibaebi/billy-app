import { useState } from 'react';

import SegmentedTabs from '@/components/ui/SegmentedTabs';
import ByStack from '@/components/ui/Stack';
import ByText from '@/components/ui/Text';

interface ExpenseAddProps {
  totalAmount: number;
  budgetAmount: number;
}

type ExpenseTab = 'fixed-expense' | 'variable-expense' | 'add-expense';

export default function ExpenseAdd({ totalAmount, budgetAmount }: ExpenseAddProps) {
  const [currTab, setCurrTab] = useState<ExpenseTab>('fixed-expense');

  const tabs = [
    {
      id: 'fixed-expense',
      label: 'Fixed Expense',
    },
    {
      id: 'variable-expense',
      label: 'Variable Expense',
    },
    {
      id: 'add-expense',
      label: 'Add Expense',
    },
  ];

  return (
    <ByStack direction="column" className="w-full">
      <ByStack
        direction="column"
        className="p-2 px-3 my-4 w-full rounded-xl border bg-primary-100 border-primary-200"
      >
        <ByText className="text-primary-600 max-w-[250px]">
          You have <ByText fontWeight="bold">${totalAmount - budgetAmount}</ByText> out of{' '}
          <ByText fontWeight="bold">${totalAmount}</ByText> to allocate to your expenses
        </ByText>
      </ByStack>

      <SegmentedTabs
        tabs={tabs}
        selectedId={currTab}
        onChange={id => setCurrTab(id as ExpenseTab)}
      />
    </ByStack>
  );
}
