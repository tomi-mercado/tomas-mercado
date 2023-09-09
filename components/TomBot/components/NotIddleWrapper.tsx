const NotIddleWrapper: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div
    className={`text-left flex gap-2 bg-base-300  p-3 rounded-sm w-full text-sm border-2 border-white max-w-xl ${className}`}
  >
    {children}
  </div>
);

export default NotIddleWrapper;
