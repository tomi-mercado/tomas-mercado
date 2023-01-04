import React from 'react';

import classNames from 'classnames';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  rightIcon,
  leftIcon,
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={classNames([
        'py-2 px-4 flex space-x-2 items-center border border-secondary hover:outline hover:outline-1',
        className,
      ])}
      {...props}
    >
      {leftIcon && <span className="mt-0.5">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="mt-0.5">{rightIcon}</span>}
    </button>
  );
};

export default Button;
