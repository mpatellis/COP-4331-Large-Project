import React, {Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from "react-native";
import { Card, CardItem, Thumbnail,Body,Left,Right,Button, Icon} from 'native-base'

class CardComponent extends Component{
    render(){
        const url = this.props.url
        console.log(url);
        return (
            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail source = {require('../assets/avatar.png')}/>
                        <Body>
                            <Text >{this.props.title} </Text>
                            <Text>Zone: UCF</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>

                    <Image source = {{uri: url}}
                    style = {{height: 200, width: null, flex: 1}}/>
                </CardItem>
                <CardItem style = {{height: 45}}>
                    <Left>
                    <TouchableOpacity>
                            <Icon name = "thumbs-up" style = {{color: 'black'}}/>
                    </TouchableOpacity>
                        <Text>   {this.props.upvote} </Text>
                    </Left>
                </CardItem>
                <CardItem style = {{height: 20}}>
                </CardItem>
                <CardItem>
                    <Body>
                        <Text>
                            <Text style = {{fontWeight: "900"}}>rip </Text>
                            Damn, please just throw it away!
                        </Text>
                    </Body>
                </CardItem>
            </Card>
        );
    }

}
export default CardComponent;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});