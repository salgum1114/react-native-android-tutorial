import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import { ListItem } from 'react-native-material-ui';

import * as actions from '../actions/posts/post';

class Posts extends Component {
    componentDidMount() {
        this.props.getPosts();
    }

    render() {
        const { posts } = this.props;
        return (
            <View>
                {posts.map((post) => {
                    return (
                        <ListItem
                            key={post.key}
                            divider
                            leftElement={
                                <Avatar key={post.key} rounded source={post.source} />
                            }
                            centerElement={
                                <Text key={post.key}>{post.title}</Text>
                            }
                            onPress={() => {}}
                        />
                    );
                })}
            </View>
        )
    }
}

const mapStateToProps = state => ({
    statusMessage: state.post.statusMessage,
    errorMessage: state.post.errorMessage,
    posts: state.post.posts,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getPosts: actions.getPostsRequest,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
