/**
 * Выполнить код с задержкой
 *
 * @template {any[]} TArgs - тип аргументов, передаваемые в колбэк-функцию
 * @param {(...args: TArgs) => void} fn - колбэк-функция, которую необходимо выполнить
 * @param {number} wait - время задержки
 * @returns {void, wait: number) => (...args: TArgs) => void} - коблбэк-функция
 */
const debounce = <TArgs extends any[]>(fn: (...args: TArgs) => void, wait: number) => {
  let timeout: NodeJS.Timeout;

  return (...args: TArgs) => {
    const later = () => {
      clearTimeout(timeout);
      fn(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export default debounce;
