import { useEffect, useRef } from 'react';

const useDebounce = (fn: Function, delay: number, deps: any[]) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      fn();
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, fn, ...deps]);

  return timeoutRef;
};

export default useDebounce;
