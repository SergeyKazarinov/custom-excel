import { Dom } from '@core/dom/dom';
import getNameWithPrefix from '@src/helpers/getNameWithPrefix';
import { TListeners } from '@src/types/listeners';
import { IOptions } from '../excelComponent/ExcelComponent.types';
import { IDomListener } from './DomListener.types';

class DomListener implements IDomListener {
  public $root: Dom;

  public listeners: TListeners[];

  public name: string;

  constructor($root: Dom, options: IOptions) {
    if (!$root) {
      throw new Error('No $root provided for DomListener');
    }
    this.$root = $root;
    this.listeners = options.listeners || [];
    this.name = options.name || '';
  }

  initDomListeners() {
    this.listeners.forEach((listener) => {
      const method = getNameWithPrefix(listener);

      // @ts-ignore
      if (!this[method]) {
        const name = this.name || '';
        throw new Error(`Method ${method} os not implemented in ${name} Component`);
      }
      // @ts-ignore
      this[method] = this[method]?.bind(this);
      // @ts-ignore
      this.$root.on(listener, this[method]);
    });
  }

  removeDomListeners() {
    this.listeners.forEach((listener) => {
      const method = getNameWithPrefix(listener);
      // @ts-ignore
      if (!this[method]) {
        const name = this.name || '';
        throw new Error(`Method ${method} os not implemented in ${name} Component`);
      }
      // @ts-ignore
      this.$root.off(listener, this[method]);
    });
  }
}

export default DomListener;
