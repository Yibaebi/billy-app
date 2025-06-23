import { getIsAndroid, getStatusBarHeight } from '@/utils/helpers';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SafeAreaViewComponent({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaView
      className="w-full h-full bg-secondary-100"
      style={{ paddingTop: getIsAndroid() ? getStatusBarHeight() : 0 }}
    >
      {children}
    </SafeAreaView>
  );
}
