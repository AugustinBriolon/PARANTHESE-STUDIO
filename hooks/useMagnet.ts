import { gsap } from 'gsap';
import { MouseEvent } from 'react';
import { isTouchDevice } from './useTouchDevice';

export const useMagnet = (event: MouseEvent<HTMLElement>, speed: number) => {
  if (isTouchDevice()) return;
  const bounding = event.currentTarget.getBoundingClientRect();
  const { width, height, left, top } = bounding;
  const x = ((event.clientX - left) / width - 0.5) * (30 * speed);
  const y = ((event.clientY - top) / height - 0.5) * (30 * speed);

  gsap.to(event.currentTarget, {
    duration: 1,
    x,
    y,
  });
};

export const useResetMagnet = (event: MouseEvent<HTMLElement>) => {
  if (isTouchDevice()) return;
  gsap.to(event.currentTarget, {
    duration: 1,
    ease: 'elastic.out',
    x: 0,
    y: 0,
  });
};
