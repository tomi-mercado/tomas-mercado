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
  className,
  ...props
}) => {
  const wrapperStyles = {
    sizeStyles: {
      xs: 'px-2 py-1 text-sm',
      sm: 'px-3 py-2 text-md',
      md: 'px-4 py-3 text-lg',
      lg: 'px-5 py-4 text-xl',
    }[size],
    variantStyles: {
      primary: `
          bg-primary
            hover:bg-primary-onHover
            active:bg-primary-onActive
          text-secondary
      `,
      secondary: `
          bg-secondary 
            hover:bg-secondary-onHover
            active:bg-secondary-onActive
          text-primary
        `,
      tertiary: `
          hover:bg-tertiary-onHover
          active:bg-tertiary-onActive
          outline outline-secondary
            hover:outline-none
            active:outline-none
          text-secondary
      `,
      quaternary: `
          bg-transparent
          text-secondary
      `,
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
        className,
      ])}
      {...props}
    >
      {leftIcon}
      <span
        style={{
          inlineSize: '-webkit-fill-available',
        }}
      >
        {children}
      </span>
      {rightIcon}
    </button>
  );
};

export default Button;
