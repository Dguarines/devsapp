import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableHighlight, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

import { getContactList } from '../actions/ChatActions';
import ContatoItem from '../components/ContatoList/ContatoItem';

export class ContatoList extends Component {

	static navigationOptions = {
        title:'',
        tabBarLabel:'Contatos',
		header: null
	}

	constructor(props) {
		super(props);
		this.state = {
			users:[]
		};

		console.disableYellowBox = true;
		this.props.getContactList();
		this.contatoClick = this.contatoClick.bind(this);

		AsyncStorage.getItem("users").then((value) => {
			this.setState({"users":value});
		});
	}

	contatoClick(item){
		alert('Clickou em ' + item['name']);
	}

	render() {
		return (
			<View style={styles.container}>
				<FlatList data={this.state.users} renderItem={ (item)=> <ContatoItem data={item} onPress={this.contatoClick} /> } />
			</View>
		);
	}

}

const styles = StyleSheet.create({
	container:{
		margin:10,
		flex:1,
		justifyContent:'center'
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