import ExcelComponent from '@core/ExcelComponent/ExcelComponent';

export interface IFormula {}

class Formula extends ExcelComponent implements IFormula {
  static className = 'excel__formula formula';

  toHTML(): string {
    return `
    <div class="excel__formula formula">
      <span class="formula__info">fx</span>
      <div class="formula__input" contenteditable spellcheck="false"></div>
    </div>
    `;
  }
}

export default Formula;
