import {
    LOG_IN,
    LOG_OUT,
    RETRIEVE_TOKEN_START,
    RETRIEVE_TOKEN_END,
} from '../types/auth';

const initialState = {
    isLogInned: false,
    authToken: '',
    isAdmin: false,
    isLoading: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN:
            return {
                ...state,
                isLogInned: true,
                isAdmin: action.payload.isAdmin,
                authToken: action.payload.token,
            };

        case LOG_OUT:
            return {
                ...state,
                isLogInned: false,
                isAdmin: false,
                authToken: '',
            };

        case RETRIEVE_TOKEN_START:
            return {...state, isLoading: true};

        case RETRIEVE_TOKEN_END:
            return {...state, isLoading: false};

        default:
            return state;
    }
};

export default reducer;
