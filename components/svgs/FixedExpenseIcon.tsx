import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function FixedExpenseIcon({ color = '#1F2614' }) {
  return (
    <Svg width="21" height="20" viewBox="0 0 21 20" fill="none">
      <Path
        d="M10.2503 12.0833C11.4009 12.0833 12.3337 11.1506 12.3337 9.99996C12.3337 8.84937 11.4009 7.91663 10.2503 7.91663C9.09973 7.91663 8.16699 8.84937 8.16699 9.99996C8.16699 11.1506 9.09973 12.0833 10.2503 12.0833Z"
        stroke={color}
        strokeWidth="1.25"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path
        d="M15.667 7.91663V12.0833"
        stroke={color}
        strokeWidth="1.25"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.74967 15C7.74967 15.625 7.57469 16.2166 7.26635 16.7166C6.69135 17.6833 5.63301 18.3333 4.41634 18.3333C3.19967 18.3333 2.14133 17.6833 1.56633 16.7166C1.258 16.2166 1.08301 15.625 1.08301 15C1.08301 13.1583 2.57467 11.6666 4.41634 11.6666C6.25801 11.6666 7.74967 13.1583 7.74967 15Z"
        stroke={color}
        strokeWidth="1.25"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3.11816 14.9996L3.94316 15.8246L5.71816 14.183"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path
        d="M1.91699 12.75V7.50004C1.91699 4.58337 3.58366 3.33337 6.08366 3.33337H14.417C16.917 3.33337 18.5837 4.58337 18.5837 7.50004V12.5C18.5837 15.4167 16.917 16.6667 14.417 16.6667H7.33366"
        stroke={color}
        strokeWidth="1.25"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
