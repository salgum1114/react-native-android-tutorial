/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NativeRouter, Route, Redirect, Switch, withRouter } from 'react-router-native';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ScrollView,
    BackHandler,
    ToastAndroid,
} from 'react-native';

import Main from './Main';
import routes from '../routes';

const MainRoute = withRouter(Main);

export default class App extends Component {
    componentDidMount() {
        BackHandler.addEventListener('hadwareBackPress', this.handleBack);
    }

    componentWillMount() {
        this.exitApp = false;
        BackHandler.removeEventListener('hadwareBackPress', this.handleBack);
    }

    handleBack = () => {
        // 2000(2초) 안에 back 버튼을 한번 더 클릭 할 경우 앱 종료
        if (typeof this.exitApp === 'undefined' || !this.exitApp) {
            ToastAndroid.show('한번 더 누르시면 종료됩니다.', ToastAndroid.SHORT);
            this.exitApp = true;
            this.timeout = setTimeout(() => {
                this.exitApp = false;
            }, 2000);
        } else {
            clearTimeout(this.timeout);
            BackHandler.exitApp();  // 앱 종료
        }
        return true;
    }

    authenticationRoutes = () => {
        return (
            routes.AUTHENTICATION_ROUTES.map((route, i) => {
                return (
                    <Route
                        key={i}
                        exact
                        strict
                        path={route.path}
                        render={(props) => {
                            return (<route.component {...props} routes={route.routes} />);
                        }}
                    />
                )
            })
        )
    }

    mainRoutes = () => {
        return (
            routes.MAIN_ROUTES.map((route, i) => {
                return (
                    <Route
                        key={i}
                        exact
                        strict
                        path={route.path}
                        render={(props) => {
                            return (<route.component {...props} routes={route.routes} />);
                        }}
                    />
                )
            })
        )
    }

    render() {
        return (
            <NativeRouter>
                <View style={styles.container}>
                    <Route
                        exact
                        path="/"
                        render={() => {
                            return <Redirect to="/login" />;
                        }}
                    />
                    <Switch>
                        {this.authenticationRoutes()}
                        <MainRoute>
                            {this.mainRoutes()}
                        </MainRoute>
                    </Switch>
                </View>
            </NativeRouter>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F5FCFF',
    },
});
