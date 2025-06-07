import clsx from 'clsx';
import { TouchableOpacity, View } from 'react-native';

import { Country } from '.';
import { IconSymbol } from '../IconSymbol';
import ByText from '../Text';

// CountrySelectItemProps
interface CountrySelectItemProps {
  item: Country;
  value: Country | null;
  handleSelect: (country: Country) => void;
  showDialCode: boolean;
}

// CountrySelectItem Component
export default function CountrySelectItem({
  item,
  value,
  handleSelect,
  showDialCode,
}: CountrySelectItemProps) {
  const isSelected = value?.code === item.code;

  return (
    <TouchableOpacity
      onPress={() => handleSelect(item)}
      activeOpacity={0.6}
      className={clsx(
        'flex-row items-center px-4 py-3 border-b border-neutral-100',
        isSelected && 'bg-primary-50'
      )}
    >
      <View className="w-10 h-10 rounded-full bg-neutral-100 items-center justify-center mr-3">
        <ByText className="text-xl">{item.flag}</ByText>
      </View>

      <View className="flex-1 mr-3">
        <ByText
          fontWeight={isSelected ? 'semibold' : 'regular'}
          size="base"
          numberOfLines={1}
          className={isSelected ? 'text-primary-600' : ''}
        >
          {item.name}
        </ByText>

        <ByText fontWeight="light" size="sm" fontColor="secondary" className="opacity-70 mt-0.5">
          {item.dial_code} • {item.code}
        </ByText>
      </View>

      {isSelected && (
        <View className="w-6 h-6 bg-primary-500 rounded-full items-center justify-center">
          <IconSymbol name="checkmark.circle.fill" size={16} color="white" />
        </View>
      )}
    </TouchableOpacity>
  );
}
