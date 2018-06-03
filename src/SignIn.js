import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { checkLogin, changeEmail, changePassword, signInAction } from './actions/AuthActions';

export class SignIn extends Component {

	static navigationOptions = {
		title:'Login'
	}

	constructor(props) {
		super(props);
        this.state = {};
        
    }

    componentDidUpdate(){
        if(this.props.state == 1){
            Keyboard.dismiss();
            this.props.navigation.navigate('Conversas');
        }
    }

	render() {
		return (
			<View style={styles.container}>
                <Text>Usuário logado: {this.props.uid}</Text>

				<Text>Digite seu E-mail</Text>
                <TextInput style={styles.input} value={this.props.email} onChangeText={this.props.changeEmail} />

                <Text>Digite sua Senha</Text>
                <TextInput secureTextEntry style={styles.input} value={this.props.password} onChangeText={this.props.changePassword} />

                <Button title="SignIn" onPress={() => {
                    this.props.signInAction(this.props.email, this.props.password);
                }} />
            </View>
		);
	}

}

const styles = StyleSheet.create({
	container:{
        margin:10,
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    input:{
        width:'80%',
        fontSize:23,
        height:50,
        backgroundColor:'#DDDDDD'
    }
});

const mapStateToProps = (state) => {
	return {
        uid:state.auth.uid,
        email:state.auth.email,
        password:state.auth.password,
        status:state.auth.status
	};
};

const SingInConnect = connect(mapStateToProps, { checkLogin, changeEmail, changePassword, signInAction })(SignIn);
export default SingInConnect;