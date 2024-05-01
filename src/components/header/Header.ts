import { Dom } from '@src/core/dom/dom';
import ExcelComponent from '@src/core/excelComponent/ExcelComponent';
import { IComponentOptions } from '@src/types/components';

interface IHeader {}

class Header extends ExcelComponent implements IHeader {
  static className: string = 'header';

  constructor($root: Dom, options: IComponentOptions) {
    super($root, {
      name: 'Header',
      ...options,
    });
  }

  toHTML(): string {
    return `
    <header class="excel__header header">
      <input class="header__input" value="Новая таблица" />

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
}

export default Header;
