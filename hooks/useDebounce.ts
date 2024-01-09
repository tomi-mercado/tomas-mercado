import { useEffect, useRef } from 'react';

/**
 * Execute a function after a delay
 * @param fn callback function
 * @param delay time to wait before execute the callback function in ms
 * @param deps dependencies to watch to execute the callback function. Add dependencies with EXTREME CAUTION because the hook will be executed every time a dependency changes, and will not warn you if you miss a dependency because the hook deps eslint rule is disabled.
 * @example
 * const [value, setValue] = useState('');
 * useDebounce(
 *  () => {
 *   writeQuestionValueToLocalStorage(value);
 *  },
 *  1000,
 *  [value],
 * );
 */
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
