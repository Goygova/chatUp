export default class MessageModel {
	constructor(sender, text, sentDate = new Date(), type = 'userMessage') {
		this.id = null;
		this.sender = sender;
		this.text = text;
		this.sentDate = sentDate;
		this.type = type;
	}

	getFormattedSentTime() {
		let hours = String(this.sentDate.getHours()).padStart(2, '0');
		let minutes = String(this.sentDate.getMinutes()).padStart(2, '0');
		let time = hours + ':' + minutes;
		return time;
	}
}
