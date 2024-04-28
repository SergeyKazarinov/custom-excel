// eslint-disable-next-line
import { Dom } from '@core/dom/dom';
import DomListener from '@core/DomListener/DomListener';
import { TListeners } from '@src/types/listeners';

export interface IExcelComponent {
  toHTML(): string;
  init(): void;
}

export interface IOptions {
  name?: string;
  listeners?: TListeners[];
}
class ExcelComponent extends DomListener implements IExcelComponent {
  constructor($root: Dom, options: IOptions = {}) {
    super($root, options);
  }

  toHTML() {
    return '';
  }

  init() {
    this.initDomListeners();
  }
}

export default ExcelComponent;
