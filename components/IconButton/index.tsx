import React from 'react';

import classNames from 'classnames';

type Size = 'xs' | 'sm' | 'md' | 'lg';

type Variant = 'primary' | 'secondary' | 'tertiary' | 'quaternary';

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: Size;
  variant?: Variant;
  icon?: React.ReactNode;
  rounded?: boolean;
  disabled?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({
  size = 'md',
  variant = 'primary',
  icon,
  rounded = false,
  ...props
}) => {
  const wrapperStyles = {
    sizeStyles: {
      xs: 'w-6 h-6',
      sm: 'w-8 h-8',
      md: 'w-10 h-10',
      lg: 'w-12 h-12',
    }[size],
    variantStyles: {
      primary: `
          bg-primary
            hover:bg-primary-onHover
            active:bg-primary-onActive
      `,
      secondary: `
          bg-secondary 
            hover:bg-secondary-onHover
            active:bg-secondary-onActive
        `,
      tertiary: `
          bg-tertiary
            hover:bg-tertiary-onHover
            active:bg-tertiary-onActive
          border border-secondary
            hover:border-none
            active:border-none
      `,
      quaternary: `
          bg-transparent
      `,
    }[variant],
  };

  const iconStyles = {
    sizeStyles: {
      xs: 'text-sm',
      sm: 'text-xl',
      md: 'text-[1.5rem]',
      lg: 'text-[2rem]',
    }[size],
    variantStyles: {
      primary: 'text-secondary',
      secondary: 'text-primary',
      tertiary: 'text-secondary',
      quaternary: 'text-secondary',
    }[variant],
  };

  return (
    <button
      className={classNames([
        'flex items-center justify-center disabled:bg-disabled',
        wrapperStyles.sizeStyles,
        wrapperStyles.variantStyles,
        { 'rounded-full': rounded },
        { 'rounded-sm': !rounded },
      ])}
      {...props}
    >
      {React.cloneElement(icon as React.ReactElement, {
        className: classNames([
          iconStyles.sizeStyles,
          iconStyles.variantStyles,
        ]),
      })}
    </button>
  );
};

export default IconButton;
