import { Dom } from '@core/dom/dom';
import capitalize from '@core/helpers/capitalize';
import { TListeners, TMethods } from '@src/types/listeners';
import { IOptions } from '../ExcelComponent/ExcelComponent';

/**
 * Переводит полученную строку в camelCase формат с префиксом 'on'
 * @param eventName - название слушателя
 * @returns - строку с префиксом on в формате camelCase
 */
const getNameWithPrefix = (eventName: TListeners): TMethods => `on${capitalize(eventName)}`;
export interface IDomListener {
  $root: Dom;
  listeners: TListeners[];
  name: string;
  initDomListeners(): void;
  removeDomListeners(): void;
}

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
