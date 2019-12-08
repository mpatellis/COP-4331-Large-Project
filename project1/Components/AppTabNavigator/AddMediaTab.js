import React, {Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
} from "react-native";
import {Icon} from 'native-base'
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { createAppContainer,withNavigationFocus, withNavigation } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import PostImage from './PostImage';
import CameraScreen from './CameraScreen';
import PostImageScreen from './PostImageScreen';
import {createStackNavigator} from 'react-navigation-stack';


const createTabBarIconWrapper = (
  TabBarIconComponent,
  defaultProps,
) => props => <TabBarIconComponent {...defaultProps} color={props.tintColor} />

const { width } = Dimensions.get('window')
class AddMediaTab extends Component{
    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icon name = "md-add-circle-outline" style = {{color: tintColor}}/>
        )
    }
      render() {
        return (
          <PostStack />
        );
      }
}
const Post = createStackNavigator({
  Gallery : {screen:PostImage,
      tabBarIcon: createTabBarIconWrapper({
        name: 'ios-images',
        size: 30,}
      ),
  },
  PostImageScreen: {screen : PostImageScreen }
},{
  headerMode: 'none'
})
const PostStack = createBottomTabNavigator({
  camera : {screen: CameraScreen
  },
  Post : {screen:Post},
},{
  headerMode: 'none'
})
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
export default createAppContainer(withNavigation(PostStack));