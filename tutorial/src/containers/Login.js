import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TextInput, View, Text, StyleSheet, Image, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import { Link } from 'react-router-native';
import { Button } from 'react-native-material-ui';

import * as actions from '../actions/authentication/authentication';

const { width, height } = Dimensions.get('window');

const backgroundImage = require('../../assets/images/login_bg.png');
const markImage = require('../../assets/images/login_mark.png');
const lockImage = require('../../assets/images/login_lock.png');
const personImage = require('../../assets/images/login_person.png');

class Login extends Component {
    state = {
        username: '',
        password: '',
    }

    handlers = {
        onPressSignIn: (e) => {
            const { username, password } = this.state;
            this.props.loginRequest(username, password).then(() => {
                if (this.props.statusMessage === 'SUCCESS' && this.props.isLoggedIn) {
                    this.props.history.push('/posts');
                    this.props.location.pathname = '/posts';
                }
            }).catch((error) => {
                console.log(error);
            });
        },
    }

    render() {
        const { onPressSignIn } = this.handlers;
        return (
            <View style={styles.container}>
                <ImageBackground style={styles.background} source={backgroundImage} resizeMode="cover">
                    <View style={styles.markWrap}>
                        <Image source={markImage} style={styles.mark} resizeMode="contain" />
                    </View>
                    <View style={styles.wrapper}>
                        <View style={styles.inputWrap} >
                            <View style={styles.iconWrap}>
                                <Image source={personImage} style={styles.icon} resizeMode="contain" />
                            </View>
                            <TextInput
                                style={styles.input}
                                placeholder="Username"
                                placeholderTextColor="#FFF"
                                underlineColorAndroid="transparent"
                                onChangeText={(text) => { this.setState({ username: text })}}
                            />
                        </View>
                        <View style={styles.inputWrap}>
                            <View style={styles.iconWrap}>
                                <Image source={lockImage} style={styles.icon} resizeMode="contain" />
                            </View>
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                placeholderTextColor="#FFF"
                                underlineColorAndroid="transparent"
                                secureTextEntry
                                onChangeText={(text) => { this.setState({ password: text })}}
                            />
                        </View>
                        <TouchableOpacity activeOpacity={.5}>
                            <View>
                                <Link to="/find-password">
                                    <Text style={styles.forgotPasswordText}>Forgot Password</Text>
                                </Link>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onPressSignIn} activeOpacity={.5}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Sign In</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.container}>
                        <View style={styles.signupWrap}>
                            <Text style={styles.accountText}>Don't have an account?</Text>
                            <TouchableOpacity activeOpacity={.5}>
                                <View>
                                    <Link to="/register">
                                        <Text style={styles.signupLinkText}>Sign Up</Text>
                                    </Link>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    markWrap: {
        flex: 1,
        paddingVertical: 30,
    },
    mark: {
        width: null,
        height: null,
        flex: 1,
    },
    background: {
        width,
        height,
    },
    wrapper: {
        paddingVertical: 30,
    },
    inputWrap: {
        flexDirection: "row",
        marginVertical: 10,
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: "#CCC"
    },
    iconWrap: {
        paddingHorizontal: 7,
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        height: 20,
        width: 20,
    },
    input: {
        flex: 1,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: "#FF3366",
        paddingVertical: 20,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
    },
    buttonText: {
        color: "#FFF",
        fontSize: 18,
    },
    forgotPasswordText: {
        color: "#D8D8D8",
        backgroundColor: "transparent",
        textAlign: "right",
        paddingRight: 15,
    },
    signupWrap: {
        backgroundColor: "transparent",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    accountText: {
        color: "#D8D8D8"
    },
    signupLinkText: {
        color: "#FFF",
        marginLeft: 5,
    }
});

const mapStateToProps = state => ({
    statusMessage: state.authentication.statusMessage,
    errorMessage: state.authentication.errorMessage,
    isLoggedIn: state.authentication.isLoggedIn,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    loginRequest: actions.loginRequest,
    logout: actions.logout,
    registerRequest: actions.registerRequest,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);