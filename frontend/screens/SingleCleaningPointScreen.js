import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {createOrder} from '../redux/actions/order';
import {updateCleaningPoint} from '../redux/actions/cleaningPoint';
import {useSelector, useDispatch} from 'react-redux';

import CustomButton from '../components/CustomButton';
import ServiceEditModal from '../components/ServiceEditModal';
import AddServiceModal from '../components/AddServiceModal';
import HorizontalGallery from '../components/HorizontalGallery';

const SingleCleaningPointScreen = ({route}) => {
    const currentPoint = route.params.point;
    const [modalVisible, setModalVisible] = useState(false);
    const [addModalVisible, setAddModalVisible] = useState(false);
    let currentServiceIndx = 0;
    const dispatch = useDispatch();
    const {isAdmin} = useSelector((state) => state.auth);

    const handleOrder = (service) => {
        dispatch(createOrder(service));
    };

    const handleSuccess = (newName, newPrice) => {
        let newPoint = {...currentPoint};
        newPoint.services[currentServiceIndx] = {
            name: newName,
            price: parseInt(newPrice),
        };
        dispatch(updateCleaningPoint(newPoint));
        setModalVisible(false);
    };

    const handleDiscard = () => {
        let newPoint = {...currentPoint};
        newPoint.services.splice(currentServiceIndx, 1);
        dispatch(updateCleaningPoint(newPoint));
        setModalVisible(false);
    };

    const handleAddNewService = (name, price) => {
        let newPoint = {...currentPoint};
        newPoint.services.push({name, price});
        dispatch(updateCleaningPoint(newPoint));
        setAddModalVisible(false);
    };

    const width = Dimensions.get('window').width;

    return (
        <View>
            <ServiceEditModal
                visible={modalVisible}
                handleSuccess={handleSuccess}
                handleDiscard={handleDiscard}
                service={currentPoint.services[currentServiceIndx]}
            />
            <AddServiceModal
                visible={addModalVisible}
                handleSuccess={handleAddNewService}
                handleDiscard={() => setAddModalVisible(false)}
            />
            <ScrollView>
                <HorizontalGallery
                    gallery={currentPoint.gallery}
                    style={{width, height: 300}}
                />
                <View style={styles.paddingBox}>
                    <Text style={styles.cardTextTitle}>
                        {currentPoint.name}
                    </Text>
                    {currentPoint.services.map((service, indx) => (
                        <View key={indx} style={styles.cardSection}>
                            <View>
                                <Text>Service Name: {service.name}</Text>
                                <Text>
                                    Price:
                                    <Text style={styles.cardTextBold}>
                                        {' '}
                                        {service.price}$
                                    </Text>
                                </Text>
                            </View>
                            {!isAdmin ? (
                                <CustomButton
                                    style={styles.orderButton}
                                    title={'Order'}
                                    onPress={() => handleOrder(service)}
                                />
                            ) : (
                                <CustomButton
                                    style={styles.orderButton}
                                    title={'Edit'}
                                    onPress={() => {
                                        currentServiceIndx = indx;
                                        setModalVisible(true);
                                    }}
                                />
                            )}
                        </View>
                    ))}
                </View>
                <View style={styles.cardRow}>
                    <CustomButton
                        title={'Add new service'}
                        style={styles.addNewButton}
                        onPress={() => {
                            currentServiceIndx = currentPoint.services.length;
                            setAddModalVisible(true);
                        }}
                    />
                </View>
            </ScrollView>
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
    cardRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardText: {
        fontSize: 14,
    },
    cardTextTitle: {
        fontSize: 16,
        marginBottom: 15,
    },
    detailsButton: {
        paddingVertical: 5,
        width: 130,
    },
    addNewButton: {
        width: 200,
        marginBottom: 20,
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
    orderButton: {
        paddingVertical: 5,
        width: 130,
    },
    paddingBox: {
        padding: 15,
    },
});

export default SingleCleaningPointScreen;
