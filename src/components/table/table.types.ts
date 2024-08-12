import { Dom } from '@src/core/dom/dom';
import { IRootState } from '@src/store/store.types';
import { IInputEvent } from '@src/types/general';

export interface ITable {
  /**
   * Рендер таблицы в dom-дерево
   *
   * @returns {string} - html-элемент таблицы
   */
  toHTML(): string;

  /**
   * Выделение ячейки таблицы
   *
   * @param {Dom} $cell - ячейка, на которой произошел focus
   */
  selectCell($cell: Dom): void;

  /**
   * Изменение ширины/высоты таблицы
   *
   * @param {MouseEvent} event - строка или столбец, на котором происходит изменение свойства
   * @returns {Promise<void>}
   */
  resizeTable(event: MouseEvent): Promise<void>;

  /**
   * Инициализация таблицы:
   * фокусировка ячейки
   * установка слушателей событий
   */
  init(): void;

  /**
   * Событие нажатие мыши элемента
   *
   * @type {(event: MouseEvent) => void} - элемент, на котором произошло событие
   */
  onMousedown: (event: MouseEvent) => void;

  /**
   * выделяет несколько ячеек, если нажата клавиша shift
   *
   * @type {(event: KeyboardEvent) => void} - ячейка, на которую нажали с клавишой shift
   */
  onKeydown: (event: KeyboardEvent) => void;

  /**
   * Изменение текста на текущей ячейке и сохранение в store
   *
   * @param {string} text - обновленный текст
   */
  updateCurrentTextInStore(text: string): void;

  /**
   * Изменение текста при изменении содержимого ячейки и сохранение в store
   *
   * @param {IInputEvent} event - ячейка, на которой происходит событие
   */
  onInput(event: IInputEvent): void;
}
export interface ICreateTable {
  rowsCount?: number;
  state: IRootState;
}

export interface ICreateCol {
  colName: string;
  index: number;
  colWidth: string;
}
