import { SET_SOCKET } from '../action.type';

export const setSocket = value => dispatch => {
    dispatch({
        type: SET_SOCKET,
        payload: value,
    });
};
