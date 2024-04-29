import $ from '@core/dom/dom';
import { IExcelComponent } from '@core/ExcelComponent/ExcelComponent';

interface IExcelOptions<T> {
  components: (new (...arg: any[]) => T)[];
}

class Excel<T extends IExcelComponent> {
  public $el;

  public components: (new (...arg: any[]) => T)[];

  public objectComponents: T[];

  constructor(selector: string, options: IExcelOptions<T>) {
    this.$el = $(selector);
    this.components = options.components || [];
    this.objectComponents = [];
  }

  getRoot() {
    const $root = $.create('div', 'excel');

    this.objectComponents = this.components.map((Component) => {
      const $element = $.create('div');
      const component = new Component($element);
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
}

export default Excel;
