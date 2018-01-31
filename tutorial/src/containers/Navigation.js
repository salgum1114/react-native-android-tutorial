import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { BottomNavigation, Toolbar } from 'react-native-material-ui';

class Top extends Component {
    render() {
        return (
            <View>
                <Toolbar
                    leftElement="menu"
                    centerElement="Posts"
                    searchable={{
                        autoFocus: true,
                        placeholder: 'Search',
                    }}
                />
            </View>
        );
    }
}

class Bottom extends Component {
    static contextTypes = {
        history: PropTypes.object,
        location: PropTypes.object,
    }

    state = {
        active: 'home',
    }

    handlers = {
        onPressAction: (active, url, proxy) => {
            this.setState({
                active,
            }, () => {
                this.context.history.push(url);
                this.context.location.pathname = url;
            });
        },
    }
    
    render() {
        const { onPressAction } = this.handlers;
        return (
            <View>
                <BottomNavigation active={this.state.active}>
                    <BottomNavigation.Action
                        key="home"
                        icon="home"
                        label="Home"
                        onPress={this.handlers.onPressAction.bind(this, 'home', '/posts')}
                    />
                    <BottomNavigation.Action
                        key="bookmark"
                        icon="bookmark-border"
                        label="Bookmark"
                        onPress={this.handlers.onPressAction.bind(this, 'bookmark', '/bookmark')}
                    />
                    <BottomNavigation.Action
                        key="myinfo"
                        icon="person"
                        label="My"
                        onPress={this.handlers.onPressAction.bind(this, 'myinfo', '/myinfo')}
                    />
                    <BottomNavigation.Action
                        key="settings"
                        icon="settings"
                        label="Settings"
                        onPress={this.handlers.onPressAction.bind(this, 'settings', '/settings')}
                    />
                </BottomNavigation>
            </View>
        );
    }
}

const Navigation = {
    Top,
    Bottom,
};

export default Navigation;
