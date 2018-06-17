import firebase from '../FirebaseConnection';

export const getChatList = ( userUid, callback ) => {
	return (dispatch) => {

		firebase.database().ref('users').child(userUid).child('chats').on('value', (snapshot) => {
			let chats = [];
			
			snapshot.forEach((childItem)=>{
				chats.push({
					key:childItem.key,
					title:childItem.val().title,
					other:childItem.val().other
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

export const sendImage = (blob, progressCallback, successCallback) => {
	return (dispatch) => {

		let tmpKey = firebase.database().ref('chats').push().key; 
		let fbimage = firebase.storage().ref('images').child(tmpKey);

		fbimage.put(blob, {contentType:'image/jpeg'})
		.on('state_changed', 
			progressCallback,
			(error) => { alert(error.code); },
			() => {
				fbimage.getDownloadURL().then((url)=>{
					successCallback(url);
				});
			}
		);

	}
};

export const sendMessage = (msgType , msgContent, author, activeChat) => {
	return (dispatch) => {

		let currentDate = '';
		let cDate = new Date();

		//YYYY-MM-DD HH:ii:SS
		currentDate = cDate.getFullYear()+'-'+(cDate.getMonth()+1)+'-'+cDate.getDate()+' '+cDate.getHours()+':'+cDate.getMinutes()+':'+cDate.getSeconds();
		let msgId = firebase.database().ref('chats').child(activeChat).child('messages').push();
		
		switch(msgType){
			case 'text':
				msgId.set({
					msgType:'text',
					date:currentDate,
					m:msgContent,
					uid:author
				});
				break;
			case 'image':
				msgId.set({
					msgType:'image',
					date:currentDate,
					imgSource:msgContent,
					uid:author
				});
				break;
		}
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
				title:snapshot.val().name,
				other:userUid2
			});

		});

		firebase.database().ref('users').child(userUid1).once('value').then((snapshot)=>{

			firebase.database().ref('users')
			.child(userUid2)
			.child('chats')
			.child(chatId).set({
				id:chatId,
				title:snapshot.val().name,
				other:userUid1
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

				switch(childItem.val().msgType){
					case 'text':
						msgs.push({
							msgType:'text',
							key:childItem.key,
							date:childItem.val().date,
							m:childItem.val().m,
							uid:childItem.val().uid,
						});
						break;
					case 'image':
						msgs.push({
							msgType:'image',
							key:childItem.key,
							date:childItem.val().date,
							imgSource:childItem.val().imgSource,
							uid:childItem.val().uid,
						});
						break;
				}
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