import { KEYBOARDS } from '@src/consts/codes';
import { IParsedId } from '@src/core/dom/dom';

/**
 * Функция для изменения data-id ячейки, в зависимости от нажатия клавиш навигации
 * @param {string} key - нажатая клавиша
 * @param {object} id - объект текущей ячейки
 * @returns {string} параметр атрибута для поиска в dom-дереве
 */
const nextSelector = (key: string, id: IParsedId): string => {
  switch (key) {
    case KEYBOARDS.Enter:
    case KEYBOARDS.ArrowDown:
      id.row++;
      break;
    case KEYBOARDS.Tab:
    case KEYBOARDS.ArrowRight:
      id.col++;
      break;
    case KEYBOARDS.ArrowLeft:
      id.col--;
      break;
    case KEYBOARDS.ArrowUp:
      id.row--;
      break;
    default:
  }
  return `[data-id="${id.row}:${id.col}"]`;
};

export default nextSelector;
