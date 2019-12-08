import React, { Component } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as PostActions from './Post.actions';

import PostImageComponent from './PostImageComponent';

const ShareImageScreenPointer = {}
class ShareImageScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: this.props.navigation.state.params.image
    };
  }
  static navigationOptions = (props) => ({
    title: 'Share To',
    headerBackTitle: 'Back',
    headerRight: (
      <TouchableOpacity
        onPress={() => ShareImageScreenPointer.this.postImage()}
      >
        <Text style={styles.nextBtn}>Share</Text>
      </TouchableOpacity>
    ),
    headerLeft: (
      <MaterialCommunityIcons
        name="arrow-left"
        style={styles.backBtn}
        onPress={() => props.navigation.goBack(null)}
      />
    ),
  });


  componentWillMount () {
    ShareImageScreenPointer.this = this;
  }

  state = {
    caption: '',
    //image: this.props.navigation.state.params.image
  }

  setCaptionHandler = (caption) => {
    this.setState({caption})
  }

  postImage = () => {
    this.props.postImage({
      caption: this.state.caption,
    }).then((result) => {

      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'CreateImage' })],
      });
      this.props.navigation.dispatch(resetAction);

      if (result) this.props.navigation.navigate('Home');
    });
  }

  render() {
    return (
      <View style={styles.container}>

        <PostImageComponent
          image={this.state.image}
          caption={this.state.caption}
          setCaptionHandler={ text => this.setCaptionHandler(text)}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  nextBtn: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  backBtn: {
    marginLeft: 10,
    fontSize: 30,
  }
});

const mapStateToProps = (state) => ({
  image: state.post.imageForPost,
});

const mapDispatchToProps = (dispatch) => ({
  postImage: (details) => dispatch(PostActions.postImage(details)),
});

export default ShareImageScreen;