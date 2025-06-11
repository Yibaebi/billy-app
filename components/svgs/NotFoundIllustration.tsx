import Svg, { Circle, G, Path, SvgProps } from 'react-native-svg';

export default function NotFoundIllustration(props: SvgProps) {
  return (
    <Svg width="200" height="200" viewBox="0 0 200 200" fill="none" {...props}>
      <G>
        {/* Background circle */}
        <Circle cx="100" cy="100" r="95" fill="#ECFCD1" stroke="#9EF01A" strokeWidth="2" />

        {/* Sad face base */}
        <Circle cx="100" cy="100" r="60" fill="#F4F5F2" stroke="#D7D9D2" strokeWidth="2" />

        {/* Left eye (X) */}
        <G>
          <Path
            d="M75 85 L85 95 M85 85 L75 95"
            stroke="#7B8074"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </G>

        {/* Right eye (X) */}
        <G>
          <Path
            d="M115 85 L125 95 M125 85 L115 95"
            stroke="#7B8074"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </G>

        {/* Sad mouth */}
        <Path
          d="M85 120 Q100 110 115 120"
          stroke="#7B8074"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />

        {/* 404 Text */}
        <G>
          {/* First 4 */}
          <Path
            d="M35 35 L35 55 M35 45 L45 45 M45 35 L45 55"
            stroke="#9EF01A"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* 0 */}
          <Circle cx="70" cy="45" r="12" fill="none" stroke="#9EF01A" strokeWidth="4" />

          {/* Second 4 */}
          <Path
            d="M95 35 L95 55 M95 45 L105 45 M105 35 L105 55"
            stroke="#9EF01A"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </G>

        {/* Floating question marks */}
        <G opacity="0.6">
          <Path
            d="M150 50 Q155 45 160 50 Q155 55 155 60 M155 65 L155 67"
            stroke="#ACB3A3"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />

          <Path
            d="M40 150 Q45 145 50 150 Q45 155 45 160 M45 165 L45 167"
            stroke="#ACB3A3"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </G>

        {/* Broken pieces around the character */}
        <G opacity="0.8">
          <Path d="M30 80 L35 75 L40 80 L35 85 Z" fill="#CFF78C" />

          <Path d="M165 120 L170 115 L175 120 L170 125 Z" fill="#CFF78C" />

          <Circle cx="170" cy="70" r="4" fill="#BBF55F" />

          <Circle cx="25" cy="120" r="3" fill="#BBF55F" />
        </G>
      </G>
    </Svg>
  );
}
