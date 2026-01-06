import Button from '@/components/ui/button';
import { useCallback, useEffect, useMemo, useState } from 'react';

const CELL_WIDTH = 120;
const CELL_HEIGHT = 60;
const BUTTON_SPAN = 2;

export default function Error() {
  const [hoveredCells, setHoveredCells] = useState<Set<number>>(new Set());
  const [gridConfig, setGridConfig] = useState({ cols: 0, rows: 0 });

  useEffect(() => {
    const calculateGrid = () => {
      const cols = Math.floor(window.innerWidth / CELL_WIDTH) * 2;
      const rows = Math.floor(window.innerHeight / CELL_HEIGHT) * 2;
      setGridConfig({ cols: Math.max(1, cols), rows: Math.max(1, rows) });
    };

    calculateGrid();
    window.addEventListener('resize', calculateGrid);
    return () => window.removeEventListener('resize', calculateGrid);
  }, []);

  const handleCellHover = useCallback(
    (index: number) => {
      setHoveredCells((prev) => {
        const newSet = prev.has(index) ? prev : new Set(prev).add(index);
        const total = gridConfig.cols * gridConfig.rows;
        if (newSet.size === total) {
          return new Set();
        }
        return newSet;
      });
    },
    [gridConfig],
  );

  const buttonPosition = useMemo(
    () => ({
      colStart: Math.max(0, gridConfig.cols - BUTTON_SPAN),
      rowStart: Math.max(0, gridConfig.rows - BUTTON_SPAN),
    }),
    [gridConfig.cols, gridConfig.rows],
  );

  const buttonCellIndex = useMemo(
    () => buttonPosition.rowStart * gridConfig.cols + buttonPosition.colStart,
    [buttonPosition, gridConfig.cols],
  );

  const isInButtonArea = useCallback(
    (row: number, col: number) => {
      return (
        col >= buttonPosition.colStart &&
        col < buttonPosition.colStart + BUTTON_SPAN &&
        row >= buttonPosition.rowStart &&
        row < buttonPosition.rowStart + BUTTON_SPAN
      );
    },
    [buttonPosition],
  );

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div
        className="grid h-full w-full place-items-center"
        style={{
          gridTemplateColumns: `repeat(${gridConfig.cols}, 1fr)`,
          gridTemplateRows: `repeat(${gridConfig.rows}, 1fr)`,
        }}
      >
        {Array.from({ length: gridConfig.cols * gridConfig.rows }, (_, index) => {
          const row = Math.floor(index / gridConfig.cols);
          const col = index % gridConfig.cols;

          if (index === buttonCellIndex) {
            return (
              <div
                key={index}
                className="px-2"
                style={{
                  gridColumn: `${buttonPosition.colStart + 1} / span ${BUTTON_SPAN}`,
                  gridRow: `${buttonPosition.rowStart + 1} / span ${BUTTON_SPAN}`,
                }}
              >
                <Button className="w-full" href="/">
                  Home
                </Button>
              </div>
            );
          }

          if (isInButtonArea(row, col)) return null;

          return (
            <div
              key={index}
              className={`text-black transition-all select-none ${
                hoveredCells.has(index) ? 'scale-95 opacity-0' : ''
              }`}
              onMouseEnter={() => handleCellHover(index)}
            >
              <span>(404)</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
