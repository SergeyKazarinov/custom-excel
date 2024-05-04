import $ from '@core/dom/dom';
import { IExcelComponent } from '@src/core/excelComponent/ExcelComponent';
import Observer from '@src/core/observer/Observer';

interface IExcelOptions<T> {
  components: (new (...arg: any[]) => T)[];
}

class Excel<T extends IExcelComponent> {
  public $el;

  public components: (new (...arg: any[]) => T)[];

  public objectComponents: T[];

  private observer: Observer;

  constructor(selector: string, options: IExcelOptions<T>) {
    this.$el = $(selector);
    this.components = options.components || [];
    this.objectComponents = [];
    this.observer = new Observer();
  }

  getRoot() {
    const $root = $.create('div', 'excel');

    const componentOptions = {
      observer: this.observer,
    };

    this.objectComponents = this.components.map((Component) => {
      const $element = $.create('div');
      const component = new Component($element, componentOptions);
      $element.html(component.toHTML());
      $root.append($element);

      // debug
      if (component.name) {
        window[`c${component.name}`] = component;
      }

      return component;
    });
    return $root;
  }

  render() {
    this.$el?.append(this.getRoot());

    this.objectComponents.forEach((component) => {
      component.init();
    });
  }

  destroy() {
    this.objectComponents.forEach((component) => component.destroy());
  }
}

export default Excel;
