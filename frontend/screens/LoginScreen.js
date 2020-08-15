import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {useDispatch} from 'react-redux';
import {logIn} from '../redux/actions/auth';

import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import CustomLink from '../components/CustomLink';

const LoginScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        dispatch(logIn(email, password));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.formTitle}>Log In</Text>
            <CustomInput
                style={styles.input}
                placeholder={'Email'}
                value={email}
                onChangeText={setEmail}
                placeholderTextColor={'#2c3e50'}
            />
            <CustomInput
                style={styles.input}
                placeholder={'Password'}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                placeholderTextColor={'#2c3e50'}
            />
            <CustomButton onPress={handleLogin} title={'Log In'} />
            <CustomLink
                text={'Don`t have account? Sign In!'}
                onPress={() => navigation.navigate('Sign In')}
                style={{marginTop: 30}}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0.9,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formTitle: {
        marginBottom: 50,
        fontSize: 25,
        fontWeight: 'bold',
    },
});

export default LoginScreen;
