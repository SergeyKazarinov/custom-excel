import { Dom } from '@core/dom/dom';
import ExcelComponent from '@core/ExcelComponent/ExcelComponent';

interface IDivClickEvent extends MouseEvent {
  target: HTMLDivElement;
}
export interface IFormula {
  toHTML(): string;
  onInput(event: IDivClickEvent): void;
}

class Formula extends ExcelComponent implements IFormula {
  static className = 'excel__formula formula';

  constructor($root: Dom) {
    super($root, {
      name: 'Formula',
      listeners: ['input'],
    });
  }

  toHTML(): string {
    return `
    <div class="excel__formula formula">
      <span class="formula__info">fx</span>
      <div class="formula__input" contenteditable spellcheck="false"></div>
    </div>
    `;
  }

  onInput(event: IDivClickEvent) {
    console.log(event.target.textContent?.trim());
  }
}

export default Formula;
