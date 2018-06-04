import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { getContactList } from '../actions/ChatActions';

export class ContatoList extends Component {

	static navigationOptions = {
        title:'',
        tabBarLabel:'Contatos',
		header: null
	}

	constructor(props) {
		super(props);
		this.state = {};

		console.disableYellowBox = true;
		this.props.getContactList();
	}

	render() {
		return (
			<View style={styles.container}>
				<FlatList data={this.props.contatos} renderItem={(item)=>{
					<View>
						<Text> -> {item.name} </Text>
					</View>
				}} />
			</View>
		);
	}

}

const styles = StyleSheet.create({
	container:{
		margin:10
	}
});

const mapStateToProps = (state) => {
	return {
		uid:state.auth.uid,
		contatos:state.chat.contatos
	};
};

const ContatoListConnect = connect(mapStateToProps, { getContactList })(ContatoList);
export default ContatoListConnect;