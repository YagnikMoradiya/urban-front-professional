import {SET_WORKER} from '../action.type';

export const setWorker = value => dispatch => {
  dispatch({
    type: SET_WORKER,
    payload: value,
  });
};
