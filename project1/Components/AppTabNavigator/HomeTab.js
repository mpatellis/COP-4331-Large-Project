import React, {Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    AsyncStorage
} from "react-native";

import {Icon, Container, Content} from 'native-base'
import CardComponent from '../CardComponent'
class HomeTab extends Component{
    constructor(props) {
        super(props);
    }
    state = {
        posts: [],
        loading: true,
        url : null,
        title: null,
        upvote: null,
    }
    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icon name = "home" style = {{color: tintColor}}/>
        ),
    };
    async componentDidMount() {
        var token = await AsyncStorage.getItem('token');
        const response =  await fetch("https://fix-this.herokuapp.com/post/id/5def01daf417ac0017312113", {
        method: 'GET',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
        },
    })
        const data = await response.json();
        console.log(data);
        console.log(data.url);
        console.log(data.body);
        console.log(data.body.title);
        console.log(data.body.up_votes);
        this.setState({url:data.url,title: data.body.title, loading: false, upvote: data.body.up_votes})
        //Have a try and catch block for catching errors.
       /* try {
            const postsApi = await fetch('https://fix-this.herokuapp.com/post/id/5def01daf417ac0017312113');
            const post = await postsApi.json();
            this.setState({pokeList: post.results, loading: false});
        } catch(err) {
            console.log("Error fetching data-----------", err);
        }*/
    }
    render(){
        return (
            <Container style = {styles.container}>
                <Content>
                    {this.state.loading || !this.state.url? <Text>loading...</Text> : 
                    <CardComponent url = {this.state.url} title = {this.state.title} upvote = {this.state.upvote}/>
                }
                </Content>
            </Container>
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