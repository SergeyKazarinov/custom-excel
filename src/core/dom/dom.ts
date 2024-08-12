import { TCSSStyles } from '@src/types/general';
import { IToolbarState } from '@src/types/state';

export interface IParsedId {
  row: number;
  col: number;
}

type ReturnType<T extends boolean> = T extends true ? IParsedId : string;

export interface IDom {
  /**
   * Метод добавления HTML разметки в dom дерево
   * @param {string} html - HTML разметка
   * @returns DOM
   */
  html(html: string | undefined): this | string | undefined;

  /**
   * Метод добавления строки в содержимое тега
   * @param {string} text строка, которая будет добавляться в элемент
   * @returns {Dom} - DOM-элемент
   */
  text(text: string): Dom;

  /**
   * Метод добавления строки в содержимое тега
   *
   * @param {Dom} text
   * @returns {string}
   */
  text(text: Dom): string;

  /**
   * Возвращает содержимое Dom-элемента
   *
   * @returns {string}
   */
  text(): string;

  /**
   * Метод очистки HTML
   * @returns {this}
   */
  clear(): this;

  /**
   * Метод добавления Dom-элемента в Dom-дерево
   *
   * @param {(Element | Dom)} node
   * @returns {this}
   */
  append(node: Element | Dom): this;

  /**
   * Метод добавления слушателя событий
   * @param {string} evenType  - тип слушателя
   * @param {(...arg: any[]) => void} callback  - колбэк-функция, которая будет срабатывать
   */
  on(evenType: string, callback: (...arg: any[]) => void): void;

  /**
   * Метод удаления слушателя событий
   * @param {string} eventType - тип слушателя
   * @param {(...arg: any[]) => void} callback - колбэк-функция, которая будет удаляться
   */
  off(evenType: string, callback: (...arg: any[]) => void): void;

  /**
   * Метод получения dom элемента по селектору
   * @param {string} selector - селектор дом элемента, по которому осуществляется поиск
   * @returns {(Dom | null | undefined)} возвращает dom элемент
   */
  closest(selector: string): Dom | null | undefined;

  /**
   * Метод получения информации элемента: размеры и положение
   * @returns {(DOMRect | undefined)} - объект с данными
   */
  getCoords(): DOMRect | undefined;

  /**
   * Метод получения data-id ячейки
   *
   * @template {boolean} T - Generic, определяющий в каком виде вернуть данные
   * @param {T} parse - флаг, определяющий в каком формате вернуть данные: объект или строка
   * @returns {(ReturnType<T> | undefined)} Объект типа {ros, col} или строку типа 'row:col`
   */
  getId<T extends boolean>(parse: T): ReturnType<T> | undefined;

  /**
   * Метод получения dom элемента по селектору
   *
   * @param {string} selector
   * @returns {(Dom | undefined)} dom элементов
   */
  find(selector: string): Dom | undefined;

  /**
   * Метод получения dom всех дом элементов по селектору
   *
   * @param {string} selector
   * @returns {(NodeListOf<Element> | undefined)} псевдомассив dom элементов
   */
  findAll(selector: string): NodeListOf<Element> | undefined;

  /**
   * Метод фокусировки на элементе
   *
   * @returns {this}
   */
  focus(): this;

  /**
   * Метод установки инлайновых стилей на элемент
   *
   * @param {Partial<Record<keyof CSSStyleDeclaration, string>>} styles - объект типа {css свойство: значение}
   */
  css(styles: Partial<Record<keyof CSSStyleDeclaration, string>>): void;

  /**
   * Метод добавления css класса
   *
   * @param {string} className - название класса
   * @returns {this}
   */
  addClass(className: string): this;

  /**
   * Метод удаления css класса
   *
   * @param {string} className - название класса
   * @returns {this}
   */
  removeClass(className: string): this;

  /**
   * Метод установки значения атрибута
   *
   * @param {string} name - название атрибута
   * @param {string} value - значение атрибута
   * @returns {this}
   */
  attr(name: string, value: string): this;

  /**
   * Метод получения значения атрибута
   *
   * @param {string} name - название атрибута
   * @returns {(string | undefined | null)}
   */
  attr(name: string): string | undefined | null;
}

export class Dom implements IDom {
  public $el: HTMLElement | null;

  constructor(selector: string | HTMLElement) {
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

  html(html: string | undefined) {
    if (typeof html === 'string') {
      if (this.$el) {
        this.$el.innerHTML = html;
        return this;
      }
    }
    return this.$el?.outerHTML.trim();
  }

  text(text: string): Dom;
  text(text: Dom): string;
  text(): string;
  text(text?: unknown): string | Dom | undefined {
    if (typeof text !== 'undefined') {
      if (this.$el) this.$el.textContent = String(text);
      return this;
    }

    if (this.$el?.tagName.toLowerCase() === 'input' && this.$el instanceof HTMLInputElement) {
      return this.$el.value.trim();
    }
    return this.$el?.textContent?.trim();
  }

  clear() {
    this.html('');
    return this;
  }

  on(eventType: string, callback: (...arg: any[]) => void) {
    this.$el?.addEventListener(eventType, callback);
  }

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

  closest(selector: string) {
    const nodeElement = this.$el?.closest(selector);

    if (nodeElement && nodeElement instanceof HTMLElement) {
      // eslint-disable-next-line
      return $(nodeElement);
    }

    return null;
  }

  getCoords() {
    return this.$el?.getBoundingClientRect();
  }

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

  find(selector: string) {
    const element = this.$el?.querySelector(selector);

    if (element && element instanceof HTMLElement) {
      // eslint-disable-next-line
      return $(element);
    }

    return undefined;
  }

  findAll(selector: string) {
    return this.$el?.querySelectorAll(selector);
  }

  focus() {
    if (this.$el instanceof HTMLElement) this.$el?.focus();
    return this;
  }

  css(styles: TCSSStyles) {
    Object.entries(styles).forEach(([key, value]) => {
      if (this.$el instanceof HTMLElement) {
        this.$el.style[key as any] = String(value);
      }
    });
  }

  getStyles(styles: Array<keyof IToolbarState>): Partial<CSSStyleDeclaration> {
    return styles.reduce((acc: Partial<CSSStyleDeclaration>, styleProp) => {
      // @ts-ignore
      acc[styleProp] = this.$el?.style[styleProp];
      return acc;
    }, {});
  }

  addClass(className: string) {
    this.$el?.classList.add(className);
    return this;
  }

  removeClass(className: string) {
    this.$el?.classList.remove(className);
    return this;
  }

  attr(name: string, value: string): this;
  attr(name: string): string | undefined | null;
  attr(name: string, value?: string): string | this | undefined | null {
    if (typeof value === 'string') {
      this.$el?.setAttribute(name, value);
      return this;
    }
    if (this.$el?.hasAttribute(name)) {
      const att = this.$el?.getAttribute(name);
      return att;
    }
    return '';
  }
}

const $ = (selector: string | HTMLElement) => new Dom(selector);

/**
 * Создание dom-элемента
 *
 * @param tagName - тип html-тэга
 * @param classes - список классов, которые необходимо добавить создаваемому dom-элементу
 * @returns dom-элемент
 */
$.create = (tagName: string, classes: string = '') => {
  const el = document.createElement(tagName);

  if (classes) {
    el.classList.add(classes);
  }

  return $(el);
};

export default $;
