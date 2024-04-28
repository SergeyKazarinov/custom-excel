import { CHART_CODES } from '@src/consts/codes';

/**
 * Функция перевода из CharCode в символ, начиная с 65 кода
 * @param {unknown} _ - элемент массива
 * @param {number} index - индекс
 * @returns символ в виде строки
 */
const toChar = (_: unknown, index: number) => String.fromCharCode(CHART_CODES.A + index);

export default toChar;
