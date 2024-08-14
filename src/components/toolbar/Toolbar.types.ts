import { IRootState } from '@src/store/store.types';

export interface IToolbar {
  /** Метод для настройки компонента до инициализации  */
  prepare(): void;

  /**
   * Выполнение слушателя события "click"
   *
   * @param {Event} event - элемент тулбара, на котором произошло событие
   */
  onClick(event: Event): void;

  /** Рендер toolbar */
  toHTML(): void;

  /**
   * Изменение стилей компонента
   *
   * @param {IRootState} changes - новые стили компонента
   */
  changeStore(changes: IRootState): void;
}
