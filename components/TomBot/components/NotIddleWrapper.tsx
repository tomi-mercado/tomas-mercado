const NotIddleWrapper: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div
    className={`text-left flex gap-2 bg-neutral-content text-neutral p-3 rounded-sm w-full text-sm border-2 border-white ${className}`}
  >
    {children}
  </div>
);

export default NotIddleWrapper;
