import { IRootState } from './store.types';
import { TActions } from './action.types';

const rootReducer = (state: IRootState, action: TActions): IRootState => {
  let prevState;
  switch (action.type) {
    case 'TABLE_RESIZE':
      prevState = state.colState || {};
      prevState[action.payload.id] = action.payload.value;
      return { ...state, colState: prevState };
    default:
      return state;
  }
};

export default rootReducer;
