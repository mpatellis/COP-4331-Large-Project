import React, {Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    AsyncStorage,
    RefreshControl,
    ScrollView,
    ActivityIndicator
} from "react-native";
import { SearchBar } from 'react-native-elements';
import {Icon, Container, Content} from 'native-base'
import CardComponent from '../CardComponent'


function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }
var jwtDecode = require('jwt-decode');

class HomeTab extends Component{
    constructor(props) {
        super(props);
        this.state = { refreshing: true };
        this.GetData();
    }
    state = {
        posts: [],
        loading: true,
        url : null,
        title: null,
        upvote: null,
        user_id: null,
        post_id: null,
        token: null,
    }
    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icon name = "home" style = {{color: tintColor}}/>
        ),
    };
    async GetData() {
        var token = await AsyncStorage.getItem('token');
        var decoded = jwtDecode(token);
        console.log(decoded);
        const response =  await fetch("https://fix-this.herokuapp.com/post/", {
        method: 'GET',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
        },
    })
        const data = await response.json();
        this.setState({refreshing: false, loading: false, token : token ,posts: data})
        //Have a try and catch block for catching errors.
       /* try {
            const postsApi = await fetch('https://fix-this.herokuapp.com/post/id/5def01daf417ac0017312113');
            const post = await postsApi.json();
            this.setState({pokeList: post.results, loading: false});
        } catch(err) {
            console.log("Error fetching data-----------", err);
        }*/
    }
    onRefresh() {
        //Clear old data of the list
        this.setState({ posts: [] });
        //Call the Service to get the latest data
        this.GetData();
      }
      
    render(){
        if (this.state.refreshing) {
            return (
              //loading view while data is loading
              <View style={{ flex: 1, paddingTop: 20 }}>
                <ActivityIndicator />
              </View>
            );
          }
        return (
            <ScrollView style = {styles.container} refreshControl={
                <RefreshControl
                  //refresh control used for the Pull to Refresh
                  refreshing={this.state.refreshing}
                  onRefresh={this.onRefresh.bind(this)}
                />
              }>
                {
                 this.state.loading || !this.state.posts? <Text>loading...</Text> : 
                    this.state.posts.map((y) =>{
                        return(<Content key = {y.body._id}>                            
                            <CardComponent caption = {y.body.text} url = {y.url} title = {y.body.title} upvote = {y.body.up_votes} user_id = {y.body.user_id} post_id = {y.body._id} token = {this.state.token}/>  
                        </Content>)
                    })
                    
                }
            </ScrollView>
        );
    }

}
export default HomeTab;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'white'
    }
});