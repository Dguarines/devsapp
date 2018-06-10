import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableHighlight, Image, BackHandler, TextInput } from 'react-native';
import { connect } from 'react-redux';

import {  setActiveChat } from '../actions/ChatActions'

import { MensagemItem } from '../components/ConversaInterna/MensagemItem';

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

		this.state = {
			tmpMsg:[
				{key:1, m:'Oi, tudo bem?'},
				{key:2, m:'Tudo, e voce?'},
				{key:3, m:'Ok, legal.'},
				{key:4, m:'No entanto, não podemos esquecer que a execução dos pontos do programa nos obriga à análise dos procedimentos normalmente adotados. Gostaria de enfatizar que o julgamento imparcial das eventualidades assume importantes posições no estabelecimento das formas de ação. Assim mesmo, a consolidação das estruturas pode nos levar a considerar a reestruturação do sistema de participação geral. Percebemos, cada vez mais, que a estrutura atual da organização facilita a criação de todos os recursos funcionais envolvidos. '}
			]
		};

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
				<FlatList style={styles.chatArea} data={this.state.tmpMsg} renderItem={({item})=><MensagemItem data={item} />} />
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
		backgroundColor:'#CCCCCC'
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