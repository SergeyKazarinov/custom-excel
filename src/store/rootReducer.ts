import { TActions } from './action.types';
import { IRootState } from './store.types';

const value = <A extends TActions>(state: IRootState, field: keyof IRootState, action: A) => {
  const val = state[field] || {};
  // @ts-ignore
  val[action.payload.id] = action.payload.value;
  return val;
};

const rootReducer = (state: IRootState, action: TActions): IRootState => {
  let prevState;
  let field: keyof IRootState;
  switch (action.type) {
    case 'TABLE_RESIZE':
      field = action.payload.type === 'col' ? 'colState' : 'rowState';
      return { ...state, [field]: value(state, field, action) };

    case 'CHANGE_TEXT':
      field = 'dataState';
      prevState = state.dataState || {};
      prevState[action.payload.id] = action.payload.text;
      return {
        ...state,
        currentText: action.payload.text,
        // @ts-ignore

        dataState: value(state, field, action),
      };

    case 'CURRENT_STYLES':
      return { ...state, currentStyles: action.payload };

    default:
      return state;
  }
};

export default rootReducer;
