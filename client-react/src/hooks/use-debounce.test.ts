import { renderHook, act } from '@testing-library/react';
import useDebounce from './use-debounce';

describe('useDebounce Hook', () => {
  jest.useFakeTimers();

  it('returns initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));
    expect(result.current).toBe('initial');
  });

  it.skip('updates debounced value after delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    );

    rerender({ value: 'updated', delay: 500 });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('updated');
  });

  it.skip('cancels previous debounce on value change', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    );

    rerender({ value: 'updated', delay: 500 });

    act(() => {
      jest.advanceTimersByTime(250);
    });

    rerender({ value: 'new value', delay: 500 });

    act(() => {
      jest.advanceTimersByTime(250);
    });

    expect(result.current).toBe('initial');

    act(() => {
      jest.advanceTimersByTime(250);
    });

    expect(result.current).toBe('new value');
  });

  jest.useRealTimers();
});