import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { COLOR, ThemeProvider } from 'react-native-material-ui';

import App from './src/containers/App';
import store from './src/store';

const uiTheme = {
    palette: {
        primaryColor: COLOR.green500,
    },
    toolbar: {
        container: {
            height: 50,
        },
    },
};

class Main extends Component {
    render() {
        return (
            <Provider store={store}>
                <ThemeProvider uiTheme={uiTheme}>
                    <App />
                </ThemeProvider>
            </Provider>
        );
    }
}

AppRegistry.registerComponent('tutorial', () => Main);
