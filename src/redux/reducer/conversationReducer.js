import { SET_CONVERSATION } from '../action.type';

const initialState = {
    conversations: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_CONVERSATION:
            return {
                ...state,
                conversations: action.payload,
            };
        default:
            return state;
    }
};
