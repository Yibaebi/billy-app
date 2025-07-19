import ByButton from '@/components/ui/Button';
import ByInfoText from '@/components/ui/InfoText';
import PercentageSlider from '@/components/ui/PercentageSlider';
import ByStack from '@/components/ui/Stack';
import ByText from '@/components/ui/Text';

interface IncomeAllocationProps {
  budgetAmount: number;
  totalAmount: number;
  setBudgetAmount: (value: number) => void;
}

export default function IncomeAllocation({
  budgetAmount,
  totalAmount,
  setBudgetAmount,
}: IncomeAllocationProps) {
  return (
    <ByStack direction="column" className="w-full">
      <ByText size="sm" className="mt-4 mb-3">
        Budget this much of your income
      </ByText>

      <PercentageSlider value={budgetAmount} maxValue={totalAmount} onChange={setBudgetAmount} />

      <ByInfoText text="Recommended: 50-60% of income." className="my-6" />

      <ByButton
        variant="text"
        fullWidth
        title="Reset to default"
        className="mb-4"
        disabled={budgetAmount === totalAmount * 0.5}
        onPress={() => setBudgetAmount(totalAmount * 0.5)}
      />
    </ByStack>
  );
}
