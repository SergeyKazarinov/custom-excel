import $, { Dom } from '@core/dom/dom';
import ExcelComponent from '@src/core/excelComponent/ExcelComponent';
import { IComponentOptions } from '@src/types/components';

interface IDivClickEvent extends MouseEvent {
  target: HTMLDivElement;
}
export interface IFormula {
  init(): void;
  toHTML(): string;
  onInput(event: IDivClickEvent): void;
  onKeydown(event: KeyboardEvent): void;
}

class Formula extends ExcelComponent implements IFormula {
  static className = 'excel__formula formula';

  private $formula: Dom | undefined;

  constructor($root: Dom, options: IComponentOptions) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options,
    });

    this.$formula = undefined;
  }

  init(): void {
    super.init();
    this.$formula = this.$root.find('#formula');
    this.$subscribe('table:select', ($cell: Dom) => {
      this.$formula?.text($cell.text());
    });
    this.$subscribe('table:input', ($cell: Dom) => {
      this.$formula?.text($cell.text());
    });
  }

  toHTML(): string {
    return `
    <div class="excel__formula formula">
      <span class="formula__info">fx</span>
      <div class="formula__input" contenteditable spellcheck="false" id='formula'></div>
    </div>
    `;
  }

  onInput(event: IDivClickEvent) {
    this.$trigger('formula:input', $(event.target).text());
  }

  onKeydown(event: KeyboardEvent): void {
    const keys = ['Enter', 'Tab'];

    if (keys.includes(event.key)) {
      event.preventDefault();

      this.$trigger('formula:done');
    }
  }
}

export default Formula;
