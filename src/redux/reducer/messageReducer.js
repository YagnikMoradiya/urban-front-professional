import { SET_MESSAGES } from '../action.type';

const initialState = {
    messages: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_MESSAGES:
            return {
                ...state,
                messages: action.payload,
            };
        default:
            return state;
    }
};
