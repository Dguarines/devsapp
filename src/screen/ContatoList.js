import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
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
		this.state = {};

		console.disableYellowBox = true;
		this.props.getContactList();
		this.contatoClick = this.contatoClick.bind(this);
	}

	contatoClick(){
		
	}

	render() {
		return (
			<View style={styles.container}>
				<FlatList data={this.props.contatos} renderItem={ (item)=> <ContatoItem data={item} onPress={this.contatoClick} /> } />
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