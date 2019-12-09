import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Dimensions,
    Alert
} from "react-native";
import Animated, { Easing } from 'react-native-reanimated';
import {Actions } from 'react-native-router-flux';
const { width, height } = Dimensions.get('window');



export default class Signup extends React.Component {
  state = {
    username: '',
    password: '',
    fullname: '',
    email: '',
    auth_token: ''
  }
  SignUp = async () => {
    fetch('https://fix-this.herokuapp.com/user/register', {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              "username": this.state.username,
              "password": this.state.password,
              "fullname": this.state.fullname,
              "email": this.state.email,
          
          })
        })
        .then((res) => {
      if(res.status == 200){
        this.setState({ auth_token: res.auth_token });
        Alert.alert("Welcome", " You have succesfully logged in");
        this.props.navigation.navigate("Home")
      }
      else{
        Alert.alert("Error", "Error: "+ res.message);
        console.log("it not work")
        }
     })
     .catch((error) => {
         console.error(error);
        });
  }
  render() {
      return(
        <View style = {styles.container}>
        <TextInput placeholder = "Username" onChangeText={ TextInputValue => this.setState({username : TextInputValue }) } style = {styles.textInput} placeholderTextColor = "black" />
        <TextInput placeholder = "email" onChangeText={ TextInputValue => this.setState({email: TextInputValue }) } style = {styles.textInput} placeholderTextColor = "black" />
        <TextInput placeholder = "FullName" onChangeText={ TextInputValue => this.setState({fullname : TextInputValue }) } style = {styles.textInput} placeholderTextColor = "black" />
            <TextInput secureTextEntry={true} onChangeText={ TextInputValue => this.setState({password : TextInputValue }) } placeholder = "password"  style = {styles.textInput} placeholderTextColor = "black" />
            <TouchableOpacity onPress={this.SignUp}>
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
  