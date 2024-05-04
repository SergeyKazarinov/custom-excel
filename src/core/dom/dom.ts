export interface IParsedId {
  row: number;
  col: number;
}

type ReturnType<T extends boolean> = T extends true ? IParsedId : string;

export interface IDom {
  html(html: string | undefined): this | string | undefined;
  text(text: string): void;
  clear(): this;
  append(node: Element | Dom): this;
  on(evenType: string, callback: (...arg: any[]) => void): void;
  off(evenType: string, callback: (...arg: any[]) => void): void;
  closest(selector: string): Dom | null | undefined;
  getCoords(): DOMRect | undefined;
  find(selector: string): Dom | undefined;
  findAll(selector: string): NodeListOf<Element> | undefined;
  focus(): this;
  css(styles: Partial<Record<keyof CSSStyleDeclaration, string>>): void;
  addClass(className: string): this;
  removeClass(className: string): this;
  getId<T extends boolean>(parsed?: T): ReturnType<T> | undefined;
}

export class Dom implements IDom {
  public $el: Element | null;

  constructor(selector: string | Element) {
    this.$el = typeof selector === 'string' ? document.querySelector(selector) : selector;
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
   * Метод добавления строки в содержимое тега
   * @param {string} text строка, которая будет добавляться в элемент
   */
  text(text?: string | Dom) {
    if (typeof text === 'string') {
      if (this.$el) this.$el.textContent = text;
      return this;
    }

    if (this.$el?.tagName.toLowerCase() === 'input' && this.$el instanceof HTMLInputElement) {
      return this.$el.value.trim();
    }
    return this.$el?.textContent?.trim();
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
   * Метод получения data-id ячейки
   * @param {boolean} parse - флаг, определяющий в каком формате вернуть данные: объект или строка
   * @returns Объект типа {ros, col} или строку типа 'row:col`
   */
  getId<T extends boolean>(parse?: T): ReturnType<T> | undefined {
    if (parse) {
      const parsed = this.getId(false)?.split(':');
      return parsed
        ? ({
            row: Number(parsed[0]),
            col: Number(parsed[1]),
          } as ReturnType<T>)
        : undefined;
    }
    return this.data?.id as ReturnType<T>;
  }

  /**
   * Метод получения dom элемента по селектору
   * @param {string} selector
   * @returns {NodeListOf<Element>} dom элементов
   */
  find(selector: string) {
    const element = this.$el?.querySelector(selector);

    if (element) {
      // eslint-disable-next-line
      return $(element);
    }

    return undefined;
  }

  /**
   * Метод получения dom всех дом элементов по селектору
   * @param {string} selector
   * @returns {NodeListOf<Element>} псевдомассив dom элементов
   */
  findAll(selector: string) {
    return this.$el?.querySelectorAll(selector);
  }

  focus() {
    if (this.$el instanceof HTMLElement) this.$el?.focus();
    return this;
  }

  /**
   * Метод установки инлайновых стилей на элемент
   * @param {object} styles - объект типа {css свойство: значение}
   */
  css(styles: Partial<Record<keyof CSSStyleDeclaration, string | number>>) {
    Object.entries(styles).forEach(([key, value]) => {
      if (this.$el instanceof HTMLElement) {
        this.$el.style[key as any] = String(value);
      }
    });
  }

  /**
   * Метод добавления css класса
   * @param {string} className - название класса
   */
  addClass(className: string) {
    this.$el?.classList.add(className);
    return this;
  }

  /**
   * Метод удаления css класса
   * @param {string} className - название класса
   */
  removeClass(className: string) {
    this.$el?.classList.remove(className);
    return this;
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
