const initialState = {
    chats:[],
    contatos:[]
};

const ChatReducer = (state = initialState, action) => {

    if(action.type == 'setContactList'){
        return { ...state, contatos:action.payload.users}
    }
	
	return state;
};

export default ChatReducer;