export default class MessageModel {
	constructor(sender, receiver, text, sentDate = new Date()) {
		this.sender = sender;
		this.receiver = receiver;
		this.text = text;
		this.sentDate = sentDate;
	}

	getFormattedSentTime() {
		let hours = String(this.sentDate.getHours()).padStart(2, '0');
		let minutes = String(this.sentDate.getMinutes()).padStart(2, '0');
		let time = hours + ':' + minutes;
		return time;
	}
}
