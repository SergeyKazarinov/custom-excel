import { Dom } from '../dom/dom';

export interface IPage {
  /**
   * Метод выбрасывает ошибку, если не реализован в классах наследников
   *
   * @returns {Dom}
   */
  getRoot(): Dom;

  /** Выполняется после рендера dom-дерева */
  afterRender(): void;

  /** Метод выполняется при размонтировании компонента */
  destroy(): void;
}
