import { TListeners } from '@src/types/listeners';
import { Dom } from '../dom/dom';

export interface IDomListener {
  /**
   * Корневой Dom-элумент
   *
   * @type {Dom}
   */
  $root: Dom;

  /**
   * Массив типов слушателей событий
   *
   * @type {TListeners[]}
   */
  listeners: TListeners[];

  /**
   * Название компонента
   *
   * @type {string}
   */
  name: string;

  /** Добавление слушателей событий */
  initDomListeners(): void;

  /** Удаление слушателей событий */
  removeDomListeners(): void;
}
