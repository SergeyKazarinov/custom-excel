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
      console.info(field);
      return { ...state, [field]: prevState };
    default:
      return state;
  }
};

export default rootReducer;
