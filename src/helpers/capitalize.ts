import { TListeners, TUpperListeners } from '@src/types/listeners';

/**
 * Возвращает строку, но первая буква будет заглавная
 * @param string - Строка, которую необходимо изменить
 * @returns - ту же строку, но с большой буквы
 */
const capitalize = (string: TListeners): TUpperListeners => {
  const upperString = (string.charAt(0).toUpperCase() + string.slice(1)) as TUpperListeners;
  return upperString;
};

export default capitalize;
