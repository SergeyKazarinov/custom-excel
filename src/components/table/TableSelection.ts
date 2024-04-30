import { Dom } from '@src/core/dom/dom';

interface ITableSelection {
  clear(): void;
  select($el: Dom): void;
  selectGroup($group: Dom[]): void;
}

class TableSelection implements ITableSelection {
  static selectedClassName = 'table__cell_selected';

  private group: Dom[];

  public currentCell: null | Dom;

  constructor() {
    this.group = [];
    this.currentCell = null;
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

    this.currentCell = $el;
  }

  selectGroup($group: Dom[]) {
    this.clear();

    this.group = $group;
    this.group.forEach(($el) => $el.addClass(TableSelection.selectedClassName));
  }
}

export default TableSelection;
