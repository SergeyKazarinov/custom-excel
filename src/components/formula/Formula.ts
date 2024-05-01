import { Dom } from '@core/dom/dom';
import ExcelComponent from '@src/core/excelComponent/ExcelComponent';
import { IComponentOptions } from '@src/types/components';

interface IDivClickEvent extends MouseEvent {
  target: HTMLDivElement;
}
export interface IFormula {
  toHTML(): string;
  onInput(event: IDivClickEvent): void;
}

class Formula extends ExcelComponent implements IFormula {
  static className = 'excel__formula formula';

  constructor($root: Dom, options: IComponentOptions) {
    super($root, {
      name: 'Formula',
      listeners: ['input'],
      ...options,
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
    const text = event.target.textContent?.trim();

    this.$trigger('formula:input', text);
  }
}

export default Formula;
