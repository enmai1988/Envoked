import { SELECT_TAB_0, SELECT_TAB_1 } from '../constants';

const initState = {
  0: 'nav-link active',
  1: 'nav-link'
};

const tabsReducer = (state = initState, action) => {
  switch (action.type) {
  case SELECT_TAB_0:
    return { ...state, 0: 'nav-link active', 1: 'nav-link' };
  case SELECT_TAB_1:
    return { ...state, 0: 'nav-link', 1: 'nav-link active' };
  default:
    return state;
  }
};

export default tabsReducer;
