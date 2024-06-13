import { defaultTitle } from '@src/consts/consts';
import $, { Dom } from '@src/core/dom/dom';
import ExcelComponent from '@src/core/excelComponent/ExcelComponent';
import debounce from '@src/helpers/debounce';
import { changeTitle } from '@src/store/actions';
import { IComponentOptions } from '@src/types/components';
import { IInputEvent } from '@src/types/general';

interface IHeader {}

class Header extends ExcelComponent implements IHeader {
  static className: string = 'header';

  constructor($root: Dom, options: IComponentOptions) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options,
    });
  }

  prepare(): void {
    this.onInput = debounce(this.onInput.bind(this), 500);
  }

  toHTML(): string {
    const { title = defaultTitle } = this.store.getState();
    return `
    <header class="excel__header header">
      <input type="text" class="header__input" value="${title}" spellcheck/>

      <div>
        <button class="header__button">
          <span class="material-icons"> delete </span>
        </button>
        <button class="header__button">
          <span class="material-icons"> logout </span>
        </button>
      </div>
    </header>
    `;
  }

  onInput(event: IInputEvent) {
    const $target = $(event.target);
    this.$dispatch(changeTitle($target.text()));
  }
}

export default Header;
