import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableHighlight, Image, BackHandler, TextInput } from 'react-native';
import { connect } from 'react-redux';
import {  setActiveChat } from '../actions/ChatActions'

export class ConversaInterna extends Component {

	static navigationOptions = ({navigation}) => ({
		title:navigation.state.params.title,
		tabBarVisible:false,
		headerLeft:(
			<TouchableHighlight onPress={()=>{navigation.state.params.voltarFunction()}} underlayColor={false}>
				<Image source={require('react-navigation/src/views/assets/back-icon.png')} style={{width:25, height:25, marginLeft:20}} />
			</TouchableHighlight>
		)
	})

	constructor(props) {
		super(props);

		this.state = {};

		console.disableYellowBox = true;
		this.voltar = this.voltar.bind(this);
	}

	componentDidMount(){
		this.props.navigation.setParams({voltarFunction:this.voltar});
		BackHandler.addEventListener('hardwareBackPress', this.voltar);
	}

	componentWillUnmount(){
		BackHandler.removeEventListener('hardwareBackPress', this.voltar);
	}

	voltar(){
		this.props.setActiveChat('');
		this.props.navigation.goBack();

		return true;
	}

	render() {
		return (
			<View style={styles.container}>
				<FlatList style={styles.chatArea} data={[]} renderItem={()=><Text>...</Text>} />
				<View style={styles.sendArea}>
					<TextInput style={styles.sendInput} />
					<TouchableHighlight style={styles.sendButton}>
						<Image style={styles.sendImage} source={require('../assets/images/send.png')} />
					</TouchableHighlight>
				</View>
			</View>
		);
	}

}

const styles = StyleSheet.create({
	container:{
		flex:1
	},
	chatArea:{
		flex:1,
		backgroundColor:'#FF0000'
	},
	sendArea:{
		height:50,
		backgroundColor:'#EEEEEE',
		flexDirection:'row'
	},
	sendInput:{
		height:50,
		flex:1
	},
	sendButton:{
		width:50,
		height:50,
		justifyContent:'center',
		alignItems:'center'
	},
	sendImage:{
		height:40,
		width:40
	}
});

const mapStateToProps = (state) => {
	return {
		uid:state.auth.uid,
		users:state.chat.users
	};
};

const ConversaInternaConnect = connect(mapStateToProps, { setActiveChat })(ConversaInterna);
export default ConversaInternaConnect;