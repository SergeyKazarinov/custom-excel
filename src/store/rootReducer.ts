import { IToolbarState } from '@src/types/state';
import { TActions } from './action.types';
import { IRootState } from './store.types';

const getValue = <A extends TActions, V>(state: IRootState, field: keyof IRootState, action: A, payloadValue: V) => {
  const val = state[field] || {};
  // @ts-ignore
  val[action.payload?.id] = payloadValue;
  return val;
};

const rootReducer = (state: IRootState, action: TActions): IRootState => {
  let prevState;
  let field: keyof IRootState;
  let val: Record<string, IToolbarState>;
  switch (action.type) {
    case 'TABLE_RESIZE':
      field = action.payload.type === 'col' ? 'colState' : 'rowState';
      return { ...state, [field]: getValue(state, field, action, action.payload.value) };

    case 'CHANGE_TEXT':
      field = 'dataState';
      prevState = state.dataState || {};
      prevState[action.payload.id] = action.payload.text;
      return {
        ...state,
        currentText: action.payload.text,
        // @ts-ignore
        dataState: getValue(state, field, action.payload, action.payload.text),
      };

    case 'CURRENT_STYLES':
      return { ...state, currentStyles: action.payload };

    case 'APPLY_STYLE':
      field = 'stylesState';
      val = state[field] || {};

      action.payload.ids.forEach((id) => {
        if (id) {
          val[id] = { ...val[id], ...action.payload.value };
        }
      });
      return { ...state, [field]: val, currentStyles: { ...state.currentStyles, ...action.payload.value } };

    case 'CHANGE_TITLE':
      return { ...state, title: action.payload };

    case 'UPDATE_DATE':
      return { ...state, dateTable: new Date().toJSON() };

    default:
      return state;
  }
};

export default rootReducer;
