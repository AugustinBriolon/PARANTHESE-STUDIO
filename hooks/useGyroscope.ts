import { useEffect, useState, useRef } from 'react';

interface Gyroscope {
  x: number | null;
  y: number | null;
  isActive: boolean;
}

export const useGyroscope = () => {
  const [value, setValue] = useState<Gyroscope>({
    x: null,
    y: null,
    isActive: false,
  });

  const hasRequestedRef = useRef(false);
  const lastGammaRef = useRef<number | null>(null);
  const lastBetaRef = useRef<number | null>(null);
  const accumulatedXRef = useRef<number>(0);
  const accumulatedYRef = useRef<number>(0);

  useEffect(() => {
    const requestPermission = async (): Promise<boolean> => {
      if (typeof DeviceOrientationEvent === 'undefined') {
        return false;
      }

      const DeviceOrientationEventConstructor = DeviceOrientationEvent as {
        requestPermission?: () => Promise<'granted' | 'denied' | 'default'>;
      };

      if (DeviceOrientationEventConstructor.requestPermission) {
        try {
          const state = await DeviceOrientationEventConstructor.requestPermission();
          return state === 'granted';
        } catch {
          return false;
        }
      }

      return true;
    };

    const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
      if (event.beta === null || event.gamma === null) return;

      // Initialisation
      if (lastGammaRef.current === null || lastBetaRef.current === null) {
        lastGammaRef.current = event.gamma;
        lastBetaRef.current = event.beta;
        setValue({ x: 0, y: 0, isActive: true });
        return;
      }

      // Calcul des différences
      let deltaGamma = event.gamma - lastGammaRef.current;
      let deltaBeta = event.beta - lastBetaRef.current;

      // Correction du wrap-around pour gamma (-90 à 90)
      if (deltaGamma > 90) deltaGamma -= 180;
      if (deltaGamma < -90) deltaGamma += 180;

      // Correction du wrap-around pour beta (0 à 180)
      if (deltaBeta > 90) deltaBeta -= 180;
      if (deltaBeta < -90) deltaBeta += 180;

      // Accumulation
      accumulatedXRef.current += deltaGamma / 45;
      accumulatedYRef.current += deltaBeta / 45;

      // Mise à jour
      lastGammaRef.current = event.gamma;
      lastBetaRef.current = event.beta;

      setValue({
        x: accumulatedXRef.current,
        y: accumulatedYRef.current,
        isActive: true,
      });
    };

    const handleFirstInteraction = async () => {
      if (hasRequestedRef.current) return;
      hasRequestedRef.current = true;

      const granted = await requestPermission();
      if (granted) {
        window.removeEventListener('click', handleFirstInteraction);
        window.removeEventListener('touchend', handleFirstInteraction);
        window.addEventListener('deviceorientation', handleDeviceOrientation);
      }
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('touchend', handleFirstInteraction);

    return () => {
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchend', handleFirstInteraction);
    };
  }, []);

  return value;
};
