import AsyncStorage from '@react-native-community/async-storage';

export const setAccessToken = async (token) => {
    try {
        return await AsyncStorage.setItem('access_token', token);
    } catch (err) {
        console.log(err);
        return null;
    }
};

export const getAccessToken = async () => {
    try {
        return await AsyncStorage.getItem('access_token');
    } catch (err) {
        console.log(err);
        return null;
    }
};

export const removeAccessToken = async () => {
    try {
        return await AsyncStorage.removeItem('access_token');
    } catch (err) {
        console.log(err);
        return null;
    }
};
