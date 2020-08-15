import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ClientCard = ({item}) => {
    return (
        <View style={styles.card}>
            <Text style={styles.cardText}>Name: {item.name}</Text>
            <Text style={styles.cardText}>Email: {item.email}</Text>
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
});

export default ClientCard;
