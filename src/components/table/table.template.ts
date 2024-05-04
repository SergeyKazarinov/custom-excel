import { CHART_CODES } from '@src/consts/codes';
import toChar from '@src/helpers/toChar';

/**
 * Функция создания ячейки таблицы
 * @returns {HTMLElement} - ячейку таблицы
 */
const createCell = (rowNumber: number) => (_: unknown, colNumber: number) =>
  /* html */ `
<div
  class="table__cell"
  data-type="cell"
  data-col=${colNumber}
  data-id=${`${rowNumber}:${colNumber + 1}`}
  contenteditable
></div>
`;

/**
 * функция создания колонки
 * @param {string} colName - содержимое ячейки
 * @returns {HTMLElement} ячейку заголовка таблицы
 */
const createCol = (colName: string, index: number) => /* html */ `
    <div class="table__column" data-type="resizable" data-col=${index}>
      ${colName}
      <div class="table__col-resize" data-resize="col"></div>
    </div>
  `;

/**
 * Функция создает строку таблицы
 * @property {string} children - вложенный объект в строке (ячейка)
 * @property {string} rowName - название строки
 * @returns {HTMLElement} строку таблицы
 */
const createRow = ({ children = '', rowName = '' }: { children?: string; rowName?: string }) => {
  const resize = rowName && /* html */ `<div class="table__row-resize" data-resize="row"></div>`;

  return /* html */ `
    <div class="table__row" ${rowName && `data-type="resizable"`}>
      <div class="table__row_info">${rowName}
        ${resize}
      </div>
      <div class="table__row_data">
        ${children}
      </div>
    </div>
  `;
};

const createTable = (rowsCount: number = 100) => {
  const colsCount = CHART_CODES.Z - CHART_CODES.A + 1;
  const rows = [];

  const cols = Array.from({ length: colsCount }).map(toChar).map(createCol).join('');
  const cells = (rowNumber: number) => Array.from({ length: colsCount }).map(createCell(rowNumber)).join('');

  rows.push(createRow({ children: cols }));
  Array.from({ length: rowsCount }).forEach((_, rowNumber) =>
    rows.push(createRow({ children: cells(rowNumber + 1), rowName: String(rowNumber + 1) }))
  );

  return `
  <div class="excel__table table">
    ${rows.join('')}
  </div>
  `;
};

export default createTable;
