import React, {Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";
import { Card, CardItem, Thumbnail,Body,Left,Right,Button, Icon} from 'native-base'

class CardComponent extends Component{
    
    render(){
        return (
            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail source = {require('../assets/avatar.png')}/>
                        <Body>
                            <Text>rip</Text>
                            <Text>10/30/2019</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    <Image source = {require ('../assets/download.jpg')}
                    style = {{height: 200, width: null, flex: 1}}/>
                </CardItem>
                <CardItem style = {{height: 45}}>
                    <Left>
                        <Button transparent>
                            <Icon name = "ios-arrow-up" style = {{color: 'black'}}/>
                        </Button>
                    </Left>
                </CardItem>
                <CardItem style = {{height: 20}}>
                    <Text>1,000 upvote</Text>
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