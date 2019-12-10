import React, {Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    CameraRoll,
    ScrollView,
    Modal,
    TouchableHighlight,
    Button,
    Image,
    Dimensions,
} from "react-native";
import {Icon} from 'native-base'
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { withNavigationFocus } from 'react-navigation';

const { width } = Dimensions.get('window')
class CameraScreen extends Component{
    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icon name = "camera" style = {{color: tintColor}}/>
        )
    }
    state = {
        hasCameraPermission: null,
        hasCameraRoll: null,
        type: Camera.Constants.Type.back,
        modalVisible: false,
        photos: [],
        index: null
      };
      setIndex = (index) => {
        if (index === this.state.index) {
          index = null
        }
        this.setState({ index })
      }
      async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
        const { we } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        this.setState({ hasCameraRoll: we === 'granted' });
      }
      getPhotos = () => {
        CameraRoll.getPhotos({
          first: 20,
          assetType: 'All'
        })
        .then(r => this.setState({ photos: r.edges }))
      }
      toggleModal = () => {
        this.setState({ modalVisible: !this.state.modalVisible });
      }
      share = () => {
        let result =  this.state.photos[this.state.index].node.image
        let localUri = result.uri;
        let filename = localUri.split('/').pop();

        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        // Upload the image using the fetch and FormData APIs
        let formData = new FormData();
        // Assume "photo" is the name of the form field the server expects
        formData.append('photo', { uri: localUri, name: filename, type });

       /* return await fetch(YOUR_SERVER_URL, {
          method: 'POST',
          body: formData,
          header: {
            'content-type': 'multipart/form-data',
          },
        });*/
      }
      render() {
        const isFocused = this.props.isFocused;
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
          return <View />;
        } else if (hasCameraPermission === false) {
          return <Text>No access to camera</Text>;
        } else {
          return (
            <View style={{ flex: 1 }}>
            { isFocused && <Camera style={{ flex: 1 }} type={this.state.type} ref={ref => {this.camera = ref;}}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                  }}>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', paddingHorizontal: 10, marginBottom: 15, alignItems: 'flex-end' }}>

                            <View style={{ alignItems: 'center' }}>
                            <TouchableOpacity onPress={this.takePicture.bind(this)} >
                              <MaterialCommunityIcons name = "circle-outline"style = {{ color: 'white', fontSize: 100}}>

                              </MaterialCommunityIcons>
                            </TouchableOpacity>
                            <Icon
                              onPress={() => {
                                 this.setState({
                                     type: this.state.type === Camera.Constants.Type.back ?
                                       Camera.Constants.Type.front :
                                       Camera.Constants.Type.back
                                })
                              }}
                              name="ios-reverse-camera" style={{ color: 'white', fontWeight: 'bold', fontSize: 36 }} />
                        </View>
                </View>
              </Camera>}
            </View>
          );
        }
      }
      
      takePicture = async() => {
        if (this.camera) {
          const options = { quality: 0.5, base64: true };
          const data = await this.camera.takePictureAsync(options);
          console.log(data.uri);
          CameraRoll.saveToCameraRoll(data.uri,'photo');
          this.props.navigation.navigate("PostImageScreen",{image: data})
        }
      };

}
export default withNavigationFocus(CameraScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  modalContainer: {
    paddingTop: 20,
    flex: 1
  },
  scrollView: {
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
});