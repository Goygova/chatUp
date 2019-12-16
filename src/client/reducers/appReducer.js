import UserModel from '../models/UserModel';
import ConversationModel from '../models/ConversationModel';

const initialState = {
	conversation: new ConversationModel(),
	user: new UserModel()
};
export default (state = initialState, action) => {
	switch (action.type) {
		case 'SEND_MESSAGE':
			state = {
				...state,
				conversation: { messages: [...state.conversation.messages, action.payload] }
			};
			break;
		case 'SET_USER':
			state = {
				...state,
				user: action.payload
			};
			break;
		case 'DELETE_MESSAGE':
			state = {
				...state,
				conversation: { messages: [...state.conversation.messages.filter(message => message.id !== action.payload)] }
			};
			break;
		case 'RESET_APP_STATE':
			return initialState;
		default:
			return state;
	}
	return state;
};
