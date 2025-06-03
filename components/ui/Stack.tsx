import { View, ViewProps, ViewStyle } from 'react-native';

interface ByStackProps extends ViewProps {
  gap?: ViewStyle['gap'];
  direction?: 'row' | 'column';
  justifyContent?: ViewStyle['justifyContent'];
  alignItems?: ViewStyle['alignItems'];
  wrap?: ViewStyle['flexWrap'];
  className?: string;
}

export default function ByStack({
  children,
  gap = 0,
  direction = 'row',
  justifyContent = 'flex-start',
  alignItems = 'flex-start',
  ...props
}: ByStackProps) {
  return (
    <View {...props} style={{ gap, flexDirection: direction, justifyContent, alignItems }}>
      {children}
    </View>
  );
}
