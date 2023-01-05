import React from 'react';

import classNames from 'classnames';

type Size = 'xs' | 'sm' | 'md' | 'lg';

type Variant = 'primary' | 'secondary' | 'tertiary' | 'quaternary';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: Size;
  variant?: Variant;
  icon?: React.ReactNode;
  rounded?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  size = 'md',
  variant = 'primary',
  icon,
  rounded = false,
  leftIcon,
  rightIcon,
  children,
  ...props
}) => {
  const wrapperStyles = {
    sizeStyles: {
      xs: 'px-2 py-1',
      sm: 'px-3 py-2',
      md: 'px-4 py-3',
      lg: 'px-5 py-4',
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

  const textStyles = {
    sizeStyles: {
      xs: 'text-sm',
      sm: 'text-md',
      md: 'text-lg',
      lg: 'text-xl',
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
        'flex space-x-2 items-center disabled:bg-disabled h-fit',
        wrapperStyles.sizeStyles,
        wrapperStyles.variantStyles,
        { 'rounded-full': rounded },
        { 'rounded-md': !rounded },
        { 'pl-0': variant === 'quaternary' },
      ])}
      {...props}
    >
      {leftIcon && <span className="mt-0.5">{leftIcon}</span>}
      <span
        className={classNames([
          textStyles.sizeStyles,
          textStyles.variantStyles,
        ])}
      >
        {children}
      </span>
      {rightIcon && <span className="mt-0.5">{rightIcon}</span>}
    </button>
  );
};

export default Button;
