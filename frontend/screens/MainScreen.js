import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {useSelector, useDispatch} from 'react-redux';
import {getExistingToken} from '../redux/actions/auth';

const AuthStack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();
const HomeStack = createStackNavigator();

import ModalAlert from '../components/ModalAlert';

import LoadingScreen from './LoadingScreen';
import LoginScreen from './LoginScreen';
import ProfileScreen from './ProfileScreen';
import SignInScreen from './SignInScreen';
import OrdersScreen from './OrdersScreen';
import ClientsScreen from './ClientsScreen';
import CleaningPointsScreen from './CleaningPointsScreen';
import SingleCleaningPointScreen from './SingleCleaningPointScreen';
import AddNewCleaningPointScreen from './AddNewCleaningPointScreen';

const MainScreen = () => {
    const dispatch = useDispatch();
    const {isLogInned, isLoading} = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getExistingToken());
    }, []);

    return (
        <>
            <ModalAlert />
            <NavigationContainer>
                {!isLogInned ? (
                    <AuthStack.Navigator screenOptions={{headerShown: false}}>
                        {isLoading ? (
                            <AuthStack.Screen
                                name="Loading"
                                component={LoadingScreen}
                            />
                        ) : null}
                        <AuthStack.Screen
                            name="Log In"
                            component={LoginScreen}
                        />
                        <AuthStack.Screen
                            name="Sign In"
                            component={SignInScreen}
                        />
                    </AuthStack.Navigator>
                ) : (
                    <HomeStack.Navigator>
                        <HomeStack.Screen
                            options={{
                                headerStyle: {
                                    height: 50,
                                },
                                headerTitleAlign: 'center',
                                headerShown: false,
                            }}
                            headerStyle={{height: 100}}
                            name="Home"
                            component={HomeScreen}
                        />
                        <HomeStack.Screen
                            name="Point Details"
                            component={SingleCleaningPointScreen}
                        />
                        <HomeStack.Screen
                            name="Add Point"
                            component={AddNewCleaningPointScreen}
                        />
                    </HomeStack.Navigator>
                )}
            </NavigationContainer>
        </>
    );
};

const HomeScreen = () => {
    const {isAdmin} = useSelector((state) => state.auth);
    return (
        <Tab.Navigator>
            <Tab.Screen name="Orders" component={OrdersScreen} />
            <Tab.Screen
                name="Cleaning Points"
                component={CleaningPointsScreen}
            />
            {isAdmin ? (
                <Tab.Screen name="Clients" component={ClientsScreen} />
            ) : null}
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

export default MainScreen;
