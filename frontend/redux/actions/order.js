import jwtDecode from 'jwt-decode';
import axios from 'axios';
import {BaseURL} from '../../constants';

import {
    ORDER_ADD_ORDER,
    ORDER_FETCH_END,
    ORDER_FETCH_START,
    ORDER_CLEAR_LIST,
    ORDER_UPDATE_ORDER,
} from '../types/order';
import {parseError, showModal} from './modal';
import {getAccessToken} from '../../asyncStorage';

export const addOrder = (token, order) => async (dispatch) => {
    let user = {};
    try {
        const response = await axios({
            method: 'GET',
            url: `${BaseURL}/user/${order.userId}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        user = {
            name: response.data.name,
        };
    } catch (err) {
        dispatch(parseError(err.response.data.message));
    }
    order.user = user;
    dispatch({
        type: ORDER_ADD_ORDER,
        payload: {
            order,
        },
    });
};

export const clearList = () => ({
    type: ORDER_CLEAR_LIST,
});

export const fetchStart = () => ({
    type: ORDER_FETCH_START,
});

export const fetchEnd = () => ({
    type: ORDER_FETCH_END,
});

export const fetchOrders = () => async (dispatch) => {
    dispatch(fetchStart());
    const token = await getAccessToken();
    let userRoles = jwtDecode(token).roles;
    let url = '';
    if (userRoles.includes('ADMIN')) {
        url = `${BaseURL}/order/`;
    } else {
        url = `${BaseURL}/order/me`;
    }
    try {
        const response = await axios({
            method: 'GET',
            url,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = response.data;
        dispatch(clearList());
        data.forEach(async (order) => {
            dispatch(addOrder(token, order));
        });
    } catch (err) {
        dispatch(parseError(err.response.data.message));
    }
    dispatch(fetchEnd());
};

export const updateOrder = (order) => async (dispatch) => {
    const user = order.user;
    try {
        const token = await getAccessToken();
        const response = await axios({
            method: 'PATCH',
            url: `${BaseURL}/order/${order._id}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                ...order,
            },
        });
        const updatedOrder = response.data;
        updatedOrder.user = user;
        dispatch({
            type: ORDER_UPDATE_ORDER,
            payload: {
                order: updatedOrder,
            },
        });
    } catch (err) {
        dispatch(parseError(err.response.data.message));
    }
};

export const createOrder = (service) => async (dispatch) => {
    try {
        const token = await getAccessToken();
        const response = await axios({
            method: 'POST',
            url: `${BaseURL}/order/`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                service,
            },
        });
        dispatch(addOrder(token, response.data));
        dispatch(showModal('Successfully ordered!', 'normal'));
    } catch (err) {
        dispatch(parseError(err.response.data.message));
    }
};
