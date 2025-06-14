import Svg, { Path } from 'react-native-svg';

export default function ArrowLeft() {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M1.5 12H18"
        stroke="#51526C"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path
        d="M1.5 12L7.86396 18.364"
        stroke="#51526C"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path
        d="M1.5 12L7.86396 5.63604"
        stroke="#51526C"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
