import {SET_WORKER} from '../action.type';

const initialState = {
  worker_id: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_WORKER: {
      return {
        ...state,
        worker_id: action.payload,
      };
    }
    default:
      return state;
  }
};
