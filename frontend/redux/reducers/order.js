import {
    ORDER_ADD_ORDER,
    ORDER_CLEAR_LIST,
    ORDER_FETCH_START,
    ORDER_FETCH_END,
    ORDER_UPDATE_ORDER,
} from '../types/order';
import {LOG_OUT} from '../types/auth';

const initialState = {
    list: [],
    isLoading: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ORDER_ADD_ORDER:
            return {
                ...state,
                list: [action.payload.order, ...state.list],
            };

        case ORDER_FETCH_START:
            return {
                ...state,
                isLoading: true,
            };

        case ORDER_FETCH_END:
            return {
                ...state,
                isLoading: false,
            };

        case LOG_OUT:
        case ORDER_CLEAR_LIST:
            return {
                list: [],
                isLoading: false,
            };

        case ORDER_UPDATE_ORDER: {
            let list = [...state.list];
            list = list.map((order) => {
                if (order._id === action.payload.order._id)
                    return action.payload.order;
                return order;
            });
            return {
                ...state,
                list,
            };
        }

        default:
            return state;
    }
};

export default reducer;
