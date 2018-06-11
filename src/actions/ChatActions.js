import firebase from '../FirebaseConnection';

export const getChatList = ( userUid, callback ) => {
	return (dispatch) => {

		firebase.database().ref('users').child(userUid).child('chats').on('value', (snapshot) => {
			let chats = [];
			
			snapshot.forEach((childItem)=>{
				chats.push({
					key:childItem.key,
					title:childItem.val().title
				})
			});

			callback();

			dispatch({
				type:'setChatList',
				payload:{
					chats:chats
				}
			});
		});
	};
};

export const setActiveChat = (chatId, activeChatTitle) => {
	return {
		type:'setActiveChat',
		payload:{
			chatid:chatId,
			activeChatTitle:activeChatTitle
		}
	};
};

export const sendMessage = (txt, author, activeChat) => {
	return (dispatch) => {

		let currentDate = '';
		let cDate = new Date();

		//YYYY-MM-DD HH:ii:SS
		currentDate = cDate.getFullYear()+'-'+(cDate.getMonth()+1)+'-'+cDate.getDate()+' '+cDate.getHours()+':'+cDate.getMinutes()+':'+cDate.getSeconds();

		let msgId = firebase.database().ref('chats').child(activeChat).child('messages').push();
		
		msgId.set({
			date:currentDate,
			m:txt,
			uid:author
		});
	};
};

export const pegarListaDeUsuarios = ( userUid, callback ) => {
    return (dispatch) => {
		
		firebase.database().ref("users").orderByChild("name").once("value")
		.then((snapshot) => {

			let users = [];
            snapshot.forEach((childItem)=>{
				
				if(childItem.key != userUid){
					users.push({
						key:childItem.key,
						name:childItem.val().name
					});
				}
			});

			callback();

            dispatch({
                type:'carregarListaDeUsuarios',
                payload:{
                    users:users
                }
			})
		});
		
    };
};

export const createChat = (userUid1, userUid2) => {
	return(dispatch) => {

		//Criando o próprio CHAT
		let newChat = firebase.database().ref('chats').push();
		newChat.child('members').child(userUid1).set({
			id:userUid1
		})
		newChat.child('members').child(userUid2).set({
			id:userUid2
		})

		//Associando aos envolvidos
		let chatId = newChat.key;

		firebase.database().ref('users').child(userUid2).once('value').then((snapshot)=>{

			firebase.database().ref('users')
			.child(userUid1)
			.child('chats')
			.child(chatId).set({
				id:chatId,
				title:snapshot.val().name
			});

		});

		firebase.database().ref('users').child(userUid1).once('value').then((snapshot)=>{

			firebase.database().ref('users')
			.child(userUid2)
			.child('chats')
			.child(chatId).set({
				id:chatId,
				title:snapshot.val().name
			}).then(()=>{
				dispatch({
					type:'setActiveChat',
					payload:{
						chatId
					}
				});
			});

		});
	}
};

export const monitorChat = (activeChat) =>{
	return (dispatch) => {

		firebase.database()
		.ref('chats')
		.child(activeChat)
		.child('messages')
		.on('value', (snapshot) => {
			
			let msgs = [];
			snapshot.forEach((childItem)=>{
				msgs.push({
					key:childItem.key,
					date:childItem.val().date,
					m:childItem.val().m,
					uid:childItem.val().uid
				});
			});

			dispatch({
				type:'setActiveChatMessage',
				payload:{
					msgs:msgs
				}
			});
		});
	};
};

export const monitorChatOff = (activeChat) =>{
	return (dispatch) => {
		firebase.database()
		.ref('chats')
		.child(activeChat)
		.child('messages')
		.off();
	};
};