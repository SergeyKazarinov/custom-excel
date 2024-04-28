import ExcelComponent from '@core/ExcelComponent/ExcelComponent';
import { Dom } from '@src/core/dom/dom';

export interface IToolbar {}

class Toolbar extends ExcelComponent implements IToolbar {
  static className = 'excel__toolbar toolbar';

  constructor($root: Dom) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
    });
  }

  onClick(event: Event) {
    console.log(event.target);
  }

  toHTML(): string {
    return `
      <div class="excel__toolbar toolbar">
        <button class="toolbar__button">
          <span class="material-icons"> format_align_left </span>
        </button>
        <button class="toolbar__button">
          <span class="material-icons"> format_align_center </span>
        </button>
        <button class="toolbar__button">
          <span class="material-icons"> format_align_right </span>
        </button>
        <button class="toolbar__button">
          <span class="material-icons"> format_bold </span>
        </button>
        <button class="toolbar__button">
          <span class="material-icons"> format_italic </span>
        </button>
        <button class="toolbar__button">
          <span class="material-icons"> format_underline </span>
        </button>
      </div>
    `;
  }
}

export default Toolbar;
