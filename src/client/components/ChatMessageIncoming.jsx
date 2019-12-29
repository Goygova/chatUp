import React from 'react';
import '../styles/ChatMessage.css';
import '../styles/SharedStyles.css';
import Avatar from '@material-ui/core/Avatar';

class ChatMessageIncoming extends React.Component {
	render() {
		return (
			<div className='chat-message-from-other-user-container'>
				{!this.props.isPreviousMessageFromSameUser ? (
					<div className='chat-message-sender-name'>{this.props.message.sender.userName}</div>
				) : (
					''
				)}
				<div className='display-flex'>
					<Avatar>{this.props.message.sender.userName.substring(0, 1)}</Avatar>
					<div className='ml5'>
						<div className='display-flex flex-direction-column'>
							<div className='display-flex mb5'>
								<div className='chat-message-from-other-user'>{this.props.message.text}</div>
								<div className='display-flex'>{this.props.dropDownMenu}</div>
							</div>
							<div className='display-flex'>{this.props.attachment}</div>
						</div>
						<div className='chat-message-date-from-other-user'>{this.props.message.getFormattedSentTime()}</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ChatMessageIncoming;
