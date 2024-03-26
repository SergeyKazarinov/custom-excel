interface IDom {
  html(html: string | undefined): this | string | undefined;
  clear(): this;
  append(node: Element | Dom): this;
}

class Dom implements IDom {
  public $el: Element | null;

  constructor(selector: string | Element) {
    this.$el = typeof selector === 'string' ? document.querySelector(selector) : selector;
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

  clear() {
    this.html('');
    return this;
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
