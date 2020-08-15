import {
    PROFILE_FETCH_END,
    PROFILE_FETCH_START,
    PROFILE_REMOVE_USER,
    PROFILE_SET_USER,
} from '../types/profile';
import axios from 'axios';
import {BaseURL} from '../../constants';
import {getAccessToken} from '../../asyncStorage';
import {parseError} from './modal';

export const removeUser = () => ({
    type: PROFILE_REMOVE_USER,
});

export const fetchStart = () => ({
    type: PROFILE_FETCH_START,
});

export const fetchEnd = () => ({
    type: PROFILE_FETCH_END,
});

export const fetchInfo = () => async (dispatch) => {
    dispatch(fetchStart());
    try {
        const token = await getAccessToken();
        const response = await axios({
            method: 'GET',
            url: `${BaseURL}/user/me`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const user = response.data;
        dispatch(removeUser());
        dispatch({
            type: PROFILE_SET_USER,
            payload: {
                user,
            },
        });
    } catch (err) {
        dispatch(parseError(err.response.data.message));
    }
    dispatch(fetchEnd());
};
