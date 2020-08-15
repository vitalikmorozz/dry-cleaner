import {
    PROFILE_FETCH_END,
    PROFILE_FETCH_START,
    PROFILE_SET_USER,
    PROFILE_REMOVE_USER,
} from '../types/profile';
import {LOG_OUT} from '../types/auth';

const initialState = {
    user: null,
    isLoading: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case PROFILE_FETCH_END:
            return {
                ...state,
                isLoading: false,
            };

        case PROFILE_FETCH_START:
            return {
                ...state,
                isLoading: true,
            };

        case PROFILE_SET_USER:
            return {
                ...state,
                user: action.payload.user,
            };

        case LOG_OUT:
        case PROFILE_REMOVE_USER:
            return {
                ...state,
                user: null,
            };

        default:
            return state;
    }
};

export default reducer;
