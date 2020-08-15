import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchCleaningPoints} from '../redux/actions/cleaningPoint';
import {View, FlatList} from 'react-native';

import CleaningPointCard from '../components/CleaningPointCard';
import CustomButton from '../components/CustomButton';

const CleaningPointsScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const {isAdmin} = useSelector((state) => state.auth);
    const {list, isLoading} = useSelector((state) => state.point);

    useEffect(() => {
        dispatch(fetchCleaningPoints());
    }, []);

    const renderItem = ({item}) => (
        <CleaningPointCard navigation={navigation} item={item} />
    );

    const lastItem = isAdmin ? (
        <View style={{alignItems: 'center'}}>
            <CustomButton
                title={'Add new Point'}
                style={{
                    width: 200,
                    marginHorizontal: 15,
                    marginBottom: 20,
                }}
                onPress={() => navigation.navigate('Add Point')}
            />
        </View>
    ) : null;

    return (
        <View>
            <FlatList
                data={list}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                ListHeaderComponent={<View />}
                ListHeaderComponentStyle={{marginTop: 15}}
                onRefresh={() => dispatch(fetchCleaningPoints())}
                refreshing={isLoading}
                ListFooterComponent={lastItem}
            />
        </View>
    );
};

export default CleaningPointsScreen;
