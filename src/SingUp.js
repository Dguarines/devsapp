import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { checkLogin, changeEmail, changePassword, changeName, signUp } from './actions/AuthActions';

export class SingUp extends Component {

	static navigationOptions = {
		title:'Cadastrar'
	}

	constructor(props) {
		super(props);
        this.state = {};
        
    }

	render() {
		return (
			<View style={styles.container}>
                <Text>Digite seu nome</Text>
                <TextInput style={styles.input} value={this.props.name} onChangeText={this.props.changeName} />

				<Text>Digite seu E-mail</Text>
                <TextInput style={styles.input} value={this.props.email} onChangeText={this.props.changeEmail} />

                <Text>Digite sua Senha</Text>
                <TextInput secureTextEntry style={styles.input} value={this.props.password} onChangeText={this.props.changePassword} />

                <Button title="Cadastrar" onPress={() => {
                    this.props.signUp(this.props.name, this.props.email, this.props.password);
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
        name:state.auth.name,
        email:state.auth.email,
        password:state.auth.password
	};
};

const SingUpConnect = connect(mapStateToProps, { checkLogin, changeEmail, changePassword, changeName, signUp })(SingUp);
export default SingUpConnect;