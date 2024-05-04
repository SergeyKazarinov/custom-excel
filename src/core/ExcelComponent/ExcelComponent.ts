// eslint-disable-next-line
import { Dom } from '@core/dom/dom';
import DomListener from '@src/core/domListener/DomListener';
import { IComponentOptions, TCallback } from '@src/types/components';
import { TListeners } from '@src/types/listeners';
import { TTriggers } from '@src/types/observers';
import Observer from '../observer/Observer';

export interface IExcelComponent {
  prepare(): void;
  toHTML(): string;
  init(): void;
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

  constructor($root: Dom, options: IOptions = {}) {
    super($root, options);
    this.observer = options.observer ?? null;
    this.name = options.name ?? '';
    this.unsubscribers = [];
    this.prepare();
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

  /** Инициализация компонента */
  init() {
    this.initDomListeners();
  }

  /** Удаление компонента и чистка слушателей */
  destroy() {
    this.removeDomListeners();
    this.unsubscribers.forEach((unsub) => unsub());
  }
}

export default ExcelComponent;
