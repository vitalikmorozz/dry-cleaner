import React, {useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {fetchClients} from '../redux/actions/client';

import ClientCard from '../components/ClientCard';

const ClientsScreen = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.authToken);
    const {list, isLoading} = useSelector((state) => state.client);
    useEffect(() => {
        dispatch(fetchClients());
    }, []);

    const renderClient = ({item}) => <ClientCard item={item} />;

    return (
        <View>
            <FlatList
                data={list}
                renderItem={renderClient}
                keyExtractor={(item) => item._id}
                ListHeaderComponent={<View />}
                ListHeaderComponentStyle={{marginTop: 15}}
                onRefresh={() => dispatch(fetchClients())}
                refreshing={isLoading}
            />
        </View>
    );
};

export default ClientsScreen;
