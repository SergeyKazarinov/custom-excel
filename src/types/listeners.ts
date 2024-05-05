export type TListeners = 'input' | 'click' | 'mousedown' | 'mousemove' | 'mouseup' | 'keydown';

export type TUpperListeners = Capitalize<TListeners>;

export type TMethods = TUpperListeners extends infer U ? (U extends string ? `on${U}` : never) : never;
