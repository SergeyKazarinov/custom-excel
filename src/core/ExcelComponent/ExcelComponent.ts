// eslint-disable-next-line
import DomListener from '@core/DomListener/DomListener';

export interface IExcelComponent {
  toHTML(): string;
}

class ExcelComponent extends DomListener implements IExcelComponent {
  toHTML() {
    return '';
  }
}

export default ExcelComponent;
