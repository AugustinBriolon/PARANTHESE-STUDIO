import { useState, useEffect } from 'react';

export const useEnvironment = () => {
  const [isProd, setIsProd] = useState(false);
  const [isDev, setIsDev] = useState(false);
  const [environment, setEnvironment] = useState('production');

  useEffect(() => {
    const isLocalhost =
      window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const isProd =
      window.location.hostname === 'paranthese.studio' ||
      window.location.hostname === 'www.paranthese.studio';

    setIsDev(isLocalhost);
    setIsProd(isProd);
    setEnvironment(isLocalhost ? 'development' : 'production');
  }, []);

  return {
    isProd,
    isDev,
    environment,
  };
};
