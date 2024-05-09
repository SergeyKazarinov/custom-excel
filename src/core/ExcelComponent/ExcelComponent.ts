// eslint-disable-next-line
import { Dom } from '@core/dom/dom';
import DomListener from '@src/core/domListener/DomListener';
import { IComponentOptions, TCallback } from '@src/types/components';
import { TListeners } from '@src/types/listeners';
import { TTriggers } from '@src/types/observers';
import { IReturnCreateStore, IRootState } from '@src/store/store.types';
import { TActions } from '@src/store/action.types';
import Observer from '../observer/Observer';

export interface IExcelComponent {
  prepare(): void;
  toHTML(): string;
  init(): void;
  $trigger(event: TTriggers, ...args: any[]): void;
  $subscribe(event: TTriggers, fn: TCallback): void;
  $dispatch(action: TActions): void;
  destroy(): void;
  name: string;
}

export interface IOptions extends IComponentOptions {
  name?: string;
  listeners?: TListeners[];
}
class ExcelComponent extends DomListener implements IExcelComponent {
  public name: string;

  protected observer: Observer | null;

  private unsubscribers: TCallback[];

  protected store: IReturnCreateStore<IRootState, TActions>;

  private storeSub: ReturnType<typeof this.store.subscribe> | null;

  constructor($root: Dom, options: IOptions = {}) {
    super($root, options);
    this.observer = options.observer ?? null;
    this.store = options.store;
    this.name = options.name ?? '';
    this.unsubscribers = [];
    this.prepare();
    this.storeSub = null;
  }

  /* Метод для настройки компонента до инициализации */
  prepare() {}

  /** Возвращает шаблон компонента */
  toHTML() {
    return '';
  }

  /** Метод уведомления слушателя про событие */
  $trigger(event: TTriggers, ...args: any[]) {
    this.observer?.trigger(event, ...args);
  }

  /** Метод подписания на событие event */
  $subscribe(event: TTriggers, fn: TCallback) {
    const unsub = this.observer?.subscribe(event, fn);
    if (unsub) this.unsubscribers.push(unsub);
  }

  /** Метод для взаимодействия со store */
  $dispatch(action: TActions) {
    this.store.dispatch(action);
  }

  $subscribeStore(fn: (state: IRootState) => void) {
    this.storeSub = this.store.subscribe(fn);
  }

  /** Инициализация компонента */
  init() {
    this.initDomListeners();
  }

  /** Удаление компонента и чистка слушателей */
  destroy() {
    this.removeDomListeners();
    this.unsubscribers.forEach((unsub) => unsub());
    this.storeSub?.unsubscribe();
  }
}

export default ExcelComponent;
