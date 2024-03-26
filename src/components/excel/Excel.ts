import $ from '@core/dom/dom';
import { IExcelComponent } from '@core/ExcelComponent/ExcelComponent';

interface IExcelOptions<T> {
  components: (new (...arg: any[]) => T)[];
}

class Excel<T extends IExcelComponent> {
  public $el;

  public components: (new (...arg: any[]) => T)[];

  constructor(selector: string, options: IExcelOptions<T>) {
    this.$el = $(selector);
    this.components = options.components || [];
  }

  getRoot() {
    const $root = $.create('div', 'excel');

    this.components.forEach((Component) => {
      const $element = $.create('div');
      const component = new Component($element);
      $element.html(component.toHTML());
      $root.append($element);
    });
    return $root;
  }

  render() {
    this.$el?.append(this.getRoot());
  }
}

export default Excel;
