import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

export class Config extends Component {

	static navigationOptions = {
        title:'',
        tabBarLabel:'Config.',
        headerMode: 'none',
		header: {visible: false}
	}

	constructor(props) {
		super(props);
		this.state = {};

	}

	render() {
		return (
			<View style={styles.container}>
				<Text>PAGINA CONFIG</Text>
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
		uid:state.auth.uid
	};
};

const ConfigConnect = connect(mapStateToProps, { })(Config);
export default ConfigConnect;