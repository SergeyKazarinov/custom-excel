import { TCSSStyles } from './general';

export type TTextAlign = 'left' | 'right' | 'center';
export type TFontWeight = 'bold' | 'normal';
export type TFontStyle = 'italic' | 'normal';
export type TTextDecoration = 'underline' | 'none';

export interface IToolbarState extends TCSSStyles {
  textAlign?: TTextAlign;
  fontWeight?: TFontWeight;
  fontStyle?: TFontStyle;
  textDecoration?: TTextDecoration;
}
