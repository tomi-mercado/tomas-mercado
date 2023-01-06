import { useEffect, useRef, useState } from 'react';

/**
 * Callback type for useOnScroll hook.
 */
type Callback = (direction: 'up' | 'down') => void;

/**
 * Custom hook that tracks scroll direction (up or down) in the window.
 * @param cb - Callback function to be called when scroll.
 */
const useOnScroll = (cb: Callback) => {
  const lastScrollTop = useRef(0);
  const [lastScroll, setLastScroll] = useState<'down' | 'up' | null>(null);

  useEffect(() => {
    const handleScroll = (e: WheelEvent | KeyboardEvent) => {
      // Initialize scroll direction and difference from last scroll
      let newScroll: 'down' | 'up' | null = null;

      if (e instanceof KeyboardEvent) {
        // Check if event is an arrow key press
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
          e.preventDefault();

          // Set new scroll direction based on arrow key pressed
          newScroll = e.key === 'ArrowUp' ? 'up' : 'down';
        }
      } else {
        // If event is a mouse wheel scroll, get current scroll position
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;

        // Set new scroll direction based on scroll delta
        newScroll = e.deltaY > 0 ? 'down' : 'up';

        // Update last scroll position ref
        lastScrollTop.current = scrollTop <= 0 ? 0 : scrollTop;
      }

      cb(newScroll as 'up' | 'down');
      setLastScroll(newScroll);
    };

    // Add event listeners for scroll events
    window.addEventListener('wheel', handleScroll);
    window.addEventListener('keydown', handleScroll);

    // Return cleanup function to remove event listeners on unmount
    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('keydown', handleScroll);
    };
  });
};

export default useOnScroll;
