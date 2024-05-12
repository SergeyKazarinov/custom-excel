import { IRootState } from './store.types';
import { TActions } from './action.types';

const rootReducer = (state: IRootState, action: TActions): IRootState => {
  let prevState;
  let field: 'colState' | 'rowState';
  switch (action.type) {
    case 'TABLE_RESIZE':
      field = action.payload.type === 'col' ? 'colState' : 'rowState';
      prevState = state[field] || {};
      prevState[action.payload.id] = action.payload.value;
      return { ...state, [field]: prevState };

    case 'CHANGE_TEXT':
      prevState = state.dataState || {};
      prevState[action.payload.id] = action.payload.text;
      return { ...state, currentText: action.payload.text, dataState: prevState };

    default:
      return state;
  }
};

export default rootReducer;
