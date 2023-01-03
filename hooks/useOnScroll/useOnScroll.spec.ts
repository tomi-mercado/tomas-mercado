import { act, renderHook } from '@testing-library/react';

import useOnScroll from '.';

describe('useOnScroll', () => {
  it('should be defined', () => {
    expect(useOnScroll).toBeDefined();
  });

  it('should call the callback function when the mouse wheel is scrolled', () => {
    const cb = jest.fn();

    // Render the hook with a mock callback function
    renderHook(() => useOnScroll(cb));

    // Simulate a mouse wheel scroll event
    act(() => {
      const event = new WheelEvent('wheel', { deltaY: 100 });
      window.dispatchEvent(event);
    });

    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('should call the callback function when the up or down arrow key is pressed', () => {
    const cb = jest.fn();

    // Render the hook with a mock callback function
    renderHook(() => useOnScroll(cb));

    // Simulate an up arrow key press event
    act(() => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      window.dispatchEvent(event);
    });

    expect(cb).toHaveBeenCalledTimes(1);

    // Reset the mock function
    cb.mockReset();

    // Simulate a down arrow key press event
    act(() => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      window.dispatchEvent(event);
    });

    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('should only call the callback function when the scroll direction changes', () => {
    const cb = jest.fn();

    // Render the hook with a mock callback function
    renderHook(() => useOnScroll(cb));

    // Simulate multiple mouse wheel scroll events in the same direction
    act(() => {
      const event = new WheelEvent('wheel', { deltaY: 100 });

      // Dispatch the event multiple times
      window.dispatchEvent(event);

      // Timeouts are needed to ensure that the scroll is enough to trigger the callback function
      const timeouts = [100, 200];
      timeouts.forEach((timeout) => {
        setTimeout(() => {
          window.dispatchEvent(event);
        }, timeout);
      });
    });

    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('should remove the event listeners when the hook unmounts', () => {
    const cb = jest.fn();

    // Render the hook with a mock callback function
    const { unmount } = renderHook(() => useOnScroll(cb));

    // Unmount the hook
    unmount();

    // Simulate a mouse wheel scroll event
    act(() => {
      const event = new WheelEvent('wheel', { deltaY: 100 });
      window.dispatchEvent(event);
    });

    expect(cb).toHaveBeenCalledTimes(0);
  });

  it('should pass the correct scroll direction to the callback function', () => {
    const cb = jest.fn();

    // Render the hook with a mock callback function
    renderHook(() => useOnScroll(cb));

    // Simulate a mouse wheel scroll event
    act(() => {
      const event = new WheelEvent('wheel', { deltaY: 100 });
      window.dispatchEvent(event);
    });

    expect(cb).toHaveBeenLastCalledWith('down');

    // Reset the mock function
    cb.mockReset();

    // Simulate a mouse wheel scroll event in the opposite direction
    act(() => {
      const event = new WheelEvent('wheel', { deltaY: -100 });
      window.dispatchEvent(event);
    });

    expect(cb).toHaveBeenLastCalledWith('up');
  });
});
