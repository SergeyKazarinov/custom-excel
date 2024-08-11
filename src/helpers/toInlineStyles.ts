import { TCSSStyles } from '@src/types/general';

const camelToDashCase = (str: string) => str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);

/**
 * Установка инлайновых стилей
 *
 * @template {TCSSStyles} T
 * @param {T} styles - свойство CSS
 * @returns {*}
 */
const toInlineStyles = <T extends TCSSStyles>(styles: T) =>
  Object.keys(styles)
    .map((key) => `${camelToDashCase(key)}: ${styles[key as keyof T]}`)
    .join('; ');

export default toInlineStyles;
