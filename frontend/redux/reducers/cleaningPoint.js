import {
    POINT_FETCH_END,
    POINT_FETCH_START,
    POINT_CLEAR_LIST,
    POINT_ADD_POINT,
    POINT_CREATE_POINT,
} from '../types/cleaningPoint';
import {LOG_OUT} from '../types/auth';

const initialState = {
    list: [],
    isLoading: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case POINT_FETCH_START:
            return {
                ...state,
                isLoading: true,
            };

        case POINT_FETCH_END:
            return {
                ...state,
                isLoading: false,
            };

        case LOG_OUT:
        case POINT_CLEAR_LIST:
            return {
                isLoading: false,
                list: [],
            };

        case POINT_ADD_POINT:
            return {
                ...state,
                list: [...state.list, action.payload.point],
            };

        default:
            return state;
    }
};

export default reducer;
