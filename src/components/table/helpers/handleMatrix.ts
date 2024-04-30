import { Dom } from '@src/core/dom/dom';
import range from './range';

/**
 * Функция получения массива id ячеек.
 * @param {Dom} target - dom элемент выделенной ячейки
 * @param {Dom | null} current - dom элемент ячейки, по которой произошел клик
 * @returns Массив ID диапазона ячеек
 */
const handleMatrix = ($target: Dom, $current: Dom | null) => {
  const target = $target.getId<true>(true);
  const current = $current?.getId(true);

  let cols: number[] = [];
  let rows: number[] = [];
  if (target && current) {
    cols = range(current.col, target.col);
    rows = range(current.row, target.row);

    const selectedIds = cols.reduce((acc: string[], colNumber: number) => {
      rows.forEach((rowNumber) => acc.push(`${rowNumber}:${colNumber}`));
      return acc;
    }, []);
    return selectedIds;
  }
  return [];
};

export default handleMatrix;
