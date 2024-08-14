import { Dom } from '@src/core/dom/dom';
import { TActions } from '@src/store/action.types';
import { IReturnCreateStore, IRootState } from '@src/store/store.types';

export interface IExcelOptions<T> {
  /**
   * Массив компонентов
   *
   * @type {(new (...arg: any[]) => T)[]}
   */
  components: (new (...arg: any[]) => T)[];

  /**
   * Глобальный стор
   *
   * @type {IReturnCreateStore<IRootState, TActions>}
   */
  store: IReturnCreateStore<IRootState, TActions>;
}

export interface IExcel {
  /**
   * Получение корневого Dom-элемента
   *
   * @returns {Dom}
   */
  getRoot(): Dom;

  /** Инициализация компонента при монтировании */
  init(): void;

  /** Размонтирование компонента */
  destroy(): void;
}
