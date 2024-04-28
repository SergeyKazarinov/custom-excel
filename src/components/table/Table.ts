import ExcelComponent from '@core/ExcelComponent/ExcelComponent';
import createTable from './table.template';

export interface ITable {}

class Table extends ExcelComponent implements ITable {
  static className = 'excel__table table';

  toHTML(): string {
    return createTable();
  }
}

export default Table;
