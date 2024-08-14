import { TActions } from '@src/store/action.types';
import { IRootState } from '@src/store/store.types';
import { TCallback, IComponentOptions } from '@src/types/components';
import { TListeners } from '@src/types/listeners';
import { TTriggers } from '@src/types/observers';

type TChanges = Partial<Record<keyof IRootState, IRootState[keyof IRootState]>>;

export interface IExcelComponent {
  /* Метод для настройки компонента до инициализации */
  prepare(): void;

  /**
   * Возвращает шаблон компонента
   *
   * @returns {string} - html-строка
   */
  toHTML(): string;

  /** Инициализация компонента */
  init(): void;

  /**
   * Метод уведомления слушателя про событие
   *
   * @param {TTriggers} event - название события для наблюдателя
   * @param {...any[]} args - аргументы, передаваемые для выполняемого метода
   */
  $trigger(event: TTriggers, ...args: any[]): void;

  /**
   * Подписка на слушатель события
   *
   * @param {TTriggers} event - название события, за которым будет установлено наблюдение
   * @param {TCallback} fn - функция, которая будет выполняться при триггере события
   */
  $subscribe(event: TTriggers, fn: TCallback): void;

  /**
   * Метод для взаимодействия со store
   *
   * @param {TActions} action
   */
  $dispatch(action: TActions): void;

  /**
   * Метод для использования в дочерних классах.
   * В этот метод поступают изменения только по тем полям, на которые подписаны компоненты
   *
   * @param {Partial<IRootState>} changes - объект с измененными полями
   */
  changeStore(changes: TChanges): void;

  /**
   * Проверка на подписку события
   *
   * @param {keyof IRootState} key - ключ состояния
   * @returns {boolean}
   */
  isWatching(key: keyof IRootState): boolean;

  /** Удаление компонента и слушателей событий */
  destroy(): void;

  /**
   * Название компонента
   *
   * @type {string}
   */
  name: string;

  /**
   * Массив ключей глобального состояния таблицы
   *
   * @type {(keyof IRootState)[]}
   */
  subscribes: (keyof IRootState)[];
}

export interface IOptions extends IComponentOptions {
  name?: string;
  listeners?: TListeners[];
  subscribes?: (keyof IRootState)[];
}
