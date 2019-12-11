import React, {Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    AsyncStorage
} from "react-native";
import {Icon,Content} from 'native-base'
import { SearchBar } from 'react-native-elements';
import CardComponent from '../CardComponent'

class SearchTab extends Component{
    _isMounted = false
    constructor(props) {
        super(props);
        //setting default state
      }
    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icon name = "search" style = {{color: tintColor}}/>
        )
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
        data: []
    }
    search = text => {
        console.log(text);
      };
      clear = () => {
        this.search.clear();
      };
      renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: "86%",
              backgroundColor: "#CED0CE",
              marginLeft: "14%"
            }}
          />
        );
      };
      renderHeader = () => {
        return <SearchBar placeholder="Type Here..." lightTheme round />;
      };
    
      renderFooter = () => {
        if (!this.state.loading) return null;
    
        return (
          <View
            style={{
              paddingVertical: 20,
              borderTopWidth: 1,
              borderColor: "#CED0CE"
            }}
          >
            <ActivityIndicator animating size="large" />
          </View>
        );
      };
      componentWillUnmount(){
        this._isMounted = false;
      }
    Search = async (text) =>  {
        this._isMounted = true;
        var token = await AsyncStorage.getItem('token');
        this.setState({search: text})
        response =  await fetch('https://fix-this.herokuapp.com/post/search/', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
             },
          body: JSON.stringify({
              "search" : text
          })
        })
        const data = await response.json();
        console.log(data);
        this.setState({posts : data, isLoading: false, token: token, url: data.url})
    }

    render(){
        return (
            <ScrollView  >
                <SearchBar
                round
                searchIcon={{ size: 24 }}
                onChangeText={text => this.Search(text)}
                placeholder="Type Here..."
                value={this.state.search}
            />
                {
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
export default SearchTab;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'white'
    }
});