import React, { Component } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Button,
  Platform,
  AsyncStorage
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as PostActions from './Post.actions';

import PostImageComponent from './PostImageComponent';

const ShareImageScreenPointer = {}


const createFormData = (photo, body) => {
  const data = new FormData();

  data.append("photo", {
    name: photo.fileName,
    type: photo.type,
    uri:
      Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
  });

  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
});

return data;
}
class ShareImageScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: this.props.navigation.state.params.image
    };
  }

  

  componentWillMount () {
    ShareImageScreenPointer.this = this;
  }

  state = {
    caption: '',
    title: '',
    //image: this.props.navigation.state.params.image
  }

  setCaptionHandler = (caption) => {
    this.setState({caption})
  }
  setTitleHandler = (title) => {
    this.setState({title})
  }
  handleUploadPhoto = async () =>  {
    let result =  this.state.image
    let localUri = result.uri;
    let filename = localUri.split('/').pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    let formData = new FormData();
    var token = await AsyncStorage.getItem('token');
    var token1 = `Bearer ${token}`
    console.log(token1);
    if (token !== null) {
      // We have data!!
      console.log(token);
    }
    formData.append('file', { uri: localUri, name: filename, type });
    formData.append('title', this.state.title);
    formData.append('text', this.state.caption);
    console.log(formData);
    return await fetch("https://fix-this.herokuapp.com/post", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
    },
    body:  formData,
  })
    .then(response => response.json())
    .then(response => {
      console.log("upload succes", response);
      alert("Upload success!");
      this.setState({ photo: null });
    })
    .catch(error => {
      console.log("upload error", error);
      alert("Upload failed!");
    });



    /*fetch("http://fix-this.herokuapp.com/post", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + token
      },
      method: 'POST',
      body: createFormData(this.state.image, { text: this.state.caption, title: this.state.title }),
    })
      .then(response => response.json())
      .then(response => {
        console.log("upload succes", response);
        alert("Upload success!");
        this.setState({ photo: null });
      })
      .catch(error => {
        console.log("upload error", error);
        alert("Upload failed!");
      });*/
  };
 
  render() {
    return (
      <View style={styles.container}>
          <Button title = 'POST' onPress={this.handleUploadPhoto}></Button>
        <PostImageComponent
          image={this.state.image}
          caption={this.state.caption}
          title = {this.state.title}
          setCaptionHandler={ text => this.setCaptionHandler(text)}
          setTitleHandler = {text => this.setTitleHandler(text)}
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