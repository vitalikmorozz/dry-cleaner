import {HIDE_MODAL, SHOW_MODAL} from '../types/modal';

const initialState = {
    visible: false,
    type: '',
    message: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_MODAL:
            return {
                visible: true,
                message: action.payload.message,
                type: action.payload.type,
            };

        case HIDE_MODAL:
            return {
                visible: false,
                message: '',
                type: '',
            };

        default:
            return state;
    }
};

export default reducer;
