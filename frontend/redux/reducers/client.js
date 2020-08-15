import {
    CLIENT_ADD_CLIENT,
    CLIENT_CLEAR_LIST,
    CLIENT_FETCH_START,
    CLIENT_FETCH_END,
} from '../types/client';
import {LOG_OUT} from '../types/auth';

const initialState = {
    list: [],
    isLoading: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CLIENT_ADD_CLIENT:
            return {
                ...state,
                list: [...state.list, action.payload.client],
            };

        case LOG_OUT:
        case CLIENT_CLEAR_LIST:
            return {
                ...state,
                list: [],
            };

        case CLIENT_FETCH_START:
            return {
                ...state,
                isLoading: true,
            };

        case CLIENT_FETCH_END:
            return {
                ...state,
                isLoading: false,
            };

        default:
            return state;
    }
};

export default reducer;
