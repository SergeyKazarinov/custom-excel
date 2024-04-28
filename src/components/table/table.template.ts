import { CHART_CODES } from '@src/consts/codes';
import toChar from '@src/helpers/toChar';

/**
 * Функция создания ячейки таблицы
 * @returns {HTMLElement} - ячейку таблицы
 */
const createCell = () => `
    <div class="table__cell" contenteditable></div>
  `;

/**
 * функция создания колонки
 * @param {string} colName - содержимое ячейки
 * @returns {HTMLElement} ячейку заголовка таблицы
 */
const createCol = (colName: string) => `
    <div class="table__column">${colName}</div>
  `;

/**
 * Функция создает строку таблицы
 * @property {string} children - вложенный объект в строке (ячейка)
 * @property {string} rowName - название строки
 * @returns {HTMLElement} строку таблицы
 */
const createRow = ({ children = '', rowName = '' }: { children?: string; rowName?: string }) => `
    <div class="table__row">
      <div class="table__row_info">${rowName}</div>

      <div class="table__row_data">
        ${children}
      </div>
    </div>
  `;

const createTable = (rowsCount: number = 100) => {
  const colsCount = CHART_CODES.Z - CHART_CODES.A + 1;
  const rows = [];

  const cols = Array.from({ length: colsCount }).map(toChar).map(createCol).join('');
  const cells = Array.from({ length: colsCount }).map(createCell).join('');

  rows.push(createRow({ children: cols }));
  Array.from({ length: rowsCount }).forEach((_, index) =>
    rows.push(createRow({ children: cells, rowName: String(index + 1) }))
  );

  return `
  <div class="excel__table table">
    ${rows.join('')}
  </div>
  `;
};

export default createTable;
