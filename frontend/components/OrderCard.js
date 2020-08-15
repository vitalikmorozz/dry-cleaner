import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {updateOrder} from '../redux/actions/order';
import {Text, View, StyleSheet, TextInput} from 'react-native';

import CustomButton from './CustomButton';

const OrderCard = ({item}) => {
    const [isRefound, setIsRefound] = useState(false);
    const [refoundMsg, setRefoundMsg] = useState('');
    const dispatch = useDispatch();
    const {isAdmin} = useSelector((state) => state.auth);

    const handleReady = () => {
        item.statusDetails = 'ready';
        dispatch(updateOrder(item));
    };

    const handleComplete = () => {
        item.status = 'done';
        dispatch(updateOrder(item));
    };

    const handleRefound = () => {
        item.status = 'done';
        item.statusDetails = 'refound';
        item.statusDescription = refoundMsg;
        dispatch(updateOrder(item));
    };

    const date =
        item.creationDate.split('T')[0] +
        ' ' +
        item.creationDate.split('T')[1].split('.')[0];

    let statusText = '';
    if (item.status === 'done') {
        statusText = 'Completed';
    } else if (
        item.status === 'pending' &&
        item.statusDetails === 'new' &&
        isAdmin
    ) {
        statusText = 'New';
    } else if (
        item.status === 'pending' &&
        item.statusDetails === 'new' &&
        !isAdmin
    ) {
        statusText = 'Processing';
    } else if (item.status === 'pending' && item.statusDetails === 'ready') {
        statusText = 'Ready';
    } else if (item.status === 'pending' && item.statusDetails === 'refound') {
        statusText = 'Refound';
    }
    return (
        <View style={styles.card}>
            <Text style={styles.cardText}>Created: {date}</Text>
            <Text style={styles.cardText}>
                Status: <Text>{statusText}</Text>
            </Text>
            <Text style={styles.cardText}>Client name: {item.user.name}</Text>
            <View style={styles.cardSection}>
                <Text style={styles.cardText}>
                    Service: {item.service.name}
                </Text>
                <Text style={styles.cardText}>Price: {item.service.price}</Text>
            </View>

            {item.statusDetails === 'refound' ? (
                <View>
                    <Text style={{color: 'red', fontWeight: 'bold'}}>
                        Refound
                    </Text>
                    <Text>Reason: {item.statusDescription}</Text>
                </View>
            ) : null}

            {isAdmin && item.statusDetails === 'new' ? (
                <>
                    {!isRefound ? (
                        <View style={styles.cardSection}>
                            <CustomButton
                                title={'Ready'}
                                style={styles.cardButton}
                                onPress={handleReady}
                            />
                            <CustomButton
                                title={'Refound'}
                                style={styles.refoundButton}
                                onPress={() => setIsRefound(true)}
                            />
                        </View>
                    ) : null}
                    <View>
                        {isRefound ? (
                            <View>
                                <TextInput
                                    placeholder={'Please enter refound reason'}
                                    value={refoundMsg}
                                    onChangeText={setRefoundMsg}
                                />
                                <View style={styles.cardSection}>
                                    <CustomButton
                                        title={'Cancel refound'}
                                        style={styles.cardButton}
                                        onPress={() => {
                                            setIsRefound(false);
                                            setRefoundMsg('');
                                        }}
                                    />
                                    <CustomButton
                                        title={'Confirm Refound'}
                                        style={styles.refoundButton}
                                        onPress={handleRefound}
                                    />
                                </View>
                            </View>
                        ) : null}
                    </View>
                </>
            ) : null}
            {!isAdmin &&
            item.statusDetails === 'ready' &&
            item.status !== 'done' ? (
                <View style={styles.cardSection}>
                    <CustomButton
                        title={'Complete'}
                        style={styles.cardButton}
                        onPress={handleComplete}
                    />
                </View>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 15,
        backgroundColor: '#ecf0f1',
        marginBottom: 20,
        borderRadius: 20,
        marginHorizontal: 15,
    },
    cardText: {
        fontSize: 14,
    },
    cardSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    centerSection: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardButton: {
        marginTop: 15,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    refoundButton: {
        marginTop: 15,
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#e74c3c',
    },
});

export default OrderCard;
