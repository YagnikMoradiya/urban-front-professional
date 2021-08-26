import {TOGGLE_LOADING} from '../action.type';

const initialState = {
  is_loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_LOADING:
      return {
        ...state,
        is_loading: action.payload,
      };
    default:
      return state;
  }
};
