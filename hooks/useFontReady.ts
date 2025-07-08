import { useEffect, useState } from 'react';

export function useFontReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    if ('fonts' in document) {
      document.fonts.load('1em Borna').then(() => {
        if (!cancelled) setReady(true);
      });
    } else {
      setReady(true);
    }
    return () => {
      cancelled = true;
    };
  }, []);

  return ready;
}
