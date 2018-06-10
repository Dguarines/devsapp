import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export class MensagemItem extends Component {

	constructor(props) {
        super(props);
        
        let bgColor  = '#EEEEEE';
        let align    = 'flex-start';
        let txtAlign = 'left';

        if(this.props.data.uid == this.props.me){
            bgColor = '#9999FF';
            align = 'flex-end';
            txtAlign = 'right';
        }

		this.state = {
            bgColor:bgColor,
            align:align,
            txtAlign:txtAlign
        };

		console.disableYellowBox = true;
	}

	render() {
		return (
            <View style={[styles.area, {alignSelf:this.state.align ,backgroundColor:this.state.bgColor}]}>
			    <Text style={{textAlign:this.state.txtAlign}}>{this.props.data.m}</Text>
                <Text style={styles.dateTxt}>{this.props.data.date}</Text>
            </View>
		);
	}

}

const styles = StyleSheet.create({
    area:{
        marginLeft:10,
        marginRight:10,
        marginTop:5,
        marginBottom:5,
        padding:10,
        maxWidth:'80%',
        borderRadius:5
    },
    dateTxt:{
        fontSize:11,
        textAlign:'right'
    }

});