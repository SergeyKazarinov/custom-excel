import ExcelComponent from '@core/ExcelComponent/ExcelComponent';
import { KEYBOARDS } from '@src/consts/codes';
import $, { Dom } from '@src/core/dom/dom';
import handleMatrix from './helpers/handleMatrix';
import handleResize from './helpers/handleResize';
import isCell from './helpers/isCell';
import nextSelector from './helpers/nextSelector';
import createTable from './table.template';
import TableSelection from './TableSelection';

export interface ITable {
  onMousedown: (event: MouseEvent) => void;
  onKeydown: (event: KeyboardEvent) => void;
}

class Table extends ExcelComponent implements ITable {
  static className = 'excel__table table';

  private selection: TableSelection;

  constructor($root: Dom) {
    super($root, {
      listeners: ['mousedown', 'keydown'],
    });
    this.selection = new TableSelection();
  }

  toHTML(): string {
    return createTable();
  }

  init() {
    super.init();
    const $cell = this.$root.find(`[data-id="1:1"]`);
    if ($cell) {
      this.selection.select($cell);
    }
  }

  onMousedown(event: MouseEvent) {
    handleResize(event, this.$root);

    if (isCell(event) && event.target instanceof Element) {
      const $target = $(event.target);

      if (event.shiftKey) {
        const $cells = handleMatrix($target, this.selection.currentCell)
          .map((id) => this.$root.find(`[data-id="${id}"]`))
          .filter((item) => !!item) as Dom[];

        this.selection.selectGroup($cells);
      } else {
        this.selection.select($target);
      }
    }
  }

  onKeydown(event: KeyboardEvent) {
    const keys = Object.values<string>(KEYBOARDS);
    const { key } = event;

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const currentCell = this.selection.currentCell?.getId(true);
      if (currentCell) {
        const $next = this.$root.find(nextSelector(key, currentCell));
        if ($next) this.selection.select($next);
      }
    }
  }
}

export default Table;
