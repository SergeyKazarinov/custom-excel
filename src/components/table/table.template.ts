import { CHART_CODES } from '@src/consts/codes';
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '@src/consts/table';
import toChar from '@src/helpers/toChar';
import { IRootState } from '@src/store/store.types';
import { initialToolbarState } from '@src/consts/consts';
import { ICreateCol, ICreateTable } from './table.types';
import toInlineStyles from '../../helpers/toInlineStyles';

/**
 * Создает значение ширины столбца
 *
 * @param {Record<string, number>} colState - объект типа "ключ/значение" размеров ширины столбцов
 * @param {number} index - индекс столбца
 * @returns {string} ширину столбца
 */
const getWidth = (colState: Record<string, number>, index: number) => `${colState[index] || DEFAULT_WIDTH}px`;

/**
 * Создает значение высоты строки
 *
 * @param {Record<string, number>} colState - объект типа "ключ/значение" размеров высоты строк
 * @param {number} index - индекс строки
 * @returns {string} высоту строки
 */
const getHeight = (rowState: Record<string, number>, index: number) => `${rowState[index] || DEFAULT_HEIGHT}px`;

const withWidthFrom =
  (state: IRootState) =>
  (colName: string, index: number): ICreateCol => ({
    colName,
    index,
    colWidth: getWidth(state.colState, index),
  });

/**
 * Создание ячейки таблицы
 * @returns {HTMLElement} - ячейку таблицы
 */
const createCell = (rowNumber: number, state: IRootState) => (_: unknown, colNumber: number) => {
  const width = getWidth(state.colState, colNumber);
  const cellId = `${rowNumber}:${colNumber + 1}`;
  const data = state.dataState[cellId];
  const styles = toInlineStyles({ ...initialToolbarState, ...state.stylesState[cellId] });

  return /* html */ `
    <div
      class="table__cell"
      style="${styles}; width: ${width}"
      data-type="cell"
      data-col=${colNumber}
      data-id=${cellId}
      contenteditable
    >${data || ''}</div>
    `;
};

/**
 * Создание заголовка таблицы
 * @param {object} param0
 * @property {string} colName - содержимое ячейки
 * @property {number} index - номер колонки
 * @property {string} colWidth - ширина колонки в px
 * @returns {HTMLElement} ячейку заголовка таблицы
 */
const createCol = ({ colName, index, colWidth }: ICreateCol) => /* html */ `
    <div class="table__column" data-type="resizable" data-col=${index} style="width: ${colWidth}">
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
const createRow = ({
  children = '',
  rowName = '',
  rowState,
}: {
  children?: string;
  rowName?: string;
  rowState: Record<string, number>;
}) => {
  const resize = rowName && /* html */ `<div class="table__row-resize" data-resize="row"></div>`;
  const height = rowState ? getHeight(rowState, Number(rowName)) : `${DEFAULT_HEIGHT}px`;
  return /* html */ `
    <div class="table__row" ${rowName && `data-type="resizable"`} data-row=${rowName} style="height: ${height}">
      <div class="table__row_info">${rowName}
        ${resize}
      </div>
      <div class="table__row_data">
        ${children}
      </div>
    </div>
  `;
};

const createTable = ({ rowsCount = 100, state }: ICreateTable) => {
  const colsCount = CHART_CODES.Z - CHART_CODES.A + 1;
  const rows = [];

  const cols = Array.from({ length: colsCount }).map(toChar).map(withWidthFrom(state)).map(createCol).join('');

  const cells = (rowNumber: number) => Array.from({ length: colsCount }).map(createCell(rowNumber, state)).join('');

  rows.push(createRow({ children: cols, rowState: state.rowState }));
  Array.from({ length: rowsCount }).forEach((_, rowNumber) =>
    rows.push(createRow({ children: cells(rowNumber + 1), rowName: String(rowNumber + 1), rowState: state.rowState }))
  );

  return `
    <div class="excel__table table">
      ${rows.join('')}
    </div>
  `;
};

export default createTable;
