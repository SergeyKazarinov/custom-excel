import $, { Dom } from '@src/core/dom/dom';
import ExcelStateComponent from '@src/core/excelStateComponent/ExcelStateComponent';
import { IComponentOptions } from '@src/types/components';
import { IToolbarState } from '@src/types/state';
import { initialToolbarState } from '@src/consts/consts';
import { IRootState } from '@src/store/store.types';
import createToolbar from './toolbar.template';

export interface IToolbar {}

class Toolbar extends ExcelStateComponent<IToolbarState> implements IToolbar {
  static className = 'excel__toolbar toolbar';

  constructor($root: Dom, options: IComponentOptions) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options,
    });
  }

  prepare(): void {
    this.initState(initialToolbarState);
  }

  get template() {
    return createToolbar(this.state);
  }

  onClick(event: Event) {
    if (event.target instanceof HTMLElement) {
      const $target = $(event.target);
      if ($target.data?.type === 'button') {
        const style: IToolbarState = JSON.parse($target.data.style!);
        this.$trigger('toolbar:applyStyle', style);
      }
    }
  }

  toHTML() {
    return this.template;
  }

  changeStore(changes: IRootState) {
    this.setState(changes.currentStyles);
  }
}

export default Toolbar;
