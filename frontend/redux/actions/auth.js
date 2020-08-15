import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {
    LOG_IN,
    LOG_OUT,
    RETRIEVE_TOKEN_END,
    RETRIEVE_TOKEN_START,
} from '../types/auth';
import {parseError} from './modal';
import {BaseURL} from '../../constants';
import {
    getAccessToken,
    setAccessToken,
    removeAccessToken,
} from '../../asyncStorage';

export const logOut = () => async (dispatch) => {
    dispatch({
        type: LOG_OUT,
    });
    await removeAccessToken();
};

export const logIn = (email, password) => async (dispatch) => {
    try {
        let response = await axios({
            method: 'POST',
            url: `${BaseURL}/auth/login`,
            data: {
                email,
                password,
            },
        });
        const token = response.data.access_token;
        await setAccessToken(token);
        const isAdmin = jwtDecode(token).roles.includes('ADMIN');

        dispatch({
            type: LOG_IN,
            payload: {
                token,
                isAdmin,
            },
        });
    } catch (err) {
        dispatch(parseError(err.response.data.message));
    }
};

export const getExistingToken = () => async (dispatch) => {
    dispatch({
        type: RETRIEVE_TOKEN_START,
    });
    const token = await getAccessToken();
    if (token !== null) {
        const isAdmin = jwtDecode(token).roles.includes('ADMIN');
        dispatch({
            type: LOG_IN,
            payload: {
                token,
                isAdmin,
            },
        });
    }
    dispatch({
        type: RETRIEVE_TOKEN_END,
    });
};

export const signIn = (name, email, password) => async (dispatch) => {
    try {
        let response = await axios({
            method: 'POST',
            url: `${BaseURL}/auth/register`,
            data: {
                name,
                email,
                password,
            },
        });
        const token = response.data.access_token;
        await setAccessToken(token);
        const isAdmin = jwtDecode(token).roles.includes('ADMIN');

        dispatch({
            type: LOG_IN,
            payload: {
                token,
                isAdmin,
            },
        });
    } catch (err) {
        dispatch(parseError(err.response.data.message));
    }
};
