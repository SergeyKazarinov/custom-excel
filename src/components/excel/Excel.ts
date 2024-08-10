import $ from '@core/dom/dom';
import { IExcelComponent } from '@src/core/excelComponent/ExcelComponent.types';
import Observer from '@src/core/observer/Observer';
import StoreSubscriber from '@src/core/storeSubscriber/StoreSubscriber';
import { TActions } from '@src/store/action.types';
import { updateDate } from '@src/store/actions';
import { IReturnCreateStore, IRootState } from '@src/store/store.types';

interface IExcelOptions<T> {
  components: (new (...arg: any[]) => T)[];
  store: IReturnCreateStore<IRootState, TActions>;
}

class Excel<T extends IExcelComponent> {
  public components: (new (...arg: any[]) => T)[];

  public objectComponents: T[];

  private observer: Observer;

  private store: IReturnCreateStore<IRootState, TActions>;

  public subscriber: StoreSubscriber;

  constructor(options: IExcelOptions<T>) {
    this.components = options.components || [];
    this.objectComponents = [];
    this.observer = new Observer();
    this.store = options.store;
    this.subscriber = new StoreSubscriber(this.store);
  }

  getRoot() {
    const $root = $.create('div', 'excel');

    const componentOptions = {
      observer: this.observer,
      store: this.store,
    };

    this.objectComponents = this.components.map((Component) => {
      const $element = $.create('div');
      const component = new Component($element, componentOptions);
      $element.html(component.toHTML());
      $root.append($element);

      return component;
    });
    return $root;
  }

  init() {
    this.store.dispatch(updateDate());
    this.subscriber.subscribeComponents(this.objectComponents);
    this.objectComponents.forEach((component) => {
      component.init();
    });
  }

  destroy() {
    this.objectComponents.forEach((component) => component.destroy());
    this.subscriber.unsubscribeFromStore();
  }
}

export default Excel;
