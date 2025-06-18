import Svg, { Circle, Path } from 'react-native-svg';

export default function BySearchIcon() {
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <Circle cx="8.25" cy="8.25" r="7.5" stroke="#ACB3A3" strokeWidth="1.5" />
      <Path
        d="M13.75 13.75L19.0533 19.0533"
        stroke="#ACB3A3"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
