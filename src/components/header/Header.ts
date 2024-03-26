import ExcelComponent from '@core/ExcelComponent/ExcelComponent';

interface IHeader {}

class Header extends ExcelComponent implements IHeader {
  static className: string = 'header';

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
