export function clamp(min: number, val: number, max: number): number {
  return Math.max(min, Math.min(val, max));
}

export function clampVw(minPx: number, vwValue: number, maxPx: number): number {
  const viewportWidth = window.innerWidth;
  const preferredPx = viewportWidth * (vwValue / 100);
  return clamp(minPx, preferredPx, maxPx);
}

export function clampVh(minPx: number, vhValue: number, maxPx: number): number {
  const viewportHeight = window.innerHeight;
  const preferredPx = viewportHeight * (vhValue / 100);
  return clamp(minPx, preferredPx, maxPx);
}
