/**
 * Парсит строку и выполняет JS код, если строка является формулой в Excel
 *
 * @param {string} [value=''] - строка, заполненная в ячейке
 * @returns {string} - результат вычисления или введенная строка
 */
const parseString = (value: string = ''): string => {
  if (value.startsWith('=')) {
    try {
      // eslint-disable-next-line
      return eval(value.slice(1));
    } catch (e) {
      return value;
    }
  }

  return value;
};

export default parseString;
