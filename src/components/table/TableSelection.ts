import { Dom } from '@src/core/dom/dom';

interface ITableSelection {
  clear(): void;
  select($el: Dom): void;
  selectGroup(): void;
}

class TableSelection implements ITableSelection {
  static selectedClassName = 'table__cell_selected';

  private group: Dom[];

  constructor() {
    this.group = [];
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
    $el.addClass(TableSelection.selectedClassName);
  }

  selectGroup() {}
}

export default TableSelection;
