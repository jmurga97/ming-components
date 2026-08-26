import { vi } from 'vitest';

type ChangeListener = (event: MediaQueryListEvent) => void;

interface QueryState {
  listeners: Set<ChangeListener>;
  matches: boolean;
}

export interface MatchMediaMock {
  restore(): void;
  setMatches(query: string, matches: boolean): void;
}

/**
 * Replaces `window.matchMedia` with a controllable mock for the calling test.
 * Install before rendering components that read media queries on mount
 * (AppShell responsive split, StatusRegion reduced motion).
 */
export function installMatchMediaMock(): MatchMediaMock {
  const previous = window.matchMedia.bind(window);
  const queries = new Map<string, QueryState>();

  function stateFor(query: string): QueryState {
    let state = queries.get(query);
    if (!state) {
      state = { listeners: new Set(), matches: false };
      queries.set(query, state);
    }
    return state;
  }

  window.matchMedia = vi.fn((query: string) => {
    const state = stateFor(query);
    return {
      addEventListener: (_type: string, listener: ChangeListener): void => {
        state.listeners.add(listener);
      },
      addListener: (listener: ChangeListener): void => {
        state.listeners.add(listener);
      },
      dispatchEvent: (): boolean => false,
      get matches(): boolean {
        return state.matches;
      },
      get media(): string {
        return query;
      },
      onchange: null,
      removeEventListener: (_type: string, listener: ChangeListener): void => {
        state.listeners.delete(listener);
      },
      removeListener: (listener: ChangeListener): void => {
        state.listeners.delete(listener);
      },
    } as unknown as MediaQueryList;
  });

  return {
    restore(): void {
      window.matchMedia = previous;
    },
    setMatches(query: string, matches: boolean): void {
      const state = stateFor(query);
      if (state.matches === matches) return;
      state.matches = matches;
      const event = { matches, media: query } as MediaQueryListEvent;
      for (const listener of [...state.listeners]) listener(event);
    },
  };
}
