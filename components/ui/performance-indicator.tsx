import useClearSiteData from '@/hooks/useClearSiteData';
import { PERFORMANCE_LEVEL, STORAGE_KEY } from '@/hooks/usePerformance';
import { isTouchDevice } from '@/hooks/useTouchDevice';
import { usePerformance } from '@/providers/performance.provider';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

const getTimeRemaining = () => {
  try {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (!cached) return 'no cache';

    const parsed = JSON.parse(cached);
    const CACHE_DURATION = 30 * 60 * 1000;
    const age = Date.now() - parsed.timestamp;
    const remaining = CACHE_DURATION - age;

    if (remaining <= 0) return 'expired';

    const minutes = Math.floor(remaining / 60000);
    return `${minutes}min`;
  } catch {
    return 'error';
  }
};

const FORCE_LOW_STORAGE_KEY = 'force-low-performance';
const LONG_PRESS_DURATION = 1000;

const PerformanceIndicator = () => {
  const { performanceLevel, executionTime, score, isLoading, os, osVersion, isOldOS } =
    usePerformance();

  const { clearSiteData } = useClearSiteData();
  const [isHovered, setIsHovered] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<string>('--');
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [longPressProgress, setLongPressProgress] = useState(0);
  const [progressInterval, setProgressInterval] = useState<NodeJS.Timeout | null>(null);
  const isForcedLow =
    typeof window !== 'undefined' && localStorage.getItem(FORCE_LOW_STORAGE_KEY) === 'true';

  useEffect(() => {
    setTimeRemaining(getTimeRemaining());

    const interval = setInterval(() => {
      setTimeRemaining(getTimeRemaining());
    }, 60000);

    return () => {
      clearInterval(interval);
      if (longPressTimer) {
        clearTimeout(longPressTimer);
      }
      if (progressInterval) {
        clearInterval(progressInterval);
      }
    };
  }, [longPressTimer, progressInterval]);

  const handleClick = async () => {
    if (
      window.confirm(
        '⚠️ Clear all site data and reload?\n\nThis will delete:\n• localStorage\n• sessionStorage\n• Cookies\n• IndexedDB\n• Cache Storage\n• Service Workers\n\nThe page will reload automatically.',
      )
    ) {
      await clearSiteData();
    }
  };

  const toggleForceLowPerformance = () => {
    const isCurrentlyForced = localStorage.getItem(FORCE_LOW_STORAGE_KEY) === 'true';

    if (isCurrentlyForced) {
      localStorage.removeItem(FORCE_LOW_STORAGE_KEY);
      console.info('🔧 Force LOW performance: DISABLED');
    } else {
      localStorage.setItem(FORCE_LOW_STORAGE_KEY, 'true');
      console.info('🔧 Force LOW performance: ENABLED');
    }

    window.location.reload();
  };

  const handleLongPressStart = () => {
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / LONG_PRESS_DURATION) * 100, 100);
      setLongPressProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 16);

    setProgressInterval(interval);

    const timer = setTimeout(() => {
      toggleForceLowPerformance();
    }, LONG_PRESS_DURATION);

    setLongPressTimer(timer);
  };

  const handleLongPressEnd = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
    if (progressInterval) {
      clearInterval(progressInterval);
      setProgressInterval(null);
    }
    setLongPressProgress(0);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    handleLongPressEnd();
  };

  const getDisplayText = () => {
    if (isForcedLow) return 'Forced LOW';
    if (isOldOS) return 'Old OS';
    return `${executionTime.toFixed(0)}ms`;
  };

  return (
    <div className="fixed bottom-4 left-1/2 z-9999 -translate-x-1/2">
      <div
        className={clsx(
          'absolute right-1/2 bottom-full mb-2 w-64 origin-bottom translate-x-1/2 rounded-lg border border-slate-400/30 bg-slate-900/95 p-3 text-sm shadow-xl backdrop-blur-xl transition-[opacity,scale]',
          isHovered && !isLoading
            ? 'pointer-events-auto visible scale-100 opacity-100'
            : 'pointer-events-none invisible scale-90 opacity-0',
        )}
      >
        <div className="mb-2 flex items-center justify-between border-b border-slate-700 pb-2">
          <span className="font-semibold text-slate-200">
            Performance Metrics
            {isForcedLow && (
              <span className="ml-1 text-xs text-orange-400" title="Test mode: forced LOW">
                🔧
              </span>
            )}
          </span>
          <div
            className={clsx(
              'rounded-full px-2 py-0.5 text-xs font-bold',
              performanceLevel === PERFORMANCE_LEVEL.HIGH && 'bg-green-500/20 text-green-400',
              performanceLevel === PERFORMANCE_LEVEL.LOW && 'bg-red-500/20 text-red-400',
            )}
          >
            {performanceLevel.toUpperCase()}
          </div>
        </div>
        <div className="space-y-1.5 text-slate-300">
          {executionTime !== 0 && (
            <div className="flex justify-between">
              <span className="text-slate-400">Animation Time:</span>
              <span className="font-mono font-semibold">{executionTime.toFixed(0)}ms</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-slate-400">Score:</span>
            <span className="font-mono font-semibold">{score}/100</span>
          </div>
          {os && (
            <div className="flex justify-between">
              <span className="text-slate-400">OS:</span>
              <span className="font-mono text-xs font-semibold text-slate-200">
                {os}
                {osVersion ? ` ${osVersion}` : ' (unknown version)'}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-slate-400">Cache expires in:</span>
            <span className="font-mono text-xs text-slate-400">{timeRemaining}</span>
          </div>
        </div>
        <div className="mt-2 space-y-1 border-t border-slate-700 pt-2 text-xs">
          <button
            className="w-full text-left text-slate-600 transition-colors"
            onClick={handleClick}
          >
            Click to clear cache & reload
          </button>
          <div className="text-slate-600">
            Long press ({LONG_PRESS_DURATION / 1000}s) to {isForcedLow ? 'disable' : 'enable'} test
            mode
          </div>
        </div>
      </div>

      <button
        className="relative cursor-pointer overflow-hidden rounded-full border border-slate-400/30 bg-slate-300/30 text-sm font-medium shadow-lg transition-all select-none hover:scale-105"
        onClick={isTouchDevice() ? undefined : handleClick}
        onMouseDown={handleLongPressStart}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleLongPressEnd}
        onTouchCancel={handleLongPressEnd}
        onTouchEnd={handleLongPressEnd}
        onTouchStart={handleLongPressStart}
      >
        {longPressProgress > 0 && (
          <div
            className={clsx(
              'absolute inset-0 h-full origin-left',
              isForcedLow ? 'bg-green-500' : 'bg-red-500',
            )}
            style={{
              transform: `scaleX(${longPressProgress}%)`,
              transition: 'transform 0.016s linear',
            }}
          />
        )}

        <div className="flex h-full w-full items-center gap-2 px-2 py-1 backdrop-blur-xs">
          <div
            className={clsx(
              'relative z-10 flex h-2 w-2 items-center gap-2 rounded-full',
              performanceLevel === PERFORMANCE_LEVEL.HIGH && 'bg-green-500',
              performanceLevel === PERFORMANCE_LEVEL.LOW && 'bg-red-500',
            )}
          />
          <div className="relative z-10 text-xs opacity-75">{getDisplayText()}</div>
        </div>
      </button>
    </div>
  );
};

export default PerformanceIndicator;
