const initialState = {
    chats:[],
    users:[],
    activeChat:''
};

const ChatReducer = (state = initialState, action) => {

    if(action.type == 'carregarListaDeUsuarios'){
        return { ...state, users:action.payload.users}
    }

    if(action.type == 'setActiveChat'){
        return { ...state, activeChat:action.payload.chatid}
    }
	
	return state;
};

export default ChatReducer;