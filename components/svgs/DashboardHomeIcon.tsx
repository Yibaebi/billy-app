import { Rect, Svg } from 'react-native-svg';

export default function ByDashboardHomeIcon({
  size = 20,
  color = '#1F2614',
}: {
  size?: number;
  color?: string;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Rect
        x="0.75"
        y="0.75"
        width="7.73077"
        height="7.73077"
        rx="1.75"
        stroke={color}
        strokeWidth="1.5"
      />

      <Rect
        x="0.75"
        y="11.5192"
        width="7.73077"
        height="7.73077"
        rx="1.75"
        stroke={color}
        strokeWidth="1.5"
      />

      <Rect
        x="11.5195"
        y="0.75"
        width="7.73077"
        height="7.73077"
        rx="1.75"
        stroke={color}
        strokeWidth="1.5"
      />

      <Rect
        x="11.5195"
        y="11.5192"
        width="7.73077"
        height="7.73077"
        rx="1.75"
        stroke={color}
        strokeWidth="1.5"
      />
    </Svg>
  );
}
