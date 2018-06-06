import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';

export class ConversaInterna extends Component {

	static navigationOptions = {
        title:'Conversa Interna'
	}

	constructor(props) {
		super(props);

		this.state = {};

		console.disableYellowBox = true;
	}

	render() {
		return (
			<View style={styles.container}>
				<Text> PAGINA CONVERSA INTERNA </Text>
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

const ConversaInternaConnect = connect(mapStateToProps, { })(ConversaInterna);
export default ConversaInternaConnect;