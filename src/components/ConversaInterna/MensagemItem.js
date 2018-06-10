import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export class MensagemItem extends Component {

	constructor(props) {
		super(props);
		this.state = {};

		console.disableYellowBox = true;
	}

	render() {
		return (
            <View style={styles.area}>
			    <Text>{this.props.data.m}</Text>
            </View>
		);
	}

}

const styles = StyleSheet.create({
    area:{
        margin:10,
        backgroundColor:'#999999',
        padding:10,
        alignSelf:'baseline',
        maxWidth:'80%'
    },

});