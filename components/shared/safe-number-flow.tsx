import NumberFlow, { NumberFlowProps } from '@number-flow/react';
import { useEffect, useState } from 'react';

const SafeNumberFlow = ({ value, className, ...props }: NumberFlowProps) => {
  const [canUseNumberFlow, setCanUseNumberFlow] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const isSupported = typeof window !== 'undefined' && 'attachInternals' in HTMLElement.prototype;
    setCanUseNumberFlow(isSupported);
  }, []);

  if (!isClient) {
    return <span className={className}>{value}</span>;
  }

  if (!canUseNumberFlow) {
    return <span className={className}>{value}</span>;
  }

  return <NumberFlow className={className} value={value} {...props} />;
};

export default SafeNumberFlow;
