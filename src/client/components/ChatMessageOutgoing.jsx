import React from 'react';
import '../styles/ChatMessage.css';
import '../styles/SharedStyles.css';
import Avatar from '@material-ui/core/Avatar';
import ChatMessageDropdownMenu from './ChatMessageDropdownMenu';

class ChatMessageOutgoing extends React.Component {
	render() {
		const messageText = this.props.message.text ? <div className='chat-message-sender-text mb5'>{this.props.message.text}</div> : '';
		return (
			<div className='chat-message-sender-container'>
				<div className='mr5'>
					<div className='display-flex'>
						<div className='display-flex'>
							<ChatMessageDropdownMenu deleteMessage={this.props.deleteMessage} message={this.props.message} />
						</div>
						<div className='display-flex flex-direction-column'>
							{messageText}
							<div className='display-flex justify-content-flex-end'>{this.props.attachment}</div>
						</div>
					</div>
					<div className='chat-message-date-sender'>{this.props.message.getFormattedSentTime()}</div>
				</div>
				<Avatar>{this.props.userName.substring(0, 1)}</Avatar>
			</div>
		);
	}
}

export default ChatMessageOutgoing;
