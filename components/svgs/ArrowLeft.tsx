import Colors from '@/constants/Colors';
import Svg, { Path } from 'react-native-svg';

interface ArrowLeftProps {
  width?: number;
  height?: number;
  color?: string;
}

export default function ArrowLeft({
  width = 24,
  height = 24,
  color = Colors.textSecondary,
}: ArrowLeftProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M1.5 12H18"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path
        d="M1.5 12L7.86396 18.364"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path
        d="M1.5 12L7.86396 5.63604"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
