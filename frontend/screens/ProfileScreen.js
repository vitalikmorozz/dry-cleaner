import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchInfo} from '../redux/actions/profile';
import {logOut} from '../redux/actions/auth';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    RefreshControl,
} from 'react-native';

import CustomButton from '../components/CustomButton';

const ProfileScreen = () => {
    const dispatch = useDispatch();
    const {user: profile, isLoading} = useSelector((state) => state.profile);

    useEffect(() => {
        dispatch(fetchInfo());
    }, []);

    const onRefresh = () => {};

    return (
        <View>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={isLoading}
                        onRefresh={onRefresh}
                    />
                }>
                {profile ? (
                    <View
                        style={[
                            styles.card,
                            styles.paddingBox,
                            styles.cardSection,
                        ]}>
                        <View>
                            <Text style={styles.cardText}>
                                Profile name:{' '}
                                <Text style={styles.cardTextBold}>
                                    {profile.name}
                                </Text>
                            </Text>
                            <Text>
                                Email:{' '}
                                <Text style={styles.cardTextBold}>
                                    {profile.email}
                                </Text>
                            </Text>
                            <Text>
                                Balance:{' '}
                                <Text style={styles.cardTextBold}>
                                    {profile.balance}
                                </Text>
                            </Text>
                        </View>
                        <View style={styles.cardRow}>
                            <CustomButton
                                title="Log Out"
                                onPress={() => dispatch(logOut())}
                                style={{
                                    paddingVertical: 5,
                                    backgroundColor: '#e74c3c',
                                }}
                            />
                        </View>
                    </View>
                ) : (
                    <ActivityIndicator size="small" color={'blue'} />
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
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
        margin: 15,
    },
    cardText: {
        fontSize: 14,
    },
    cardTextBold: {
        fontWeight: 'bold',
    },
    cardRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
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

export default ProfileScreen;
