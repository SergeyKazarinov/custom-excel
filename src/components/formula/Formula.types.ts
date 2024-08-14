import { IRootState } from '@src/store/store.types';
import { IDivClickEvent } from '@src/types/general';

export interface IFormula {
  /** Инициализация компонента при монтировании */
  init(): void;

  /**
   * Рендер html-строки
   *
   * @returns {string} - html-элемент
   */
  toHTML(): string;

  /**
   * слушатель события input
   *
   * @param {IDivClickEvent} event - элемент, на котором происходит событие
   */
  onInput(event: IDivClickEvent): void;

  /**
   * Слушатель события клавиатуры. Переход на другой элемент
   *
   * @param {KeyboardEvent} event - элемент, на котором происходит событие
   */
  onKeydown(event: KeyboardEvent): void;

  /**
   * Изменение состояния стора в формуле таблицы
   *
   * @param {Partial<IRootState>} changes
   */
  changeStore(changes: Partial<IRootState>): void;
}
