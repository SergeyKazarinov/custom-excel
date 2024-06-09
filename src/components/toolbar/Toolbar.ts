import $, { Dom } from '@src/core/dom/dom';
import ExcelStateComponent from '@src/core/excelStateComponent/ExcelStateComponent';
import { IComponentOptions } from '@src/types/components';
import { IToolbarState } from '@src/types/state';
import createToolbar from './toolbar.template';

export interface IToolbar {}

class Toolbar extends ExcelStateComponent<IToolbarState> implements IToolbar {
  static className = 'excel__toolbar toolbar';

  constructor($root: Dom, options: IComponentOptions) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      ...options,
    });
  }

  prepare(): void {
    const initialState: IToolbarState = {
      textAlign: 'left',
      fontWeight: 'normal',
      textDecoration: 'none',
      fontStyle: 'normal',
    };

    this.initState(initialState);
  }

  get template() {
    return createToolbar(this.state);
  }

  onClick(event: Event) {
    if (event.target instanceof Element) {
      const $target = $(event.target);
      if ($target.data?.type === 'button') {
        const style = JSON.parse($target.data.style ?? '{}');
        const key = Object.keys(style)[0];
        this.setState({ [key]: style[key] });
      }
    }
  }

  toHTML() {
    return this.template;
  }
}

export default Toolbar;
