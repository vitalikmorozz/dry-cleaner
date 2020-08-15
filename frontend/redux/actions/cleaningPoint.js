import {
    POINT_FETCH_START,
    POINT_FETCH_END,
    POINT_CLEAR_LIST,
    POINT_ADD_POINT,
} from '../types/cleaningPoint';
import {parseError} from '../actions/modal';
import {BaseURL} from '../../constants';
import axios from 'axios';
import {getAccessToken} from '../../asyncStorage';

export const clearList = () => ({
    type: POINT_CLEAR_LIST,
});

export const fetchStart = () => ({
    type: POINT_FETCH_START,
});

export const fetchEnd = () => ({
    type: POINT_FETCH_END,
});

export const addPoint = (point) => ({
    type: POINT_ADD_POINT,
    payload: {
        point,
    },
});

export const updateCleaningPoint = (point) => async (dispatch) => {
    try {
        const token = await getAccessToken();
        const response = await axios({
            method: 'PATCH',
            url: `${BaseURL}/cleaningPoint/${point._id}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                ...point,
            },
        });
    } catch (err) {
        dispatch(parseError(err.response.data.message));
    }
};

export const fetchCleaningPoints = () => async (dispatch) => {
    dispatch(fetchStart());
    try {
        const token = await getAccessToken();
        const response = await axios({
            method: 'GET',
            url: `${BaseURL}/cleaningPoint`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const pointsList = response.data;
        dispatch(clearList());
        pointsList.forEach((point) => dispatch(addPoint(point)));
    } catch (err) {
        dispatch(parseError(err.response.data.message));
    }
};
