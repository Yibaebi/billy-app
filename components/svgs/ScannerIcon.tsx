import Svg, { Path } from 'react-native-svg';

export default function ByScannerIcon() {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M2 9V7C2 4 4 2 7 2H17C20 2 22 4 22 7V9"
        stroke="#4A4D46"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path
        d="M2 15V17C2 20 4 22 7 22H17C20 22 22 20 22 17V15"
        stroke="#4A4D46"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path
        d="M2 12H22"
        stroke="#4A4D46"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
