import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {} from '../redux/actions/cleaningPoint';

import HorizontalGallery from './HorizontalGallery';
import CustomButton from './CustomButton';

const CleaningPointCard = ({item, navigation}) => {
    const dispatch = useDispatch();
    const userToken = useSelector((state) => state.auth.authToken);

    return (
        <View style={styles.card}>
            <HorizontalGallery gallery={item.gallery} />
            <View style={styles.paddingBox}>
                <View style={styles.cardSection}>
                    <Text style={styles.cardText}>{item.name}</Text>
                    <CustomButton
                        style={styles.detailsButton}
                        title={'Details'}
                        onPress={() =>
                            navigation.navigate('Point Details', {point: item})
                        }
                    />
                </View>
            </View>
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
        overflow: 'hidden',
        backgroundColor: '#ecf0f1',
        marginBottom: 20,
        borderRadius: 20,
        marginHorizontal: 15,
    },
    cardText: {
        fontSize: 14,
    },
    detailsButton: {
        paddingVertical: 5,
        width: 130,
    },
    cardTextBold: {
        fontWeight: 'bold',
    },
    cardSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    paddingBox: {
        padding: 15,
    },
});

export default CleaningPointCard;
