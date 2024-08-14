import { TListeners, TUpperListeners } from '@src/types/listeners';

/**
 * Возвращает строку, но первая буква будет заглавная
 *
 * @param {TListeners} string - Строка, которую необходимо изменить
 * @returns {TUpperListeners} - ту же строку, но с большой буквы
 */
const capitalize = (string: TListeners): TUpperListeners => {
  const upperString = (string.charAt(0).toUpperCase() + string.slice(1)) as TUpperListeners;
  return upperString;
};

export default capitalize;
