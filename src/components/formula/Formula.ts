import $, { Dom } from '@core/dom/dom';
import ExcelComponent from '@src/core/excelComponent/ExcelComponent';
import { IComponentOptions } from '@src/types/components';
import * as actions from '@src/store/actions';
import { IRootState } from '@src/store/store.types';
import { IDivClickEvent } from '@src/types/general';
import { IFormula } from './Formula.types';

class Formula extends ExcelComponent implements IFormula {
  static className = 'excel__formula formula';

  private $formula: Dom | undefined;

  constructor($root: Dom, options: IComponentOptions) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribes: ['currentText'],
      ...options,
    });

    this.$formula = undefined;
  }

  init(): void {
    super.init();
    this.$formula = this.$root.find('#formula');
    this.$subscribe('table:select', ($cell: Dom) => {
      const id = $cell.getId<false>();
      const dataValue = $cell.attr('data-value');
      if (id) {
        this.$dispatch(actions.changeTextActionCreator({ text: $cell.text(), id }));
      }
      if (dataValue) {
        this.$formula?.text(dataValue);
      }
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

  changeStore(changes: Partial<IRootState>): void {
    this.$formula?.text(changes.currentText || '');
  }
}

export default Formula;
