import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const CustomInput = ({
    value,
    placeholder,
    onChangeText,
    secureTextEntry,
    style,
}) => {
    return (
        <TextInput
            style={[styles.input, style]}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            placeholderTextColor={'#2c3e50'}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        width: 250,
        backgroundColor: 'white',
        borderRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 16,
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});

export default CustomInput;
