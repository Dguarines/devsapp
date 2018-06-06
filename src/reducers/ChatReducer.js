const initialState = {
    chats:[],
    users:null
};

const ChatReducer = (state = initialState, action) => {

    if(action.type == 'carregarListaDeUsuarios'){
        return { ...state, users:action.payload.users}
    }
	
	return state;
};

export default ChatReducer;