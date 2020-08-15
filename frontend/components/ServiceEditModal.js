import React, {useState} from 'react';
import {Modal, View, Text, TouchableHighlight, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

const ModalAlert = ({visible, handleSuccess, handleDiscard, service}) => {
    const [name, setName] = useState(service ? service.name : '');
    const [price, setPrice] = useState(service ? service.price : '');

    return (
        <Modal animationType="slide" transparent={true} visible={visible}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Enter new data:</Text>
                    <View style={styles.cardRow}>
                        <Text>Name: </Text>
                        <TextInput
                            placeholder={'Name'}
                            value={name}
                            onChangeText={setName}
                        />
                    </View>
                    <View style={styles.cardRow}>
                        <Text>Price: </Text>
                        <TextInput
                            placeholder={'Price'}
                            value={String(price)}
                            keyboardType="numeric"
                            onChangeText={setPrice}
                        />
                    </View>

                    <View style={styles.cardSection}>
                        <TouchableHighlight
                            style={{
                                ...styles.openButton,
                                backgroundColor: '#2196F3',
                            }}
                            onPress={() => handleSuccess(name, price)}>
                            <Text style={styles.textStyle}>Okay</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={{
                                ...styles.openButton,
                                backgroundColor: '#e74c3c',
                            }}
                            onPress={() => handleDiscard(name, price)}>
                            <Text style={styles.textStyle}>Delete</Text>
                        </TouchableHighlight>
                    </View>
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
        width: 250,
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
    cardSection: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    cardRow: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    openButton: {
        width: 75,
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
