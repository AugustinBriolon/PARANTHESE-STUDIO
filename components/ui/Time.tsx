import React, { useEffect, useState, forwardRef } from 'react';
import NumberFlow, { NumberFlowGroup } from '@number-flow/react';

function getParisTimeInSeconds() {
  const now = new Date();
  const paris = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Paris' }));
  return paris.getHours() * 3600 + paris.getMinutes() * 60 + paris.getSeconds();
}

const Time = forwardRef<HTMLDivElement, object>((props, ref) => {
  const [seconds, setSeconds] = useState(getParisTimeInSeconds());

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(getParisTimeInSeconds());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hh24 = Math.floor(seconds / 3600);
  const hh = ((hh24 + 11) % 12) + 1;
  const mm = Math.floor((seconds % 3600) / 60);
  const ss = seconds % 60;

  return (
    <NumberFlowGroup>
      <div
        ref={ref}
        className="text-md flex origin-bottom-left items-baseline will-change-transform"
      >
        PARIS&nbsp;
        <NumberFlow format={{ minimumIntegerDigits: 2 }} value={hh} />
        <NumberFlow
          digits={{ 1: { max: 5 } }}
          format={{ minimumIntegerDigits: 2 }}
          prefix=":"
          value={mm}
        />
        <NumberFlow
          digits={{ 1: { max: 5 } }}
          format={{ minimumIntegerDigits: 2 }}
          prefix=":"
          value={ss}
        />
      </div>
    </NumberFlowGroup>
  );
});

Time.displayName = 'Time';

export default Time;
