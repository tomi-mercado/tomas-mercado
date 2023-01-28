import React from 'react';

import classNames from 'classnames';

interface TextProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'p2' | 'p3';
  children?: React.ReactNode;
  className?: string;
  underline?: boolean;
}

const Text: React.FC<TextProps> = ({
  as = 'p',
  children,
  variant = 'p',
  className,
  underline,
}) => {
  const Node = {
    h1: ({ children, className }: TextProps) => (
      <h1 className={className}>{children}</h1>
    ),
    h2: ({ children, className }: TextProps) => (
      <h2 className={className}>{children}</h2>
    ),
    h3: ({ children, className }: TextProps) => (
      <h3 className={className}>{children}</h3>
    ),
    h4: ({ children, className }: TextProps) => (
      <h4 className={className}>{children}</h4>
    ),
    h5: ({ children, className }: TextProps) => (
      <h5 className={className}>{children}</h5>
    ),
    h6: ({ children, className }: TextProps) => (
      <h6 className={className}>{children}</h6>
    ),
    p: ({ children, className }: TextProps) => (
      <p className={className}>{children}</p>
    ),
    p2: ({ children, className }: TextProps) => (
      <p className={className}>{children}</p>
    ),
    span: ({ children, className }: TextProps) => (
      <span className={className}>{children}</span>
    ),
  }[as];

  const textClassName = {
    h1: 'text-5xl sm:text-7xl font-bold',
    h2: 'text-4xl sm:text-5xl font-semibold',
    h3: 'text-2xl sm:text-3xl font-semibold',
    h4: 'text-xl sm:text-2xl',
    h5: 'text-lg sm:text-xl',
    h6: 'text-lg',
    p: 'text-base',
    p2: 'text-sm',
    p3: 'text-xs',
  }[variant];

  const nodeClassName = classNames([textClassName, className]);

  if (underline) {
    return (
      <div className="flex flex-col w-fit">
        <Node className={nodeClassName}>{children}</Node>
        <div className="h-[2.5px] bg-black w-full"></div>
      </div>
    );
  }

  return <Node className={nodeClassName}>{children}</Node>;
};

export default Text;
