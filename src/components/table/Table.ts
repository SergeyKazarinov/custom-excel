import ExcelComponent from '@core/ExcelComponent/ExcelComponent';
import { Dom } from '@src/core/dom/dom';
import handleResize from './helpers/handleResize';
import createTable from './table.template';

export interface ITable {
  onClick: () => void;
  onMousedown: (event: MouseEvent) => void;
}

class Table extends ExcelComponent implements ITable {
  static className = 'excel__table table';

  constructor($root: Dom) {
    super($root, {
      listeners: ['mousedown'],
    });
  }

  toHTML(): string {
    return createTable();
  }

  onClick() {}

  onMousedown(event: MouseEvent) {
    handleResize(event, this.$root);
  }
}

export default Table;
