import { Dom } from '@src/core/dom/dom';
import { TCSSStyles } from '@src/types/general';
import { ITableSelection } from './TableSelection.types';

class TableSelection implements ITableSelection {
  static selectedClassName = 'table__cell_selected';

  private group: Dom[];

  public currentCell: null | Dom;

  constructor() {
    this.group = [];
    this.currentCell = null;
  }

  get selectedIds() {
    return this.group.map(($el) => $el.getId<false>());
  }

  clear() {
    this.group.forEach(($cell) => {
      $cell.removeClass(TableSelection.selectedClassName);
    });
    this.group = [];
  }

  select($el: Dom) {
    this.clear();
    this.group.push($el);
    $el.focus().addClass(TableSelection.selectedClassName);

    this.currentCell = $el;
  }

  selectGroup($group: Dom[]) {
    this.clear();

    this.group = $group;
    this.group.forEach(($el) => $el.addClass(TableSelection.selectedClassName));
  }

  applyStyle(style: TCSSStyles): void {
    this.group.forEach((element) => element.css(style));
  }
}

export default TableSelection;
