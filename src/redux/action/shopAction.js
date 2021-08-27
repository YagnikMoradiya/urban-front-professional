import {REMOVE_SHOP, SET_SHOP, TOGGLE_LOADING} from '../action.type';

export const setShopData = value => dispatch => {
  dispatch({
    type: SET_SHOP,
    payload: value,
  });
};

export const removeShopData = () => dispatch => {
  dispatch({
    type: REMOVE_SHOP,
  });
};

export const toggleVeified = () => dispatch => {
  dispatch({
    type: TOGGLE_LOADING,
  });
};
