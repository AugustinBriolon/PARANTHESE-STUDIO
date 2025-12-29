import { getOSInfo, OS } from '@/utils/os.utils';
import { useEffect, useState } from 'react';

export enum PERFORMANCE_LEVEL {
  HIGH = 'high',
  LOW = 'low',
}

// 🔧 TEST ONLY: Force LOW performance level via localStorage
const FORCE_LOW_STORAGE_KEY = 'force-low-performance';
const isForceLowPerformanceEnabled = () => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(FORCE_LOW_STORAGE_KEY) === 'true';
};

interface PerformanceMetrics {
  performanceLevel: PERFORMANCE_LEVEL;
  executionTime: number;
  isLoading: boolean;
  score: number;
  os: OS | null;
  osVersion: number | null;
  isOldOS: boolean;
}

interface PerformanceUtils {
  getConditionalProps: <T>(props: Record<PERFORMANCE_LEVEL, T>) => T | undefined;
}

export const STORAGE_KEY = 'apax-performance-metrics';
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

const THRESHOLD = {
  ANIMATION_HIGH: 400, // ms
} as const;

interface CachedMetrics {
  performanceLevel: PERFORMANCE_LEVEL;
  executionTime: number;
  score: number;
  timestamp: number;
  os?: OS | null;
  osVersion?: number | null;
  isOldOS?: boolean;
}

const usePerformanceHook = (): PerformanceMetrics & PerformanceUtils => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    performanceLevel: PERFORMANCE_LEVEL.LOW,
    executionTime: 0,
    score: 0,
    isLoading: true,
    os: null,
    osVersion: null,
    isOldOS: false,
  });

  const getConditionalProps = <T>(props: Record<PERFORMANCE_LEVEL, T>): T | undefined => {
    return props[metrics.performanceLevel];
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const detectPerformance = async () => {
        // 🔧 TEST MODE: Force LOW performance if enabled
        if (isForceLowPerformanceEnabled()) {
          console.warn('⚠️ FORCE_LOW_PERFORMANCE is enabled - forcing LOW performance level');
          const osInfo = getOSInfo();
          setMetrics({
            performanceLevel: PERFORMANCE_LEVEL.LOW,
            executionTime: 999,
            score: 30,
            isLoading: false,
            os: osInfo.os,
            osVersion: osInfo.version,
            isOldOS: false,
          });
          return;
        }

        // Vérification OS anciens
        const osInfo = getOSInfo();

        if (osInfo.os === 'ios' && osInfo.version !== null && osInfo.version < 16) {
          console.info(
            `🍎 iOS ${osInfo.version} detected (< 16), forcing LOW performance level (no test)`,
          );
          setMetrics({
            performanceLevel: PERFORMANCE_LEVEL.LOW,
            executionTime: 0,
            score: 10,
            isLoading: false,
            os: osInfo.os,
            osVersion: osInfo.version,
            isOldOS: true,
          });
          return;
        }

        if (osInfo.os === 'android' && osInfo.version !== null && osInfo.version < 10) {
          console.info(
            `🤖 Android ${osInfo.version} detected (< 10), forcing LOW performance level (no test)`,
          );
          setMetrics({
            performanceLevel: PERFORMANCE_LEVEL.LOW,
            executionTime: 0,
            score: 10,
            isLoading: false,
            os: osInfo.os,
            osVersion: osInfo.version,
            isOldOS: true,
          });
          return;
        }

        if (osInfo.os === 'windows' && osInfo.version !== null && osInfo.version < 10) {
          console.info(
            `🪟 Windows ${osInfo.version} detected (< 10), forcing LOW performance level (no test)`,
          );
          setMetrics({
            performanceLevel: PERFORMANCE_LEVEL.LOW,
            executionTime: 0,
            score: 10,
            isLoading: false,
            os: osInfo.os,
            osVersion: osInfo.version,
            isOldOS: true,
          });
          return;
        }

        // Pour macOS, on force LOW seulement si on détecte explicitement une version < 11
        // Si version === null, on assume que c'est une version récente (>= 11) et on continue
        if (osInfo.os === 'macos' && osInfo.version !== null && osInfo.version < 11) {
          console.info(
            `🍎 macOS ${osInfo.version} detected (< 11), forcing LOW performance level (no test)`,
          );
          setMetrics({
            performanceLevel: PERFORMANCE_LEVEL.LOW,
            executionTime: 0,
            score: 10,
            isLoading: false,
            os: osInfo.os,
            osVersion: osInfo.version,
            isOldOS: true,
          });
          return;
        }

        const getCachedMetrics = (): CachedMetrics | null => {
          try {
            const cached = localStorage.getItem(STORAGE_KEY);
            if (cached) {
              const parsed: CachedMetrics = JSON.parse(cached);
              const age = Date.now() - parsed.timestamp;
              if (age < CACHE_DURATION && parsed.score !== undefined) {
                return parsed;
              }
            }
          } catch (error) {
            console.warn('⚠️ Error reading cached performance metrics:', error);
          }
          return null;
        };

        const cachedMetrics = getCachedMetrics();
        if (cachedMetrics) {
          const cacheAge = Math.round((Date.now() - cachedMetrics.timestamp) / 60000);
          console.info(`✅ Using cached performance metrics (${cacheAge}min old, valid for 30min)`);
          const currentOSInfo = getOSInfo();
          setMetrics({
            performanceLevel: cachedMetrics.performanceLevel,
            executionTime: cachedMetrics.executionTime,
            score: cachedMetrics.score,
            isLoading: false,
            os: cachedMetrics.os ?? currentOSInfo.os,
            osVersion: cachedMetrics.osVersion ?? currentOSInfo.version,
            isOldOS: cachedMetrics.isOldOS ?? false,
          });
          return;
        }

        // Pas de cache valide, on lance le test
        console.info('🎯 Running performance test (no valid cache)...');

        const waitForStableState = async (): Promise<void> => {
          return new Promise((resolve) => {
            if (document.readyState !== 'complete') {
              window.addEventListener('load', () => resolve(), { once: true });
            } else {
              setTimeout(resolve, 50);
            }
          });
        };

        const isFirstLoad = (): boolean => {
          if ('performance' in window && 'getEntriesByType' in performance) {
            const navigationEntries = performance.getEntriesByType(
              'navigation',
            ) as PerformanceNavigationTiming[];
            if (navigationEntries.length > 0) {
              const [nav] = navigationEntries;
              return nav.type === 'navigate' && nav.transferSize > 0;
            }
          }
          return true;
        };

        const isBrowserBusy = (): boolean => {
          if ('performance' in window && 'getEntriesByType' in performance) {
            const navigationEntries = performance.getEntriesByType(
              'navigation',
            ) as PerformanceNavigationTiming[];
            if (navigationEntries.length > 0) {
              const [nav] = navigationEntries;
              return Date.now() - nav.loadEventEnd < 500;
            }
          }
          return false;
        };

        const runAnimationPerformanceTest = () => {
          return new Promise<number>((resolve) => {
            const start = performance.now();

            const testElement = document.createElement('div');
            testElement.style.cssText = `
              position: fixed;
              top: -200px;
              left: -200px;
              width: 100px;
              height: 100px;
              background: linear-gradient(45deg, #ff0000, #0000ff);
              border-radius: 50%;
              filter: blur(0px);
              transform: translate(0px, 0px) scale(1) rotate(0deg);
              z-index: -9999;
              pointer-events: none;
            `;

            document.body.appendChild(testElement);

            let frameCount = 0;
            const totalFrames = 20;
            const frameTimes: number[] = [];
            let lastFrameTime = start;

            const animate = () => {
              const currentTime = performance.now();
              frameTimes.push(currentTime - lastFrameTime);
              lastFrameTime = currentTime;

              frameCount++;
              const progress = frameCount / totalFrames;

              const blurValue = progress * 4; // 0 à 4px
              const translate = progress * 40 - 20; // -20px à +20px
              const rotation = progress * 360; // 0 à 360deg
              const scale = 1 + progress * 0.25; // 1 à 1.25

              testElement.style.transform = `translate(${translate}px, ${translate}px) scale(${scale}) rotate(${rotation}deg)`;
              testElement.style.filter = `blur(${blurValue}px)`;

              if (frameCount < totalFrames) {
                requestAnimationFrame(animate);
              } else {
                const end = performance.now();
                document.body.removeChild(testElement);

                // Calcule la moyenne des temps de frame (ignore les 3 premières pour 20 frames)
                const relevantFrames = frameTimes.slice(3);
                const sumFrameTimes = relevantFrames.reduce((a, b) => a + b, 0);
                const avgFrameTime = sumFrameTimes / relevantFrames.length;
                const totalTime = end - start;

                // Log des détails du test
                console.info('🎯 Animation test details:', {
                  totalTime: Math.round(totalTime),
                  avgFrameTime: avgFrameTime.toFixed(2),
                  expectedFPS: (1000 / avgFrameTime).toFixed(1),
                });

                resolve(totalTime);
              }
            };

            requestAnimationFrame(animate);
          });
        };

        await waitForStableState();

        const firstLoad = isFirstLoad();

        // Délais minimaux - optimisé pour test à chaque chargement
        if (firstLoad) {
          // Premier chargement : attente courte pour stabilisation
          await new Promise((resolve) => setTimeout(resolve, 150));
        } else if (isBrowserBusy()) {
          // Navigation : attente minimale si navigateur occupé
          await new Promise((resolve) => setTimeout(resolve, 50));
        }

        // Attend un moment idle du navigateur (très court)
        await new Promise((resolve) => {
          if (typeof requestIdleCallback !== 'undefined') {
            requestIdleCallback(() => resolve(null), { timeout: 80 });
          } else {
            setTimeout(() => resolve(null), 16);
          }
        });

        let executionTime: number;
        let isTimeout = false;

        try {
          executionTime = await Promise.race([
            runAnimationPerformanceTest(),
            new Promise<never>((_, reject) => {
              setTimeout(() => {
                isTimeout = true;
                reject(new Error('Performance test timeout'));
              }, 1500); // Si ça timeout après 1.5s, c'est définitivement LOW
            }),
          ]);
        } catch (error) {
          console.warn(
            '⚠️ Performance test timeout after 1.5s, forcing LOW performance level',
            error,
          );
          executionTime = 1500;
        }

        // Calcul du score d'animation (0-100) - basé UNIQUEMENT sur le temps d'exécution
        let animationScore = 100;
        if (isTimeout || executionTime > 1200) {
          animationScore = 10;
        } else if (executionTime > THRESHOLD.ANIMATION_HIGH) {
          animationScore = 30;
        } else {
          animationScore = 100;
        }

        // Détermine le niveau de performance basé UNIQUEMENT sur le temps d'animation
        const performanceLevel: PERFORMANCE_LEVEL =
          executionTime <= THRESHOLD.ANIMATION_HIGH
            ? PERFORMANCE_LEVEL.HIGH
            : PERFORMANCE_LEVEL.LOW;

        // Si LOW, ce n'est pas à cause d'un OS ancien (on a déjà vérifié avant)
        const isOldOS = false;

        // Log détaillé des métriques - basé uniquement sur l'animation
        console.info('🎯 Performance Detection Complete');
        console.table({
          '⏱️ Animation Time': `${Math.round(executionTime)}ms`,
          '🎨 Score': `${animationScore}/100`,
          '⚡ Performance Level': performanceLevel.toUpperCase(),
          '🔄 First Load': firstLoad ? 'Yes' : 'No',
        });

        // Mise en cache pour 30 minutes
        const currentOSInfo = getOSInfo();
        try {
          const cacheData: CachedMetrics = {
            performanceLevel,
            executionTime,
            score: animationScore,
            timestamp: Date.now(),
            os: currentOSInfo.os,
            osVersion: currentOSInfo.version,
            isOldOS,
          };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(cacheData));
          console.info('💾 Performance metrics cached for 30 minutes');
        } catch (error) {
          console.warn('⚠️ Error caching performance metrics:', error);
        }

        // Mise à jour immédiate de l'état
        setMetrics({
          performanceLevel,
          executionTime,
          score: animationScore,
          isLoading: false,
          os: currentOSInfo.os,
          osVersion: currentOSInfo.version,
          isOldOS,
        });
      };

      detectPerformance();
    }
  }, []);

  return { ...metrics, getConditionalProps };
};

export default usePerformanceHook;
