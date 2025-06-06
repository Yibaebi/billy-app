import Svg, { Path } from 'react-native-svg';

export default function ByArrowDown({ color = '#1F2614' }: { color?: string }) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M19.9201 8.95001L13.4001 15.47C12.6301 16.24 11.3701 16.24 10.6001 15.47L4.08008 8.95001"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
