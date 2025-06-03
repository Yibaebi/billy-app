import { getIsAndroid, getStatusBarHeight } from '@/utils/helpers';
import { StyleSheet } from 'react-native';
import { SafeAreaView as RNCSafeAreaView } from 'react-native-safe-area-context';

export default function SafeAreaViewComponent({ children }: { children: React.ReactNode }) {
  return <RNCSafeAreaView style={SafeAreaViewStyles.safeArea}>{children}</RNCSafeAreaView>;
}

const SafeAreaViewStyles = StyleSheet.create({
  safeArea: { paddingTop: getIsAndroid() ? getStatusBarHeight() : 0 },
});
