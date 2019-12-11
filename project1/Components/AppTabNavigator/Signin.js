import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Dimensions,
    Alert,
    AsyncStorage,
} from "react-native";
import Animated, { Easing } from 'react-native-reanimated';
import {Actions } from 'react-native-router-flux';
import * as axios from 'axios';

const { width, height } = Dimensions.get('window');

export default class Signin extends React.Component {
  state = {
    username: '',
    password: '',
    auth_token: ''
  }
  Login = async () => {
    fetch('https://fix-this.herokuapp.com/user/login', {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              "username": 'ross'/*this.state.username*/,
              "password": '1234qwer'/*this.state.password*/
          
          })
        }).then((response) => response.json())
        .then((res) => {
      if(typeof(res.message) != "undefined"){
       Alert.alert("Error", "Error: "+ res.message);
      }
      else{
        this.setState({ auth_token: res.token });
        console.log(res.token);
       AsyncStorage.setItem("token",res.token);
       console.log(AsyncStorage.getItem("token"));
        Alert.alert("Welcome", " You have succesfully logged in");
        this.props.navigation.navigate("Home")
        }
     }).catch((error) => {
         console.error(error);
        });
  }
  render() {
      return(
        <View style = {styles.container}>
        <TextInput placeholder = "Username" onChangeText={ TextInputValue => this.setState({username : TextInputValue }) } style = {styles.textInput} placeholderTextColor = "black" />
            <TextInput secureTextEntry={true} placeholder = "password" onChangeText={ TextInputValue => this.setState({password : TextInputValue }) } style = {styles.textInput} placeholderTextColor = "black" />
            <TouchableOpacity onPress={this.Login}>
            <Animated.View style = {styles.button1}>
              <Text style = {{fontSize: 20, fontWeight: 'bold',color: 'white'}}>
                SIGN IN
              </Text>
          </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Actions.Signup()}>
            <Text>                             No account? SignUp</Text>
          </TouchableOpacity>
          </View>
      )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'white'

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