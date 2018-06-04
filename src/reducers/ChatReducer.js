const initialState = {
    chats:[],
    contatos:[]
};

const ChatReducer = (state = initialState, action) => {

    /*
	if(action.type == 'changeStatus') {
		return { ...state, status:action.payload.status};
    }
    */

    if(action.type == 'setContactList'){
        return { ...state, contatos:action.payload.contatos}
    }
	
	return state;
};

export default ChatReducer;