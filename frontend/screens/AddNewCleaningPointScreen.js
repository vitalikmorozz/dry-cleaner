import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {BaseURL} from '../constants';
import ImagePicker from 'react-native-image-picker';

const options = {
    title: 'Select Photo',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

import CustomButton from '../components/CustomButton';

const AddNewCleaningPointScreen = ({navigation}) => {
    const token = useSelector((state) => state.auth.authToken);

    const handleAddPhoto = () => {
        ImagePicker.showImagePicker(options, async (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const formData = new FormData();

                formData.append('image', {
                    uri: response.uri,
                    type: response.type,
                    name: response.fileName,
                });
                try {
                    let res = await axios({
                        method: 'POST',
                        url: `${BaseURL}/cleaningPoint/upload`,
                        data: formData,
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    console.log(res.data);
                } catch (err) {
                    console.log(err);
                }
            }
        });
    };

    return (
        <View style={styles.container}>
            <Text>Add new cleaning point screen</Text>
            <CustomButton title="Add photo" onPress={handleAddPhoto} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default AddNewCleaningPointScreen;
