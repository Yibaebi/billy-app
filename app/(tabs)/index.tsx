import SafeAreaViewComponent from '@/components/SafeAreaView';
import ByButton from '@/components/ui/Button';
import ByStack from '@/components/ui/Stack';
import ByTextInput from '@/components/ui/TextInput';
import { View } from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaViewComponent>
      <View className="bg-white w-full flex justify-center h-full px-6">
        <ByStack
          justifyContent="center"
          alignItems="flex-start"
          className="flex-1 gap-4 w-full flex-grow pt-10"
        >
          <ByTextInput placeholder="Your course goal" className="w-8/12" />

          <ByButton variant="primary" title="Add Goal" />
        </ByStack>
      </View>
    </SafeAreaViewComponent>
  );
}
