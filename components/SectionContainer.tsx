import { twMerge } from 'tailwind-merge';

import React, { ReactNode } from 'react';

const SectionContainer: React.FC<{
  children: ReactNode;
  className?: string;
  innerClassName?: string;
}> = ({ children, className, innerClassName }) => {
  return (
    <div
      className={twMerge(
        'w-full flex justify-center items-center py-24 even:bg-secondary',
        className,
      )}
    >
      <div
        className={twMerge(
          'max-w-3xl px-6 flex flex-col gap-4 items-center text-center',
          innerClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default SectionContainer;
