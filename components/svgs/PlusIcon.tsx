import Svg, { Path, SvgProps } from 'react-native-svg';

export default function ByPlusIcon(props: SvgProps) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M12 5V19"
        stroke={props.stroke ?? 'currentColor'}
        strokeWidth="2"
        strokeLinecap="round"
      />

      <Path
        d="M5 12H19"
        stroke={props.stroke ?? 'currentColor'}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
}
