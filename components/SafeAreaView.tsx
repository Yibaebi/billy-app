import { getIsAndroid, getStatusBarHeight } from '@/utils/helpers';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SafeAreaViewComponent({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaView
      className="bg-neutral-100 h-full w-full"
      style={{ paddingTop: getIsAndroid() ? getStatusBarHeight() : 0 }}
    >
      {children}
    </SafeAreaView>
  );
}
