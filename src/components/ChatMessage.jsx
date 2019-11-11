import React from 'react';
import '../styles/ChatMessage.css';

export default class ChatMessage extends React.Component {
	isMessageFromCurrentUser() {
		return this.props.message.sender.id === this.props.conversation.currentUser.id;
	}

	render() {
		if (this.isMessageFromCurrentUser()) {
			return (
				<div className='chat-message-from-current-user-container'>
					<div className='chat-message-from-current-user'>{this.props.message.text}</div>
					<div className='chat-message-date-from-current-user'>{this.props.message.getFormattedSentTime()}</div>
				</div>
			);
		} else {
			return (
				<div className='chat-message-from-other-user-container'>
					<div className='chat-message-from-other-user'>{this.props.message.text}</div>
					<div className='chat-message-date-from-other-user'>{this.props.message.getFormattedSentTime()}</div>
				</div>
			);
		}
	}
}
