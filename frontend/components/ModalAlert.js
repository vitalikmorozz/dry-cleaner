import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {hideModal} from '../redux/actions/modal';
import {Modal, View, Text, TouchableHighlight, StyleSheet} from 'react-native';

const ModalAlert = () => {
    const {visible, message, type} = useSelector((state) => state.modal);
    const dispatch = useDispatch();

    return (
        <Modal animationType="slide" transparent={true} visible={visible}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>{message}</Text>

                    <TouchableHighlight
                        style={{
                            ...styles.openButton,
                            backgroundColor:
                                type === 'error' ? '#e74c3c' : '#2196F3',
                        }}
                        onPress={() => {
                            dispatch(hideModal());
                        }}>
                        <Text style={styles.textStyle}>Okay</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default ModalAlert;
