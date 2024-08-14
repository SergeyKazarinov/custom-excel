/**
 * Функция получения данных из localStorage или сохранения данных
 * @param {string}key - ключ, по которому устанавливается значение либо получает
 * @param {unknown} data - данные, которые необходимо поместить в localStorage
 * @returns данные из localStorage
 */
const localStorageFn = <R>(key: string, data?: unknown) => {
  if (!data) {
    const localStorageData = localStorage.getItem(key);
    return localStorageData ? (JSON.parse(localStorageData) as R) : undefined;
  }

  localStorage.setItem(key, JSON.stringify(data));
};

export default localStorageFn;
