import axios from 'axios';
import {BaseURL} from '../../constants';

import {
    CLIENT_FETCH_END,
    CLIENT_FETCH_START,
    CLIENT_CLEAR_LIST,
    CLIENT_ADD_CLIENT,
} from '../types/client';
import {getAccessToken} from '../../asyncStorage';
import {parseError} from './modal';

export const fetchStart = () => ({
    type: CLIENT_FETCH_START,
});

export const fetchEnd = () => ({
    type: CLIENT_FETCH_END,
});

export const clearList = () => ({
    type: CLIENT_CLEAR_LIST,
});

export const fetchClients = () => async (dispatch) => {
    dispatch(fetchStart());
    try {
        const token = await getAccessToken();
        const response = await axios({
            method: 'GET',
            url: `${BaseURL}/user`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch(clearList());
        const clientsList = response.data;
        clientsList.forEach((client) => {
            dispatch({
                type: CLIENT_ADD_CLIENT,
                payload: {
                    client,
                },
            });
        });
    } catch (err) {
        dispatch(parseError(err.response.data.message));
    }
    dispatch(fetchEnd());
};
