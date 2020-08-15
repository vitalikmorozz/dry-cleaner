import {HIDE_MODAL, SHOW_MODAL} from '../types/modal';

export const showModal = (message, type) => async (dispatch) => {
    dispatch({
        type: SHOW_MODAL,
        payload: {
            message,
            type,
        },
    });
    setTimeout(() => dispatch(hideModal()), 5000);
};

export const hideModal = () => ({
    type: HIDE_MODAL,
});

export const parseError = (error) => (dispatch) => {
    let errorMessage = '';
    if (typeof error === typeof []) {
        console.log(error);
        errorMessage = error.reduce((acc, item) => {
            return acc + item.charAt(0).toUpperCase() + item.slice(1) + '\n';
        }, '');
    } else {
        errorMessage = error;
    }
    dispatch(showModal(errorMessage, 'error'));
};
