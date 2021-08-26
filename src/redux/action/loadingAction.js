import {TOGGLE_LOADING} from '../action.type';

export const toggleLoading = value => dispatch => {
  dispatch({
    type: TOGGLE_LOADING,
    payload: value,
  });
};
