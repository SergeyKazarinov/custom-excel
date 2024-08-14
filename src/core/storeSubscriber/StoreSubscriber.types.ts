import { IExcelComponent } from '../excelComponent/ExcelComponent.types';

export interface IStoreSubscriber {
  /**
   * Подписать компоненты на события
   *
   * @template {IExcelComponent} T
   * @param {T[]} components
   */
  subscribeComponents<T extends IExcelComponent>(components: T[]): void;

  /** Отписаться от событий */
  unsubscribeFromStore(): void;
}
