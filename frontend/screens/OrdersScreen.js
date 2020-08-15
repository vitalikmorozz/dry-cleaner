import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchOrders} from '../redux/actions/order';
import {View, Text, FlatList, StyleSheet} from 'react-native';

import OrderCard from '../components/OrderCard';

const OrdersScreen = () => {
    const dispatch = useDispatch();
    const {list: orderList, isLoading} = useSelector((state) => state.order);

    useEffect(() => {
        dispatch(fetchOrders());
    }, []);

    const renderOrder = ({item}) => <OrderCard item={item} />;

    return (
        <View>
            <FlatList
                data={orderList}
                renderItem={renderOrder}
                keyExtractor={(item) => item._id}
                ListHeaderComponent={<View />}
                ListHeaderComponentStyle={{marginTop: 15}}
                onRefresh={() => dispatch(fetchOrders())}
                refreshing={isLoading}
            />
        </View>
    );
};

export default OrdersScreen;
