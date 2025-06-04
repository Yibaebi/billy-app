import clsx from 'clsx';
import React from 'react';
import { Text as RNText, TextProps } from 'react-native';

export interface ByTextProps extends TextProps {
  children: React.ReactNode;
  className?: string;
  fontWeight?: 'regular' | 'light' | 'semibold' | 'bold' | 'extrabold' | 'black';
  fontStyle?: 'normal' | 'italic';
  fontColor?: 'primary' | 'secondary' | 'inherit';
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
}

const getFontWeightClass = (weight: ByTextProps['fontWeight'], isItalic: boolean) => {
  switch (weight) {
    case 'light':
      return isItalic ? 'font-nunito-light-italic' : 'font-nunito-light';
    case 'regular':
      return isItalic ? 'font-nunito-light-italic' : 'font-nunito-light';
    case 'semibold':
      return isItalic ? 'font-nunito-semibold-italic' : 'font-nunito-semibold';
    case 'bold':
      return isItalic ? 'font-nunito-bold-italic' : 'font-nunito-bold';
    case 'extrabold':
      return isItalic ? 'font-nunito-extrabold-italic' : 'font-nunito-extrabold';
    case 'black':
      return isItalic ? 'font-nunito-black-italic' : 'font-nunito-black';
    default:
      return isItalic ? 'font-nunito-light-italic' : 'font-nunito-light';
  }
};

const getFontColorClass = (color: ByTextProps['fontColor']) => {
  switch (color) {
    case 'primary':
      return 'text-primary-500';
    case 'inherit':
      return 'text-inherit';
    default:
      return 'text-neutral-base';
  }
};

const getTextAlignClass = (align: ByTextProps['textAlign']) => {
  switch (align) {
    case 'left':
      return 'text-left';
    case 'center':
      return 'text-center';
    case 'right':
      return 'text-right';
    case 'justify':
      return 'text-justify';
    default:
      return '';
  }
};

const getSizeClass = (size: ByTextProps['size']) => {
  switch (size) {
    case 'xs':
      return 'text-xs';
    case 'sm':
      return 'text-sm';
    case 'base':
      return 'text-base';
    case 'lg':
      return 'text-lg';
    case 'xl':
      return 'text-xl';
    case '2xl':
      return 'text-2xl';
    case '3xl':
      return 'text-3xl';
    case '4xl':
      return 'text-4xl';
    default:
      return 'text-base';
  }
};

export default function ByText({
  children,
  className = '',
  fontWeight = 'regular',
  fontStyle = 'normal',
  fontColor,
  textAlign,
  size,
  ...props
}: ByTextProps) {
  const isItalic = fontStyle === 'italic';

  const textStyles = clsx(
    [
      getFontWeightClass(fontWeight, isItalic),
      fontColor && getFontColorClass(fontColor),
      size && getSizeClass(size),
      textAlign && getTextAlignClass(textAlign),
    ],
    className
  );

  return (
    <RNText className={textStyles} {...props}>
      {children}
    </RNText>
  );
}
