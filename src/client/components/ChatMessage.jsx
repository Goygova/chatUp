import React from 'react';
import '../styles/ChatMessage.css';
import '../styles/SharedStyles.css';
import ChatMessageOutgoing from './ChatMessageOutgoing';
import ChatMessageIncoming from './ChatMessageIncoming';

export default class ChatMessage extends React.Component {
	isMessageFromCurrentUser() {
		return this.props.message.sender.userName === this.props.userName;
	}

	isSystemMessage() {
		return this.props.message.type === 'system';
	}

	render() {
		const attachment = this.props.message.attachmentUrl ? (
			<img className='chat-message-attachment' src={this.props.message.attachmentUrl} width={'100px'} alt='draftImage' />
		) : (
			''
		);
		if (this.isSystemMessage()) {
			return <div className='chat-message-system'>{this.props.message.text}</div>;
		} else if (this.isMessageFromCurrentUser()) {
			return (
				<ChatMessageOutgoing
					deleteMessage={this.props.deleteMessage}
					message={this.props.message}
					attachment={attachment}
					userName={this.props.userName}
				/>
			);
		} else {
			return (
				<ChatMessageIncoming
					deleteMessage={this.props.deleteMessage}
					deleteMessage={this.props.deleteMessage}
					message={this.props.message}
					attachment={attachment}
					isPreviousMessageFromSameUser={this.props.isPreviousMessageFromSameUser}
				/>
			);
		}
	}
}
