import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';

export default class PostImageComponent extends Component {
  render() {
    const uri = this.props.image.uri;
    console.log(uri);
    return (
      <View style={styles.container}>

        <View style={styles.postDetails}>
          <Image
            style={styles.imagePreview}
            source={{uri}}
          />
          <TextInput
            style={styles.caption}
            onChangeText={(text) => this.props.setCaptionHandler(text)}
            value={this.props.caption}
            blurOnSubmit={true}
            underlineColorAndroid={"transparent"}
            placeholder="Write a caption..."
            multiline={true}
            blurOnSubmit={true}
          />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  postDetails: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
  },
  imagePreview: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  caption: {
    height: 40,
    borderWidth: 0,
    flex: 1,
  },
});