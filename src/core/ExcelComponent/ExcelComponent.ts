import { Dom } from '@core/dom/dom';
import DomListener from '@src/core/domListener/DomListener';
import { TActions } from '@src/store/action.types';
import { IReturnCreateStore, IRootState } from '@src/store/store.types';
import { TCallback, TChanges } from '@src/types/components';
import { TTriggers } from '@src/types/observers';
import Observer from '../observer/Observer';
import { IExcelComponent, IOptions } from './ExcelComponent.types';

class ExcelComponent extends DomListener implements IExcelComponent {
  public name: string;

  public subscribes: (keyof IRootState)[];

  protected observer: Observer | null;

  private unsubscribers: TCallback[];

  protected store: IReturnCreateStore<IRootState, TActions>;

  // private storeSub: ReturnType<typeof this.store.subscribe> | null;

  constructor($root: Dom, options: IOptions = {}) {
    super($root, options);
    this.observer = options.observer ?? null;
    this.subscribes = options.subscribes || [];
    this.store = options.store;
    this.name = options.name ?? '';
    this.unsubscribers = [];
    this.prepare();
    // this.storeSub = null;
  }

  prepare() {}

  toHTML() {
    return '';
  }

  init() {
    this.initDomListeners();
  }

  $trigger(event: TTriggers, ...args: any[]) {
    this.observer?.trigger(event, ...args);
  }

  $subscribe(event: TTriggers, fn: TCallback) {
    const unsub = this.observer?.subscribe(event, fn);
    if (unsub) this.unsubscribers.push(unsub);
  }

  $dispatch(action: TActions) {
    this.store.dispatch(action);
  }

  // eslint-disable-next-line
  changeStore(changes: TChanges): void {}

  isWatching(key: keyof IRootState): boolean {
    return this.subscribes.includes(key);
  }

  destroy() {
    this.removeDomListeners();
    this.unsubscribers.forEach((unsub) => unsub());
    // this.storeSub?.unsubscribe();
  }
}

export default ExcelComponent;
