import { renderHook } from '@testing-library/react';
import { useUpdateEffect } from './use-update-effect';

describe('useUpdateEffect Hook', () => {
  it('not calls effect on initial mount', () => {
    const effect = jest.fn();
    renderHook(() => useUpdateEffect(effect, []));
    expect(effect).not.toHaveBeenCalled();
  });

  it('calls effect on updates', () => {
    const effect = jest.fn();
    const { rerender } = renderHook(({ deps }) => useUpdateEffect(effect, deps), {
      initialProps: { deps: [1] },
    });

    rerender({ deps: [2] });
    expect(effect).toHaveBeenCalledTimes(1);

    rerender({ deps: [3] });
    expect(effect).toHaveBeenCalledTimes(2);
  });

  it('cleans up on unmount', () => {
    const cleanup = jest.fn();
    const effect = jest.fn(() => cleanup);
    const { unmount, rerender } = renderHook(({ deps }) => useUpdateEffect(effect, deps), {
      initialProps: { deps: [1] },
    });

    rerender({ deps: [2] });
    expect(effect).toHaveBeenCalledTimes(1);

    unmount();
    expect(cleanup).toHaveBeenCalledTimes(1);
  });
});