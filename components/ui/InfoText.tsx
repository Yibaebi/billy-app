import clsx from 'clsx';

import { IconSymbol } from '@/components/ui/IconSymbol';
import ByStack from '@/components/ui/Stack';
import ByText from '@/components/ui/Text';
import Colors from '@/constants/Colors';

interface ByInfoTextProps {
  text: string;
  className?: string;
}

export default function ByInfoText({ text, className }: ByInfoTextProps) {
  return (
    <ByStack
      direction="row"
      alignItems="center"
      justifyContent="center"
      className={clsx('gap-2 w-full', className)}
    >
      <IconSymbol name="info.circle" size={16} color={Colors.textSecondary} />

      <ByText size="sm" textAlign="center" className="text-neutral-600">
        {text}
      </ByText>
    </ByStack>
  );
}
