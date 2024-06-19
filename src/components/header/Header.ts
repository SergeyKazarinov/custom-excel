import { DEFAULT_TITLE } from '@src/consts/consts';
import $, { Dom } from '@src/core/dom/dom';
import ExcelComponent from '@src/core/excelComponent/ExcelComponent';
import ActiveRoute from '@src/core/routes/ActiveRoute';
import debounce from '@src/helpers/debounce';
import { changeTitle } from '@src/store/actions';
import { IComponentOptions } from '@src/types/components';
import { IButtonEvent, IInputEvent } from '@src/types/general';

interface IHeader {}

class Header extends ExcelComponent implements IHeader {
  static className: string = 'header';

  constructor($root: Dom, options: IComponentOptions) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options,
    });
  }

  prepare(): void {
    this.onInput = debounce(this.onInput.bind(this), 500);
  }

  toHTML(): string {
    const { title = DEFAULT_TITLE } = this.store.getState();
    return `
    <header class="excel__header header">
      <input type="text" class="header__input" value="${title}" spellcheck/>

      <div>
        <button class="header__button" data-button="remove" >
          <span class="material-icons" data-button="remove"> delete </span>
        </button>
        <button class="header__button" data-button="exit">
          <span class="material-icons" data-button="exit"> logout </span>
        </button>
      </div>
    </header>
    `;
  }

  onInput(event: IInputEvent) {
    const $target = $(event.target);
    this.$dispatch(changeTitle($target.text()));
  }

  onClick(event: IButtonEvent) {
    const $target = $(event.target);

    if ($target.data?.button === 'remove') {
      // eslint-disable-next-line
      const decision = confirm('Вы действительно хотите удалить таблицу?');

      if (decision) {
        localStorage.removeItem(`excel:${ActiveRoute.param}`);
        ActiveRoute.navigate('');
      }
    }

    if ($target.data?.button === 'exit') {
      ActiveRoute.navigate('');
    }
  }
}

export default Header;
