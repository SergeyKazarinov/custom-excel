import ExcelComponent from '@core/ExcelComponent/ExcelComponent';
import $, { Dom } from '@src/core/dom/dom';
import createTable from './table.template';

export interface ITable {
  onClick: () => void;
  onMousedown: (event: MouseEvent) => void;
  onMousemove: () => void;
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
    if (event.target instanceof HTMLElement) {
      const resizeAttr = event.target.dataset.resize;

      const $resizer = $(event.target);
      const $parent = $resizer.closest('[data-type="resizable"]');
      const coords = $parent?.getCoords();

      const cells = this.$root.findAll(`[data-col="${$parent?.data?.col}"]`);

      document.onmousemove = (e) => {
        if (coords) {
          if (resizeAttr === 'col') {
            const delta = e.pageX - coords.right;
            const value = coords.width + delta;

            $parent?.css({ width: `${value}px` });

            cells?.forEach((element) => {
              if (element instanceof HTMLElement) {
                element.style.width = `${value}px`;
              }
            });
          } else {
            const delta = e.pageY - coords.bottom;
            const value = coords.height + delta;

            $parent?.css({ height: `${value}px` });

            cells?.forEach((element) => {
              if (element instanceof HTMLElement) {
                element.style.height = `${value}px`;
              }
            });
          }
        }
      };

      document.onmouseup = () => {
        document.onmousemove = null;
      };
    }
  }

  onMousemove() {}
}

export default Table;
