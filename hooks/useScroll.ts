import { useLenis } from 'lenis/react';
import { useEffect, useState } from 'react';

const globalScrollState = {
  isLocked: false,
  listeners: new Set<() => void>(),
};

const notifyListeners = () => {
  globalScrollState.listeners.forEach((listener) => listener());
};

const updateScrollState = (isLocked: boolean) => {
  globalScrollState.isLocked = isLocked;
  notifyListeners();
};

export const useScroll = () => {
  const [isLocked, setIsLocked] = useState(globalScrollState.isLocked);
  const lenis = useLenis();

  useEffect(() => {
    const listener = () => setIsLocked(globalScrollState.isLocked);
    globalScrollState.listeners.add(listener);
    return () => {
      globalScrollState.listeners.delete(listener);
    };
  }, []);

  const lockScroll = (shouldLock: boolean) => {
    if (!lenis) {
      console.warn('Lenis is not initialized yet');
      return;
    }

    if (shouldLock) {
      lenis.scrollTo(0, { immediate: true });
      lenis.stop();
      updateScrollState(true);
    } else {
      lenis.start();
      updateScrollState(false);
    }
  };

  return { isLocked, lockScroll };
};
