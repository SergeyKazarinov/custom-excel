import { KEYBOARDS } from '@src/consts/codes';
import $, { Dom } from '@src/core/dom/dom';
import ExcelComponent from '@src/core/excelComponent/ExcelComponent';
import { IComponentOptions } from '@src/types/components';
import handleMatrix from './helpers/handleMatrix';
import handleResize from './helpers/handleResize';
import isCell from './helpers/isCell';
import nextSelector from './helpers/nextSelector';
import createTable from './table.template';
import TableSelection from './TableSelection';

interface IInputEvent extends InputEvent {
  target: HTMLInputElement;
}
export interface ITable {
  onMousedown: (event: MouseEvent) => void;
  onKeydown: (event: KeyboardEvent) => void;
  onInput(event: IInputEvent): void;
  selectCell($cell: Dom): void;
}

class Table extends ExcelComponent implements ITable {
  static className = 'excel__table table';

  private selection: TableSelection;

  constructor($root: Dom, options: IComponentOptions) {
    super($root, {
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
    this.selection = new TableSelection();
  }

  toHTML(): string {
    return createTable();
  }

  selectCell($cell: Dom): void {
    this.selection.select($cell);
    this.$trigger('table:select', $cell);
  }

  init() {
    super.init();
    const $cell = this.$root.find(`[data-id="1:1"]`);
    if ($cell) {
      this.selectCell($cell);
    }

    this.$subscribe('formula:input', (text) => {
      this.selection.currentCell?.text(text);
    });

    this.$subscribe('formula:done', () => {
      this.selection.currentCell?.focus();
    });
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

  onKeydown(event: KeyboardEvent): void {
    const keys = Object.values<string>(KEYBOARDS);
    const { key } = event;

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const currentCell = this.selection.currentCell?.getId(true);
      if (currentCell) {
        const $next = this.$root.find(nextSelector(key, currentCell));
        if ($next) {
          this.selectCell($next);
        }
      }
    }
  }

  onInput(event: IInputEvent) {
    this.$trigger('table:input', $(event.target));
  }
}

export default Table;
