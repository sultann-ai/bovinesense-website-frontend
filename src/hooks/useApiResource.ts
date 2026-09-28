import { useCallback, useEffect, useState } from 'react';

export type ResourceStatus = 'loading' | 'error' | 'success';

interface ResourceState<T> {
  status: ResourceStatus;
  data?: T;
  /** HTTP status of a failed request (e.g. 404), when the server responded. */
  httpStatus?: number;
}

const statusOf = (err: unknown): number | undefined =>
  (err as { response?: { status?: number } })?.response?.status;

/**
 * Fetch one API resource with loading / error / success state and a retry().
 * `fetcher` must be a stable reference (e.g. `productsService.getAll`).
 * Each call is independent, so sections using it fetch in parallel and fail independently.
 */
export function useApiResource<T>(fetcher: () => Promise<T>) {
  const [state, setState] = useState<ResourceState<T>>({ status: 'loading' });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setState((prev) => ({ status: 'loading', data: prev.data }));
    fetcher()
      .then((data) => {
        if (!cancelled) setState({ status: 'success', data });
      })
      .catch((err: unknown) => {
        if (!cancelled) setState({ status: 'error', httpStatus: statusOf(err) });
      });
    return () => {
      cancelled = true;
    };
  }, [fetcher, attempt]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  return { ...state, retry };
}
