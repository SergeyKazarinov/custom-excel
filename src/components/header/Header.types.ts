import { IInputEvent, IButtonEvent } from '@src/types/general';

export interface IHeader {
  /** Метод для настройки компонента до инициализации */
  prepare(): void;

  /**
   * Рендер Header
   *
   * @returns {string} - html-элемент header
   */
  toHTML(): string;

  /**
   * Событие изменения ввода текста в шапке (название таблицы)
   *
   * @param {IInputEvent} event - элемент, на котором происходит событие
   */
  onInput(event: IInputEvent): void;

  /**
   * События на клик иконок, которые находятся в шапке
   *
   * @param {IButtonEvent} event - элемент, на котором проихошло событие
   */
  onClick(event: IButtonEvent): void;
}
