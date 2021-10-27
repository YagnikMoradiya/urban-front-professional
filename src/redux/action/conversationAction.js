import { SET_CONVERSATION } from '../action.type';

export const setConversation = value => dispatch => {
    dispatch({
        type: SET_CONVERSATION,
        payload: value,
    });
};
