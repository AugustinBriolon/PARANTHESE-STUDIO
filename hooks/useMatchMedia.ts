import { BREAKPOINTS } from '@/constants';
import { useEffect, useState } from 'react';

export const useMatchMedia = (breakpoint: BREAKPOINTS) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    setMatches(window.matchMedia(`(max-width: ${breakpoint}px)`).matches);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);

    setMatches(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, [breakpoint]);

  return matches;
};

export const useMatchMediaHeight = (breakpoint: BREAKPOINTS) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    setMatches(window.matchMedia(`(max-height: ${breakpoint}px)`).matches);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-height: ${breakpoint}px)`);

    setMatches(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, [breakpoint]);

  return matches;
};
