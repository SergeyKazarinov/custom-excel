class ActiveRoute {
  /**
   * Геттер получения текущего адреса
   *
   * @static
   * @readonly
   * @type {string}
   */
  static get path() {
    return window.location.hash.slice(1);
  }

  /**
   * Геттер получения параметра таблицы
   *
   * @static
   * @readonly
   * @type {string}
   */
  static get param() {
    return ActiveRoute.path.split('/')[1];
  }

  static navigate(path: string) {
    window.location.hash = path;
  }
}

export default ActiveRoute;
