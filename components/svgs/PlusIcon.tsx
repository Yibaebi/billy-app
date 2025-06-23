import Svg, { Path, SvgProps } from 'react-native-svg';

export default function ByPlusIcon(props: SvgProps) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M6 12H18"
        stroke={props.stroke ?? 'currentColor'}
        strokeWidth="2"
        strokeLinecap="round"
      />

      <Path
        d="M12 18V6"
        stroke={props.stroke ?? 'currentColor'}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
}
