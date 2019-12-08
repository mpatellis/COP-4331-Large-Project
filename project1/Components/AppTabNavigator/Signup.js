import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import Animated, { Easing } from 'react-native-reanimated';
import {Actions } from 'react-native-router-flux';
const { width, height } = Dimensions.get('window');

export default class Signup extends React.Component {
    
  render() {
      return(
        <View style = {styles.container}>
        <TextInput placeholder = "Username"  style = {styles.textInput} placeholderTextColor = "black" />
        <TextInput placeholder = "email"  style = {styles.textInput} placeholderTextColor = "black" />
        <TextInput placeholder = "FullName"  style = {styles.textInput} placeholderTextColor = "black" />
            <TextInput placeholder = "password"  style = {styles.textInput} placeholderTextColor = "black" />
            <TouchableOpacity onPress={() => this.props.navigation.navigate("Home")}>
            <Animated.View style = {styles.button1}>
              <Text style = {{fontSize: 20, fontWeight: 'bold',color: 'white'}}>
                SIGN UP
              </Text>
          </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Actions.login()}>
            <Text>                            Owned an Account? Login</Text>
          </TouchableOpacity>
          </View>
      )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'flex-end',
      

    },
    button: {
      backgroundColor: 'white',
      height: 70,
      marginHorizontal: 20,
      borderRadius: 35,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 5,
      shadowOffset: { width: 2, height:2},
      shadowColor: 'black',
      shadowOpacity: 0.2
    },
    button1: {
      backgroundColor: '#000000',
      height: 70,
      marginHorizontal: 20,
      borderRadius: 35,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 5,
      shadowOffset: { width: 2, height:2},
      shadowColor: 'black',
      shadowOpacity: 0.2
    },
    closeButton: {
      height: 40,
      width: 40,
      backgroundColor: 'white',
      borderRadius: 20,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: -20,
      left: width /2 -20,
      shadowOffset: { width: 2, height:2},
      shadowColor: 'black',
      shadowOpacity: 0.2
    },
    textInput: {
      height: 50,
      borderRadius: 25,
      borderWidth:0.5,
      marginHorizontal: 20,
      paddingLeft: 10,
      marginVertical: 5,
      borderColor: 'rgba(0,0,0,0.2)'
    },
    
  });
  