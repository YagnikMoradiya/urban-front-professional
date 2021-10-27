import { SET_MESSAGES } from '../action.type';

export const setMessages = value => dispatch => {
    dispatch({
        type: SET_MESSAGES,
        payload: value,
    });
};
