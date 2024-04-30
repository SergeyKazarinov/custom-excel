/**
 * Метод получения диапазона чисел.
 * @param {number} start - Начальное значение
 * @param {number} end - конечное значение
 * @returns {Array} Массив чисел диапазона
 */
const range = (start: number, end: number): number[] => {
  if (start > end) {
    [end, start] = [start, end];
  }
  return new Array(end - start + 1).fill('').map((_, index) => start + index);
};

export default range;
