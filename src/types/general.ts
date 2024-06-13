export type TCSSStyles = Partial<Record<keyof CSSStyleDeclaration, string | number>>;

export interface IDivClickEvent extends MouseEvent {
  target: HTMLDivElement;
}

export interface IInputEvent extends InputEvent {
  target: HTMLInputElement;
}
