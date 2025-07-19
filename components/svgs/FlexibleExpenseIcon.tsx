import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function FlexibleExpenseIcon({ color = '#1F2614' }) {
  return (
    <Svg width="21" height="20" viewBox="0 0 21 20" fill="none">
      <Path
        d="M2.75 14.9833L4.87499 14.9916C5.63332 14.9916 6.34166 14.6166 6.75833 13.9916L12.0833 6.00832C12.5 5.38332 13.2083 4.99998 13.9667 5.00831L17.7583 5.02499"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path
        d="M16.083 16.6499L17.7497 14.9833"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path
        d="M7.65835 7.18323L6.75833 5.93323C6.33333 5.34156 5.64999 4.99157 4.92499 4.9999L2.75 5.00824"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path
        d="M11.0586 12.8167L12.0753 14.125C12.5003 14.675 13.1669 15 13.8669 15L17.7586 14.9833"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path
        d="M17.7497 5.01664L16.083 3.34998"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
