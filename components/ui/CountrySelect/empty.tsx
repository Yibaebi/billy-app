import { View } from 'react-native';
import ByText from '../Text';

// CountrySelectEmptyState Component
export default function CountrySelectEmptyState() {
  return (
    <View className="flex-1 items-center justify-center py-16">
      <ByText className="text-4xl mb-3">🌍</ByText>

      <ByText fontWeight="semibold" size="lg" className="mb-1">
        No countries found
      </ByText>

      <ByText fontColor="secondary" size="sm" className="text-center opacity-70">
        Try adjusting your search terms
      </ByText>
    </View>
  );
}
