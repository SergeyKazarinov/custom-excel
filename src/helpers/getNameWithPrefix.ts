import { TListeners, TMethods } from '@src/types/listeners';
import capitalize from './capitalize';

/**
 * Переводит полученную строку в camelCase формат с префиксом 'on'
 *
 * @param {TListeners} eventName - название слушателя
 * @returns {TMethods} - строку с префиксом on в формате camelCase
 */
const getNameWithPrefix = (eventName: TListeners): TMethods => `on${capitalize(eventName)}`;

export default getNameWithPrefix;
