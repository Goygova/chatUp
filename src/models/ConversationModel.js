export default class ConversationModel {
	constructor(currentUser, otherUser) {
		this.currentUser = currentUser;
		this.otherUser = otherUser;
		this.messages = [];
	}
}
