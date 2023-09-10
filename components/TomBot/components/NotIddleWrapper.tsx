import { twMerge } from 'tailwind-merge';

const NotIddleWrapper: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div
    className={twMerge(
      'text-left flex gap-2 bg-base-300 items-center justify-center  p-3 rounded-sm w-full text-sm border-2 border-white',
      className,
    )}
  >
    {children}
  </div>
);

export default NotIddleWrapper;
