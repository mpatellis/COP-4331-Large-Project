import React, {Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import {Icon} from 'native-base'
import { SearchBar } from 'react-native-elements';
class SearchTab extends Component{
    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icon name = "search" style = {{color: tintColor}}/>
        )
    }
    state = {
        firstQuery: '',
    };
    
    render(){
        const { firstQuery } = this.state;
        return (
            <SearchBar
                placeholder="Search"
                onChangeText={query => { this.setState({ firstQuery: query }); }}
                value={firstQuery}
            />
        );
    }

}
export default SearchTab;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});