import React, {Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    CameraRoll
} from "react-native";
import {Icon} from 'native-base'
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { withNavigationFocus } from 'react-navigation';

class AddMediaTab extends Component{
    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icon name = "md-add-circle-outline" style = {{color: tintColor}}/>
        )
    }
    state = {
        hasCameraPermission: null,
        hasCameraRoll: null,
        type: Camera.Constants.Type.back,
      };
    
      async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
        const { we } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        this.setState({ hasCameraRoll: we === 'granted' });
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
                  <TouchableOpacity
                    style={{
                      flex: 0.1,
                      alignSelf: 'flex-end',
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      this.setState({
                        type:
                          this.state.type === Camera.Constants.Type.back
                            ? Camera.Constants.Type.front
                            : Camera.Constants.Type.back,
                      });
                    }}>
                    <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
                  </TouchableOpacity>
                </View>
                <View style = {{alignItems: 'center'}}>
                  <TouchableOpacity onPress={this.takePicture.bind(this)} >
                    <MaterialCommunityIcons name = "circle-outline"style = {{ color: 'white', fontSize: 100}}>

                    </MaterialCommunityIcons>
                    </TouchableOpacity>
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
        }
      };

}
export default withNavigationFocus(AddMediaTab);

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
});