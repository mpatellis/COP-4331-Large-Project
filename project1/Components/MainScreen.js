import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet
}from "react-native";

import { Icon } from 'native-base'
class MainScreen extends Component {
    static navigationOptions = {
        headerLeft: <Icon name = 'ios-camera-outline'/>,
        title: "Fix",
        headerRight: <Icon name = 'ios-send-outline'/>,
    }
    render() {
        return (
            <View style = {styles.container}>
                <Text>MainScreen</Text>
            </View>
        );
    }
}
export default MainScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  