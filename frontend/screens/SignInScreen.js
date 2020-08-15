import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {useDispatch} from 'react-redux';
import {signIn} from '../redux/actions/auth';

import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import CustomLink from '../components/CustomLink';

const SignInScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = () => {
        dispatch(signIn(name, login, password));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.formTitle}>Sign In</Text>
            <CustomInput
                style={styles.input}
                placeholder={'Name'}
                value={name}
                onChangeText={setName}
                placeholderTextColor={'#2c3e50'}
            />
            <CustomInput
                style={styles.input}
                placeholder={'Email'}
                value={login}
                onChangeText={setLogin}
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
            <CustomButton onPress={handleSignIn} title={'Sign In'} />
            <CustomLink
                text={'Already have account? Log In!'}
                onPress={() => navigation.navigate('Log In')}
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

export default SignInScreen;
