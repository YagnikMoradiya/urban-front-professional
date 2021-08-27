import {REMOVE_SHOP, SET_SHOP, TOGGLE_VERIFIED} from '../action.type';

const initialState = {
  shop: {},
  is_loggedin: false,
  is_verified: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SHOP: {
      return {
        ...state,
        shop: action.payload,
        is_loggedin: true,
      };
    }
    case REMOVE_SHOP: {
      return {
        ...state,
        shop: {},
        is_loggedin: false,
      };
    }
    case TOGGLE_VERIFIED: {
      return {
        ...state,
        is_verified: true,
      };
    }
    default:
      return state;
  }
};
