import React, { Component } from 'react'
import { View, Text, TextInput } from 'react-native';
import { Link } from 'react-router-native';
import { Button } from 'react-native-material-ui';

export default class Register extends Component {
    state = {
        username: '',
        password: '',
    }

    handlers = {
        onPressSignUp: (e) => {
            const { username, password } = this.state;
            console.log('username=====', username);
            console.log('password=====', password);
        }
    }

    render() {
        const { onPressSignUp } = this.handlers;
        return (
            <View>
                <Text>Sign Up</Text>
                <TextInput
                    onChangeText={(text) => { this.setState({ username: text })}}
                />
                <TextInput
                    onChangeText={(text) => { this.setState({ password: text })}}
                />
                <Button
                    text="Sign Up"
                    onPress={onPressSignUp}
                />
                <Link to="/login">
                    <Text>Sign In</Text>
                </Link>
            </View>
        );
    }
}
