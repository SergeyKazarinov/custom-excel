import ExcelComponent from '@core/ExcelComponent/ExcelComponent';

export interface ITable {}

class Table extends ExcelComponent implements ITable {
  static className = 'excel__table table';

  toHTML(): string {
    return `
      <div class="excel__table table">
        <div class="table__row">
          <div class="table__row_info"></div>

          <div class="table__row_data">
            <div class="table__column">A</div>
            <div class="table__column">B</div>
            <div class="table__column">C</div>
          </div>
        </div>

        <div class="table__row">
          <div class="table__row_info">1</div>

          <div class="table__row_data">
            <div class="table__cell table__cell_selected" contenteditable>A1</div>
            <div class="table__cell" contenteditable>B1</div>
            <div class="table__cell" contenteditable>C1</div>
          </div>
        </div>

        <div class="table__row">
          <div class="table__row_info">2</div>

          <div class="table__row_data">
            <div class="table__cell table__cell_selected" contenteditable>A2</div>
            <div class="table__cell" contenteditable>B2</div>
            <div class="table__cell" contenteditable>C2</div>
          </div>
        </div>
      </div>
    `;
  }
}

export default Table;
