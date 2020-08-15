import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const CustomLink = ({onPress, text, style}) => {
    return (
        <TouchableOpacity onPress={onPress} style={style}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    text: {
        color: '#3498db',
    },
});

export default CustomLink;
