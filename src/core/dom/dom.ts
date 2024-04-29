export interface IDom {
  html(html: string | undefined): this | string | undefined;
  clear(): this;
  append(node: Element | Dom): this;
  on(evenType: string, callback: (...arg: any[]) => void): void;
  off(evenType: string, callback: (...arg: any[]) => void): void;
}

export class Dom implements IDom {
  public $el: Element | null;

  constructor(selector: string | Element) {
    this.$el = typeof selector === 'string' ? document.querySelector(selector) : selector;
  }

  /**
   * Метод добавления HTML разметки в dom дерево
   * @param {string} html - HTML разметка
   * @returns DOM
   */
  html(html: string | undefined) {
    if (typeof html === 'string') {
      if (this.$el) {
        this.$el.innerHTML = html;
        return this;
      }
    }
    return this.$el?.outerHTML.trim();
  }

  /**
   * Метод очистки HTML
   * @returns DOM
   */
  clear() {
    this.html('');
    return this;
  }

  /**
   * Метод добавления слушателя событий
   * @param {string} eventType - тип слушателя
   * @param callback - колбэк-функция, которая будет срабатывать
   */
  on(eventType: string, callback: (...arg: any[]) => void) {
    this.$el?.addEventListener(eventType, callback);
  }

  /**
   * Метод удаления слушателя событий
   * @param {string} eventType - тип слушателя
   * @param callback - колбэк-функция, которая будет удаляться
   */
  off(eventType: string, callback: (...arg: any[]) => void) {
    this.$el?.removeEventListener(eventType, callback);
  }

  append(node: Dom | Element) {
    let nodeElement: Element | null;

    if (node instanceof Dom) {
      nodeElement = node.$el;
    } else {
      nodeElement = node;
    }

    if (nodeElement) {
      this.$el?.append(nodeElement);
    }

    return this;
  }

  /**
   * Метод получения dom элемента по селектору
   * @param {string} selector - селектор дом элемента, по которому осуществляется поиск
   * @returns {Element | null | undefined} возвращает dom элемент
   */
  closest(selector: string) {
    const nodeElement = this.$el?.closest(selector);

    if (nodeElement) {
      // eslint-disable-next-line
      return $(nodeElement);
    }

    return null;
  }

  /**
   * Метод получения информации элемента: размеры и положение
   * @returns - объект с данными
   */
  getCoords() {
    return this.$el?.getBoundingClientRect();
  }

  /**
   * getter получения data-атрибутов элемента
   */
  get data() {
    if (this.$el instanceof HTMLElement) {
      return this.$el.dataset;
    }

    return null;
  }

  /**
   * Метод получения dom всех дом элементов по селектору
   * @param {string} selector
   * @returns {NodeListOf<Element>} псевдомассив dom элементов
   */
  findAll(selector: string) {
    return this.$el?.querySelectorAll(selector);
  }
}

const $ = (selector: string | Element) => new Dom(selector);

$.create = (tagName: string, classes: string = '') => {
  const el = document.createElement(tagName);

  if (classes) {
    el.classList.add(classes);
  }

  return $(el);
};

export default $;
