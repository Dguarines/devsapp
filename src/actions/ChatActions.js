import firebase from '../FirebaseConnection';

export const getContactList = () => {
    return (dispatch) => {

        firebase.database().ref('users').once('value').then((snapshot) => {

            let users = [];
            snapshot.forEach((childItem)=>{
                users.push({
                    key:childItem.key,
                    name:childItem.val().name
                });
            });

            dispatch({
                type:'setContactList',
                payload:{
                    users:users
                }
            });
        });
    };
};

/*
export const changeEmail = (email) => {
	return {
		type:'changeEmail',
		payload:{
			email:email
		}
	};
};

export const signUp = (name, email, password) => {
	return (dispatch) => {

		firebase.auth().createUserWithEmailAndPassword(email, password)
		.then((user) => {

			let uid = firebase.auth.currentUser.uid;

			firebase.database().ref('users').child(uid).set({
				name:name
			});

			dispatch({
				type:'changeUid',
				payload:{
					uid:uid
				}
			})
		})
		.catch((error) => {
			switch(error.code){
				case 'auth/email-already-in-use':
					alert('E-mail já utilizado!');
					break
				case 'auth/invalid-email':
					alert('E-mail inválido!');
					break
				case 'auth/operation-not-allowed':
					alert('Tente novamente mais tarde!');
					break
				case 'auth/weak-password':
					alert('Digite uma senha melhor!');
					break
			}
		});
	}
};
*/