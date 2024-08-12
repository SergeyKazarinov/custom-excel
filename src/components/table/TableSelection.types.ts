import { Dom } from '@src/core/dom/dom';
import { TCSSStyles } from '@src/types/general';

export interface ITableSelection {
  /** Удаление класса, которые добавляет состояние выделения */
  clear(): void;

  /**
   * Добавление класса, который добавляет состояние выделения
   * Перед этим очищает предыдущие выделения
   *
   * @param {Dom} $el - dom-элемент ячейки
   */
  select($el: Dom): void;

  /**
   * Добавление класса, который добавляет состояние выделения для группы ячеек
   *
   * @param {Dom[]} $group - массив выделенных ячеек
   */
  selectGroup($group: Dom[]): void;

  /**
   * Добавляет css-стили для выделенных ячеек
   *
   * @param {TCSSStyles} style
   */
  applyStyle(style: TCSSStyles): void;
}
