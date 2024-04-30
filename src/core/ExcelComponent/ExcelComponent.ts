// eslint-disable-next-line
import { Dom } from '@core/dom/dom';
import DomListener from '@core/DomListener/DomListener';
import { TListeners } from '@src/types/listeners';

export interface IExcelComponent {
  prepare(): void;
  toHTML(): string;
  init(): void;
  destroy(): void;
  name?: string;
}

export interface IOptions {
  name?: string;
  listeners?: TListeners[];
}
class ExcelComponent extends DomListener implements IExcelComponent {
  constructor($root: Dom, options: IOptions = {}) {
    super($root, options);
    this.prepare();
  }

  /**
   * Метод для написания логики в классах наследниках, которая выполняется при монтировании.
   */
  prepare() {}

  toHTML() {
    return '';
  }

  init() {
    this.initDomListeners();
  }

  destroy() {
    this.removeDomListeners();
  }
}

export default ExcelComponent;
