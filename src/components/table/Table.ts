import { KEYBOARDS } from '@src/consts/codes';
import $, { Dom } from '@src/core/dom/dom';
import ExcelComponent from '@src/core/excelComponent/ExcelComponent';
import { IComponentOptions } from '@src/types/components';
import * as actions from '@src/store/actions';
import { IToolbarState } from '@src/types/state';
import { initialToolbarState } from '@src/consts/consts';
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
  resizeTable(event: MouseEvent): Promise<void>;
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
    const state = this.store.getState();
    return createTable({ state });
  }

  selectCell($cell: Dom): void {
    this.selection.select($cell);
    this.$trigger('table:select', $cell);
    const styles = $cell.getStyles(Object.keys(initialToolbarState) as Array<keyof IToolbarState>);
    this.$dispatch(actions.getCurrentStyles(styles as IToolbarState));
  }

  async resizeTable(event: MouseEvent): Promise<void> {
    try {
      const data = await handleResize(event, this.$root);
      this.$dispatch(actions.tableResizeActionCreator(data));
    } catch (e) {
      console.error(e);
    }
  }

  init() {
    super.init();
    const $cell = this.$root.find(`[data-id="1:1"]`);
    if ($cell) {
      this.selectCell($cell);
    }

    this.$subscribe('formula:input', (text) => {
      this.selection.currentCell?.text(text);
      this.updateCurrentTextInStore(text);
    });

    this.$subscribe('formula:done', () => {
      this.selection.currentCell?.focus();
    });

    this.$subscribe('toolbar:applyStyle', (style: IToolbarState) => {
      this.selection.applyStyle(style);
      this.$dispatch(
        actions.applyStyles({
          ids: this.selection.selectedIds,
          value: style,
        })
      );
    });
  }

  onMousedown(event: MouseEvent) {
    this.resizeTable(event);

    if (isCell(event) && event.target instanceof HTMLElement) {
      const $target = $(event.target);

      if (event.shiftKey) {
        const $cells = handleMatrix($target, this.selection.currentCell)
          .map((id) => this.$root.find(`[data-id="${id}"]`))
          .filter((item) => !!item) as Dom[];

        this.selection.selectGroup($cells);
      } else {
        this.selectCell($target);
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

  updateCurrentTextInStore(text: string) {
    const id = this.selection.currentCell?.getId<false>();
    if (id) {
      this.$dispatch(
        actions.changeTextActionCreator({
          id,
          text,
        })
      );
    }
  }

  onInput(event: IInputEvent) {
    this.updateCurrentTextInStore($(event.target).text());
  }
}

export default Table;
