import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';

import Navigation from './Navigation';

const { width, height } = Dimensions.get('window');

class Main extends Component {
    static childContextTypes = {
        history: PropTypes.object,
        location: PropTypes.object,
    }

    getChildContext() {
        return {
            history: this.props.history,
            location: this.props.location,
        };
    }

    render() {
        const { children } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.toolbar}>
                    <Navigation.Top />
                </View>
                <ScrollView style={styles.content}>
                    {children}
                </ScrollView>
                <View style={styles.footer}>
                    <Navigation.Bottom />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width,
        height,
    },
    toolbar: {
        width,
    },
    content: {
        flex: 1,
        width,
    },
    footer: {
        width,
    }
});

export default Main;
