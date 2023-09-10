import { twMerge } from 'tailwind-merge';

import React, { ReactNode } from 'react';

const UnderlinedText: React.FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <span
      className={twMerge(
        'underline -underline-offset-8 decoration-primary',
        className,
      )}
    >
      {children}
    </span>
  );
};

export default UnderlinedText;
