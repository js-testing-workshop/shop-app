import { renderHook } from '@testing-library/react';
import { useFirstMountState } from './use-first-mount-state';

describe('useFirstMountState Hook', () => {
  it('returns true on first mount', () => {
    const { result } = renderHook(() => useFirstMountState());
    expect(result.current).toBe(true);
  });

  it('returns false on subsequent renders', () => {
    const { result, rerender } = renderHook(() => useFirstMountState());
    rerender();
    expect(result.current).toBe(false);
  });
});