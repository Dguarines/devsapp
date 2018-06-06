import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';

import { pegarListaDeUsuarios, createChat } from '../actions/ChatActions';
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
		this.props.pegarListaDeUsuarios(this.props.uid);
		this.contatoClick = this.contatoClick.bind(this);

		//alert(JSON.stringify(users));
	}

	contatoClick(item){
		this.props.createChat( this.props.uid, item.key);
		this.props.navigation.navigate('ConversasStark');
	}

	render() {
		return (
			<View style={styles.container}>
				<FlatList data={this.props.users} renderItem={ ({item})=> <ContatoItem data={item} onPress={this.contatoClick} /> } />
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
		users:state.chat.users
	};
};

const ContatoListConnect = connect(mapStateToProps, { pegarListaDeUsuarios, createChat })(ContatoList);
export default ContatoListConnect;