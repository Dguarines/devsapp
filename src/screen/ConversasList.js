import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';

export class ConversasList extends Component {

	static navigationOptions = {
		title:'',
		tabBarLabel:'Conversas',
		header: null
	}

	constructor(props) {
		super(props);
		this.state = {};

	}

	componentDidUpdate(){
		if(this.props.activeChat != ''){
			this.props.navigation.navigate('ConversaInterna');
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<Text>PAGINA CONVERSAS {this.props.status} - {this.props.uid}</Text>
				<Button title='Ir para interna' onPress={()=>{
					this.props.navigation.navigate('ConversaInterna');
				}}/>
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
		status:state.auth.status,
		uid:state.auth.uid,
		activeChat:state.chat.activeChat
	};
};

const ConversasListConnect = connect(mapStateToProps, { })(ConversasList);
export default ConversasListConnect;