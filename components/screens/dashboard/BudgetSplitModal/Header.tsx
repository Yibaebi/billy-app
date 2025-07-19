import ByStack from '@/components/ui/Stack';
import ByText from '@/components/ui/Text';
import React from 'react';

interface BudgetSplitModalHeaderProps {
  totalAmount: number;
  usedPercentage: number;
  budgetAmount: number;
}

export default function BudgetSplitModalHeader({
  totalAmount = 0,
  usedPercentage = 0,
  budgetAmount = 0,
}: BudgetSplitModalHeaderProps) {
  return (
    <>
      <ByText textAlign="center" size="2xl" fontWeight="bold" className="mb-7 w-full">
        Split Monthly Budget
      </ByText>

      <ByStack direction="column" className="gap-9 p-4 w-full rounded-xl bg-secondary-200">
        <ByStack direction="row" justifyContent="space-between" className="w-full">
          <ByStack direction="column" className="gap-2">
            <ByText size="sm">Assigned budget</ByText>

            <ByText size="3xl" fontWeight="bold">
              ${totalAmount}
            </ByText>
          </ByStack>

          <ByText size="sm" className="text-primary-600">
            {usedPercentage}% assigned
          </ByText>
        </ByStack>

        <ByStack direction="row" justifyContent="space-between" className="w-full">
          <ByText>Unassigned income</ByText>
          <ByText fontWeight="bold">${totalAmount - budgetAmount}</ByText>
        </ByStack>
      </ByStack>
    </>
  );
}
