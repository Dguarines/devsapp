import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

export default class ContatoItem extends Component {

    constructor(props){
        super(props);
        this.state = {};
    }

    render(){
        return(
            <TouchableHighlight style={styles.buttonArea} onPress={this.props.onPress}>
                <Text> -> {this.props.data.name} </Text>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    buttonArea:{
        height:40
    }
});