import React from 'react';

import classNames from 'classnames';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  withWrapper?: boolean;
}

interface UpDownDetailProps {
  position: 'top' | 'bottom';
}

const UpDownDetail: React.FC<UpDownDetailProps> = ({ position }) => (
  <div
    className={classNames([
      'absolute h-[1px] w-1/12 bg-neutral-300',
      {
        'bottom-2 right-2': position === 'bottom',
        'top-2 left-2': position === 'top',
      },
    ])}
  ></div>
);

const Card: React.FC<CardProps> = ({
  children,
  className,
  withWrapper = true,
}) => {
  return (
    <div
      className={classNames([
        'w-full bg-yellow-50 rounded-md shadow-lg relative min-h-[48px]',
        className,
      ])}
    >
      <UpDownDetail position="top" />
      {!withWrapper && children}
      {withWrapper && <div className="py-4 px-6">{children}</div>}
      <UpDownDetail position="bottom" />
    </div>
  );
};

export default Card;
