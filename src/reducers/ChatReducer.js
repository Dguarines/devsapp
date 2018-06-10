const initialState = {
    chats:[],
    users:[],
    activeChat:'',
    activeChatTitle:'',
    activeChatMessages:[]
};

const ChatReducer = (state = initialState, action) => {

    if(action.type == 'carregarListaDeUsuarios'){
        return { ...state, users:action.payload.users}
    }

    if(action.type == 'setActiveChat'){
        return { ...state, activeChat:action.payload.chatid, activeChatTitle:action.payload.activeChatTitle}
    }

    if(action.type == 'setChatList'){        
        return { ...state, chats:action.payload.chats };
    }

    if(action.type == 'setActiveChatMessage'){
        return { ...state, activeChatMessages:action.payload.msgs}
    }
	
	return state;
};

export default ChatReducer;