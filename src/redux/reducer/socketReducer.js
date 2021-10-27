import { SET_SOCKET } from '../action.type';

const initialState = {
    socket: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_SOCKET:
            return {
                ...state,
                socket: action.payload,
            };
        default:
            return state;
    }
};
