import React from 'react';
import '../styles/ChatMessage.css';

export default class ChatMessage extends React.Component {
	isMessageFromCurrentUser() {
		return this.props.message.sender.userName === this.props.userName;
	}

	isSystemMessage() {
		return this.props.message.type === 'system';
	}

	render() {
		if (this.isSystemMessage()) {
			return <div className='chat-message-system'>{this.props.message.text}</div>;
		} else if (this.isMessageFromCurrentUser()) {
			return (
				<div className='chat-message-sender-container'>
					<div className='chat-message-sender-text'>{this.props.message.text}</div>
					<div className='chat-message-date-sender'>{this.props.message.getFormattedSentTime()}</div>
				</div>
			);
		} else {
			return (
				<div className='chat-message-from-other-user-container'>
					<div className='chat-message-sender-name'>{this.props.message.sender.userName}</div>
					<div className='chat-message-from-other-user'>{this.props.message.text}</div>
					<div className='chat-message-date-from-other-user'>{this.props.message.getFormattedSentTime()}</div>
				</div>
			);
		}
	}
}
