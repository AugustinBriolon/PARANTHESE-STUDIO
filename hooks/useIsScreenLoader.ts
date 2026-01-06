import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

let isFirstLoad = true;

export const useIsScreenLoader = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== '/') {
      isFirstLoad = false;
    }
  }, [pathname]);

  return isFirstLoad && pathname === '/';
};
